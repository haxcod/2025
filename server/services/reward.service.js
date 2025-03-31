
const Reward = require('../models/reward');

const createRewardData = async (userId, rewardId, amount) => {
    try {
        const data = await Reward.create({ userId, rewardId, amount });
        return data; // Return the created document
    } catch (err) {
        console.error("Error in createRewardData:", err);
        throw err; // Throw error for better handling
    }
};

const getRewardData = async (userId, rewardId) => {
    try {
        const data = await Reward.find({ userId, rewardId }).select('rewardId');
        return data; // Returns an array of matching rewards (empty if none found)
    } catch (err) {
        console.error("Error in getRewardData:", err);
        throw err;
    }
};

module.exports = { getRewardData, createRewardData };

