const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rewardId: { type: String, required: true }, // Fixed typo
    amount: { type: Number, required: true }, // Fixed typo
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const RewardModel = mongoose.model("Reward", RewardSchema);

module.exports = RewardModel;
