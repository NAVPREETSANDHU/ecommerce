import Purchase from '../models/purchase.js';
import Cart from '../models/Cart.js';
import Product from '../models/productModel.js'; // Import the Product model

const getCheapestItemPrice = (items) => {
    return Math.min(...items.map(item => item.price));
};

// Function to check if a user is eligible for loyalty rewards based on purchase history
export const checkLoyaltyEligibility = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch completed purchases
        const purchases = await Purchase.find({ user: userId });

        const totalItems = purchases.reduce((acc, purchase) => acc + purchase.items.length, 0);

        if (totalItems >= 6) {
            const eligibleMessage = "You are eligible for a free item.";
            return res.status(200).json({
                eligible: true,
                message: eligibleMessage,
            });
        } else {
            return res.status(200).json({
                eligible: false,
                message: `You need to purchase ${6 - totalItems} more items to be eligible for a free item.`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Function to redeem a free item based on loyalty eligibility
export const redeemFreeItem = async (req, res) => {
    try {
        const { userId } = req.params;

        // Logic to redeem the free item
        const redeemedItem = await Purchase.updateOne(
            { user: userId },
            { $push: { redeemedItems: { item: 'Free Item', date: new Date() } } }
        );

        return res.status(200).json({
            success: true,
            message: 'You have successfully redeemed your free item!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Function to check loyalty eligibility before payment
export const checkLoyaltyEligibilityBeforePayment = async (req, res) => {
    try {
        const { userId } = req.params;
        const { cartItems } = req.body;

        const now = new Date();
        const twoMonthsAgo = new Date(now.setMonth(now.getMonth() - 2));

        // Fetch completed purchases within the last 2 months
        const purchases = await Purchase.find({
            user: userId,
            purchaseDate: { $gte: twoMonthsAgo },
        });

        let totalItems = 0;
        let allItems = [];

        // Add items from past purchases
        purchases.forEach((purchase) => {
            if (purchase.items) {
                totalItems += purchase.items.length;
                allItems = allItems.concat(purchase.items);
            }
        });

        // Add current checkout items
        if (cartItems && Array.isArray(cartItems)) {
            totalItems += cartItems.length;
            allItems = allItems.concat(cartItems);
        }

        // Validate product IDs
        const productIds = allItems.map(item => item.product || item.productId);
        const validProducts = await Product.find({ _id: { $in: productIds } });

        // Check if all product IDs are valid
        if (validProducts.length !== productIds.length) {
            return res.status(400).json({
                eligible: false,
                message: 'One or more product IDs are invalid.',
            });
        }

        // Check eligibility for a free item
        if (totalItems >= 6) {
            const cheapestItemPrice = getCheapestItemPrice(allItems);
            return res.status(200).json({
                eligible: true,
                message: `You are eligible for a free item worth $${cheapestItemPrice}.`,
                freeItemPrice: cheapestItemPrice,
            });
        } else {
            return res.status(200).json({
                eligible: false,
                message: `You need to purchase ${6 - totalItems} more items to be eligible for a free item.`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};