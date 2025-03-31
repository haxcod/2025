import React, { useCallback, useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import teamBg from "../assets/team_bg.png";
import InviteList from "../components/InviteList";
import { IoIosArrowDown } from "react-icons/io";
import UserData from "../hooks/UserData";
import { fetchData } from "../services/apiService";
import useTransactionStore from "../store/TransactionStore";


const Team = () => {
  const [inviteUrl, setInviteUrl] = useState("");
  const navigate = useNavigate();
  const data = UserData();
  const [invitedData, setInvitedData] = useState([]);
  const { todayInviteBonus,summary } = useTransactionStore();

  useEffect(() => {
    if (data?.userData?.id) {
      const currentUrl = window.location.origin;
      setInviteUrl(`${currentUrl}/register?inviteCode=${data.userData.inviteCode}`);
    }
  }, [data]);
  

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(inviteUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch(() => alert("Failed to copy the link."));
  };

  const fetchInvitedUsers = useCallback(async () => {
    try {
      const response = await fetchData("api/v1/invites", {
        params: { userId: data.userData._id },
      });
      
      setInvitedData(response.data);
      
    } catch (error) {
      console.error("Failed to fetch invited users:", error);
    }
  }, [data.userData._id]);

  useEffect(() => {
    fetchInvitedUsers();
  }, [fetchInvitedUsers]);

  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="h-[16vw] w-full text-[5.333333vw]">
        <div className="flex h-full">
          <div className="w-1/3 flex justify-start items-center">
            <button
              className="p-[0_4vw] h-[9.6vw] text-[28px]"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <IoChevronBackSharp />
            </button>
          </div>
          <div className="w-1/3 flex justify-center items-center">Team</div>
          <div className="w-1/3"></div>
        </div>
      </header>

      {/* Main Content Section */}
      <div
        className="m-[1.333333vw_4vw_0] h-[40.933333vw] rounded-[2.133333vw] p-[6.133333vw_5.066667vw] text-[3.466667vw] bg-no-repeat leading-[5.333333vw] bg-cover"
        style={{ backgroundImage: `url(${teamBg})` }}
      >
        <div className="mb-[5.333333vw]">
          <p>Obtain Today Commission</p>
          <p className="font-bold text-[6.4vw] mt-[1.333333vw]">₹{todayInviteBonus || 0}</p>
        </div>
        <div className="flex items-center justify-between leading-[4.333333vw]">
          <div>
            <p>Obtain Total Commission</p>
            <p className="font-medium text-[5.333333vw] mt-[1.333333vw]">₹{summary.inviteBonus || 0}</p>
          </div>
          <div>
            <p>Total number of teams</p>
            <p className="font-medium text-[5.333333vw] mt-[1.333333vw]">₹{invitedData.invitedUsers?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Invite Link Section */}
      <div className="rounded-[2.666667vw] bg-white p-[4vw] m-[2.666667vw_4vw_4vw]">
        <h2 className="text-[4.266667vw] font-bold mb-[2.4vw]">
          Invitation Link
        </h2>
        <div className="flex justify-between items-center gap-2">
          <div className="border border-opacity-15 rounded-[2.133333vw] p-[2.133333vw] text-[2.933333vw] text-opacity-85 leading-[4vw] h-[12.8vw] w-[59.866667vw] break-words">
            {inviteUrl}
          </div>
          <button
            className="w-[21.2vw] h-[12.8vw] text-white text-[3.466667vw] bg-[#4CA335] rounded-[2.133333vw] flex justify-center items-center"
            onClick={handleCopyLink}
            aria-label="Copy invitation link"
          >
            COPY LINK
          </button>
        </div>
      </div>

      {/* Invite List Section */}
      <div className="max-h-80 rounded-[2.666667vw] bg-white p-[4.933333vw_3.466667vw_10vw] mt-[6.666667vw]">
        <div className="flex items-center justify-between">
          <p className="text-[4.266667vw] font-bold mb-[1.333333vw] flex items-center gap-2">
            Level 1 teams
            <span className="text-[2.933333vw] text-black text-opacity-40">
              (<span className="text-[#4ca335]">0</span>/ 1)
            </span>
          </p>
          <div className="inline-flex items-center h-[7.466667vw] leading-[7.466667vw] border border-[#cbcbcb] rounded-[2.133333vw] text-[#24223a] text-[3.466667vw] p-[0_2.666667vw] gap-1">
            All <IoIosArrowDown />
          </div>
        </div>

        <div className="box-border">
          <div className="h-[98%] pb-[2.666667vw] mt-[6.666667vw]">
            {invitedData.invitedUsers?.length > 0 ? (
              invitedData.invitedUsers?.map((user, index) => (
                <InviteList
                  key={index}
                  mobile={user.mobile}
                  id={user.id}
                  createdAt={user.createdAt}
                />
              ))
            ) : (
              <p>No invited users yet.</p>
            )}
          </div>
          <div className="flex items-center justify-center w-full h-[13.333333vw] text-[3.733333vw] text-[#888]">
            No more
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
