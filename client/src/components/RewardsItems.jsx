import { useCallback, useEffect, useState } from 'react';
import { fetchData } from "../services/apiService";

const RewardsItems = ({userData}) => {
  const [activeUser, setActiveUser] = useState([]);

  const fetchInvitedUsers = useCallback(async () => {
    try {
      const response = await fetchData("api/v1/invites", {
        params: { userId: userData._id },
      });
      
      setActiveUser(response.data.activeUsers || 0); // Ensure it's an array
    } catch (error) {
      console.error("Failed to fetch invited users:", error);
    }
  }, [userData._id]);

  useEffect(() => {
    fetchInvitedUsers();
  }, [fetchInvitedUsers]);

  // Reward Levels
  const rewards = [
    { inviteCount: 5, rewardAmount: 1000 },
    { inviteCount: 25, rewardAmount: 2000 },
    { inviteCount: 75, rewardAmount: 5000 },
    { inviteCount: 155, rewardAmount: 8000 },
    { inviteCount: 500, rewardAmount: 30000 },
    { inviteCount: 1000, rewardAmount: 70000 },
    { inviteCount: 3000, rewardAmount: 250000 },
    { inviteCount: 5000, rewardAmount: 500000 },
  ];

  return (
    <div className="flex justify-between flex-wrap m-[0_4.666667vw_3.2vw]">
      {rewards.map((reward, index) => {
        const currentInvites = activeUser;
        const progressPercentage = (currentInvites / reward.inviteCount) * 100;

        return (
          <div key={index} className="rounded-[2.666667vw] bg-white p-[4vw_3.333333vw] mt-[2.666667vw]" style={{ width: `calc((100% - 3.2vw) / 2)` }}>
            <p className="text-[3.2vw]">Invite {reward.inviteCount} active users</p>
            <p className="text-[3.2vw] text-[#707070] mt-[2.666667vw]">Reward amount</p>
            <p className="text-[#4ca335] text-[4.266667vw] font-bold mt-[1.333333vw]">₹{reward.rewardAmount.toLocaleString()}</p>

            <div className="flex justify-between items-center mt-[2.666667vw]">
              <p className="text-[#707070] text-[3.2vw]">Schedule</p>
              <p className="text-[3.2vw] text-[#4ca335]">
                {currentInvites} / {reward.inviteCount}
                {/* {console.log(activeUser)
                } */}
              </p>
            </div>

            <div className="relative rounded-full mt-[1.333333vw]" style={{ background: "rgb(83, 87, 93)", height: 7 }}>
              <span
                className="absolute left-0 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%`, background: "rgb(76, 163, 53)" }}
              />
            </div>

            <div
              className={`h-[7.6vw] flex items-center justify-center rounded-[4vw] text-center text-[3.2vw] text-white mt-[4.8vw] ${
                currentInvites >= reward.inviteCount ? 'bg-[#4ca335] cursor-pointer' : 'bg-[#c4c4c4]'
              }`}
              onClick={() => {
                if (currentInvites >= reward.inviteCount) {
                  alert(`Reward of ₹${reward.rewardAmount.toLocaleString()} Received!`);
                }
              }}
            >
              {currentInvites >= reward.inviteCount ? 'Receive' : 'Invite More'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RewardsItems;
