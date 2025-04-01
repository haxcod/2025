import { useCallback, useEffect, useState } from "react";
import { fetchData, postData } from "../services/apiService";
import useRewardStore from "../store/RewardStore";

const RewardsItems = ({ userData }) => {
  const [activeUser, setActiveUser] = useState(0);
  const [loadingRewards, setLoadingRewards] = useState({});
  const { reward, fetchAllRewardData, storeAllRewardData } =
    useRewardStore();

  const fetchInvitedUsers = useCallback(async () => {
    try {
      const response = await fetchData("api/v1/invites", {
        params: { userId: userData._id },
      });
      setActiveUser(response.data.activeUsers || 0);
    } catch (error) {
      console.error("Failed to fetch invited users:", error);
    }
  }, [userData._id]);

  useEffect(() => {
    fetchInvitedUsers();
    fetchAllRewardData(userData._id); // Fetch all rewards claimed by the user
  }, [fetchInvitedUsers, fetchAllRewardData, userData._id,storeAllRewardData]);


  const createTransactionForReward = async(amount)=>{
   try{
    const bonusData = {
      amount,
      mobile: userData?.mobile,
      type: "invite",
      description: "Invite Extra Bonus Earned",
      status: "completed",
    };

    // Send invite bonus transaction
    const response = await postData("/api/v1/transactions", bonusData);
    console.log("Invite Bonus Added:", response.data);
   }catch(err){
    console.log(err);
    
   }
  }

  const handleRewardClaim = async (rewardId, amount) => {
    if (
      activeUser >= rewards.find((r) => r.rewardId === rewardId).inviteCount
    ) {
      setLoadingRewards((prev) => ({ ...prev, [rewardId]: true })); // Start loading for this reward

      await storeAllRewardData(userData._id, rewardId, amount);
      await createTransactionForReward(amount)
      setLoadingRewards((prev) => ({ ...prev, [rewardId]: false })); // Stop loading after completion
    }
  };

  // Reward Levels
  const rewards = [
    { inviteCount: 5, rewardAmount: 5 * 4, rewardId: "IR01" },
    { inviteCount: 25, rewardAmount: 25 * 4, rewardId: "IR02" },
    { inviteCount: 75, rewardAmount: 75 * 4, rewardId: "IR03" },
    { inviteCount: 155, rewardAmount: 155 * 4, rewardId: "IR04" },
    { inviteCount: 500, rewardAmount: 500 * 4, rewardId: "IR05" },
    { inviteCount: 1000, rewardAmount: 1000 * 5, rewardId: "IR06" },
    { inviteCount: 3000, rewardAmount: 3000 * 5, rewardId: "IR07" },
    { inviteCount: 5000, rewardAmount: 5000 * 5, rewardId: "IR08" },
  ];

  return (
    <div className="flex justify-between flex-wrap m-[0_4.666667vw_3.2vw]">
      {rewards.map((rew, index) => {
        const currentInvites = activeUser;
        const progressPercentage = (currentInvites / rew.inviteCount) * 100;
        
        const isClaimed =
          Array.isArray(reward) &&
          reward?.some((r) => r.rewardId === rew.rewardId);
        const isLoading = loadingRewards[rew.rewardId] || false;

        return (
          <div
            key={index}
            className="rounded-[2.666667vw] bg-white p-[4vw_3.333333vw] mt-[2.666667vw]"
            style={{ width: `calc((100% - 3.2vw) / 2)` }}
          >
            <p className="text-[3.2vw]">
              Invite {rew.inviteCount} active users
            </p>
            <p className="text-[3.2vw] text-[#707070] mt-[2.666667vw]">
              Reward amount
            </p>
            <p className="text-[#4ca335] text-[4.266667vw] font-bold mt-[1.333333vw]">
              ₹{rew.rewardAmount.toLocaleString()}
            </p>

            <div className="flex justify-between items-center mt-[2.666667vw]">
              <p className="text-[#707070] text-[3.2vw]">Schedule</p>
              <p className="text-[3.2vw] text-[#4ca335]">
                {currentInvites} / {rew.inviteCount}
              </p>
            </div>

            <div
              className="relative rounded-full mt-[1.333333vw]"
              style={{ background: "rgb(83, 87, 93)", height: 7 }}
            >
              <span
                className="absolute left-0 h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progressPercentage}%`,
                  background: "rgb(76, 163, 53)",
                }}
              />
            </div>

            <div
              className={`h-[7.6vw] flex items-center justify-center rounded-[4vw] text-center text-[3.2vw] text-white mt-[4.8vw] ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : isClaimed
                  ? "bg-gray-400 cursor-not-allowed"
                  : currentInvites >= rew.inviteCount
                  ? "bg-[#4ca335] cursor-pointer"
                  : "bg-[#c4c4c4]"
              }`}
              onClick={() =>
                !isClaimed &&
                !isLoading &&
                handleRewardClaim(rew.rewardId, rew.rewardAmount)
              }
            >
              {isLoading
                ? "Wait..."
                : isClaimed
                ? "Claimed"
                : currentInvites >= rew.inviteCount
                ? "Claim"
                : "Invite More"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RewardsItems;
