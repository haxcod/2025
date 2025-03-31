const RewardService = require('../services/reward.service');

const createRewardData = async (req, res) => {
    const { userId, rewardId, amount } = req.body;
    if (!userId || !rewardId || !amount) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const data = await RewardService.createRewardData(userId, rewardId, amount);
        res.status(200).json({ success: true, data }); // ✅ Return the created reward
    } catch (err) {
        console.error("Error in createRewardData:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" }); // ✅ Proper error response
    }
};

const getRewardData = async (req, res) => {
    const { userId, rewardId } = req.query;
    if (!userId || !rewardId) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const data = await RewardService.getRewardData(userId, rewardId);
        res.status(200).json({ success: true, data }); // ✅ Return response to client
    } catch (err) {
        console.error("Error in getRewardData:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" }); // ✅ Proper error response
    }
};

module.exports = { getRewardData, createRewardData };
