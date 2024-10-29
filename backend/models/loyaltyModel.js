import mongoose from 'mongoose';

const loyaltyHistorySchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    rewardItem: {
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true, default: 0 },
    },
    redeemedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  });

const LoyaltyHistory = mongoose.model('LoyaltyHistory', loyaltyHistorySchema);

export default LoyaltyHistory;
