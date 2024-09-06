import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").post(protect, admin, uploadImage);

export default router;
