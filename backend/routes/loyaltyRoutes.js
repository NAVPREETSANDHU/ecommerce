import express from 'express';
import { addLoyaltyReward, getLoyaltyHistory } from '../controllers/loyaltyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/redeem').post(protect, addLoyaltyReward);
router.route('/history').get(protect, getLoyaltyHistory);

export default router;
