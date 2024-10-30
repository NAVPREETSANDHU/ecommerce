import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  updateTrackingLink,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// Route to create a new order and get all orders (admin only)
router.route("/")
  .post(protect, addOrderItems)   // Create a new order
  .get(protect, admin, getOrders); // Get all orders (admin)

// Route to get logged-in user’s orders
router.route("/mine").get(protect, getMyOrders);

// Route to get an order by ID
router.route("/:id").get(protect, getOrderById);

// Route to update an order to paid
router.route("/:id/pay").put(protect, updateOrderToPaid);

// Route to update an order to delivered (admin only)
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

// Route to update tracking link (admin only)
router.route("/:id/track").put(protect, admin, updateTrackingLink);

export default router;

