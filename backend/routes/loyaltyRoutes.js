import express from 'express';
import { 
  checkLoyaltyEligibility, 
  redeemFreeItem, 
  checkLoyaltyEligibilityBeforePayment 
} from '../controllers/loyaltyController.js';

const router = express.Router();

// Route to check loyalty eligibility for existing purchases
router.get('/loyalty/:userId', checkLoyaltyEligibility);

// Route to redeem a free item based on loyalty eligibility
router.post('/loyalty/redeem/:userId', redeemFreeItem);

// Route to check loyalty eligibility before making a payment
router.post('/check-before-payment/:userId', checkLoyaltyEligibilityBeforePayment);

export default router;