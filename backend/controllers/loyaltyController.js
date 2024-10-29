import asyncHandler from 'express-async-handler';
import LoyaltyHistory from '../models/loyaltyModel.js';
import Order from '../models/orderModel.js';


// @desc    Get loyalty history for the logged-in user
// @route   GET /api/loyalty/history
// @access  Private
const getLoyaltyHistory = asyncHandler(async (req, res) => {
  try {
    const loyaltyHistory = await LoyaltyHistory.find({ user: req.user._id });
    
    if (!loyaltyHistory) {
      res.status(404);
      throw new Error('Loyalty history not found');
    }

    res.json(loyaltyHistory);
  } catch (error) {
    res.status(500);
    throw new Error(`Server error: ${error.message}`);
  }
});

// @desc    Add a redeemed loyalty reward to the user's loyalty history
// @route   POST /api/loyalty/redeem
// @access  Private
const addLoyaltyReward = asyncHandler(async (req, res) => {
  const { name, image, price } = req.body;

  if (!name || !image) {
    res.status(400);
    throw new Error('Reward item is missing required fields');
  }

  const loyaltyEntry = new LoyaltyHistory({
    user: req.user._id,
    rewardItem: {
      name,
      image,
      price: price || 0,
    },
    redeemedAt: new Date(),
  });

  const savedEntry = await loyaltyEntry.save();

  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  console.log('Looking for orders created after:', twoMonthsAgo);
  console.log('User ID:', req.user._id);

  const ordersToUpdate = await Order.find({
    user: req.user._id,
    'paymentResult.status': 'COMPLETED',
    createdAt: { $gte: twoMonthsAgo },
    usedForLoyalty: { $ne: true },
  });

  console.log('Orders found:', ordersToUpdate.length);
  console.log('Orders to update for loyalty:', ordersToUpdate);

  if (ordersToUpdate.length > 0) {
    await Order.updateMany(
      {
        _id: { $in: ordersToUpdate.map(order => order._id) },
      },
      { $set: { usedForLoyalty: true } }
    );
    console.log('Updated orders with usedForLoyalty flag.', ordersToUpdate);
  } else {
    console.log('No orders were eligible for loyalty update.');
  }

  res.status(201).json(savedEntry);
});


export { getLoyaltyHistory, addLoyaltyReward };
