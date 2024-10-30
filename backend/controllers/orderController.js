import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { calcPrices } from "../utils/calcPrices.js";
import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal.js";
import sendEmail from "../config/mail.js";
import newOrderEmail from "../data/newOrderEmail.js";
import dispatchOrderEmail from "../data/dispatchOrderEmail.js";
import deliveredEmail from "../data/deliveredEmail.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    // Log the entire orderItems payload to check structure and IDs
    console.log("Received orderItems:", orderItems);

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }

    // Validate each orderItem to ensure all have a defined _id
    const invalidItems = orderItems.filter(item => !item._id);
    if (invalidItems.length > 0) {
        console.error("Found orderItems without valid _id:", invalidItems);
        res.status(400);
        throw new Error("One or more order items are missing a valid product ID. Please check your cart items.");
    }

    // Fetch products from the database
    const productIds = orderItems.map((x) => x._id);
    console.log("Fetching products with IDs:", productIds);

    const itemsFromDB = await Product.find({ _id: { $in: productIds } });

    // Map over the order items and use the price from our database items
    const dbOrderItems = orderItems.map((itemFromClient) => {
        const matchingItemFromDB = itemsFromDB.find(
            (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
        );

        if (!matchingItemFromDB) {
            console.error(`Product with ID ${itemFromClient._id} not found in the database.`);
            throw new Error(`Product with ID ${itemFromClient._id} not found`);
        }

        return {
            ...itemFromClient,
            product: itemFromClient._id,
            price: matchingItemFromDB.price || 0,
            _id: undefined,
        };
    });

    // Calculate initial prices
    let { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

    // Loyalty Program Logic
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // Fetch past orders from the last 2 months for the logged-in user
    const pastOrders = await Order.find({
        user: req.user._id,
        createdAt: { $gte: twoMonthsAgo },
    });

    // Count the total number of items in past orders
    const pastItemsCount = pastOrders.reduce((count, order) => {
        return count + order.orderItems.reduce((sum, item) => sum + item.qty, 0);
    }, 0);

    // Count the current order items
    const currentItemsCount = dbOrderItems.reduce((sum, item) => sum + item.qty, 0);
    const totalItemsCount = pastItemsCount + currentItemsCount;

    // Check if eligible for loyalty discount (6 items or more)
    if (totalItemsCount >= 6) {
        // Find the cheapest item in the current order
        const cheapestItem = dbOrderItems.reduce((min, item) =>
            item.price < min.price ? item : min
        );

        // Apply the discount by reducing the price of the cheapest item
        itemsPrice -= cheapestItem.price;
        totalPrice -= cheapestItem.price;

        console.log(`Loyalty discount applied: Free item - ${cheapestItem.price}`);
    }

    // Create order with adjusted prices if discount was applied
    const order = new Order({
        orderItems: dbOrderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    const createdOrder = await order.save();

    // Send confirmation email
    const user = await User.findById(req.user._id);
    sendEmail(user.email, "Created New Order, Bazaarlia!", newOrderEmail(createdOrder));

    res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error("Payment not verified");

    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error("Transaction has been used before");

    const order = await Order.findById(req.params.id);
    const user = await User.findById(order.user);

    if (order) {
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        if (updatedOrder) {
            sendEmail(user.email, "Created New Order, Bazaarlia!", newOrderEmail(updatedOrder));
        }

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const user = await User.findById(order.user);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        if (updatedOrder) {
            sendEmail(user?.email, "Your order has been Delivered!", deliveredEmail(updatedOrder));
        }

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update tracking link
// @route   PUT /api/orders/:id/track
// @access  Private/Admin
const updateTrackingLink = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const user = await User.findById(order.user);

    if (order) {
        order.trackingLink = req.body.trackingLink;

        const updatedOrder = await order.save();
        if (updatedOrder) {
            sendEmail(user?.email, "Tracking Link for your Order!", dispatchOrderEmail(updatedOrder));
        }

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    updateTrackingLink,
    getOrders,
};

