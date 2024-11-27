import React from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import bannerBg from '../assets/customer_banner.png'
import { FaMobileScreenButton } from "react-icons/fa6";
import { RiTelegramLine } from "react-icons/ri";

const HelpCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="h-[16vw] w-full text-[5.333333vw]">
        <div className="flex h-full">
          <div className="w-1/3 flex justify-start items-center">
            <button
              className="p-[0_4vw] h-[9.6vw] text-[28px]"
              onClick={() => navigate(-1)} // Navigate to the previous page
            >
              <IoChevronBackSharp />
            </button>
          </div>
          <div className="w-1/3 flex justify-center items-center">
            Help Center
          </div>
        </div>
      </header>

      {/* Banner Section */}
      <div className="p-[0_4vw] mt-[2vw]">
        <div className="mb-[4vw]">
          <img src={bannerBg} alt="Help Center Banner" />
        </div>

        {/* Customer Service Section */}
        <ServiceCard
          icon={<FaMobileScreenButton color="white" size="5.333333vw" />}
          title="Online customer service"
          subtitle="WhatsApp Online"
          time="9:00 AM to 18:00 PM"
        />

        {/* Telegram Channel Section */}
        <ServiceCard
          icon={<RiTelegramLine color="white" size="5.333333vw" />}
          title="Telegram Official Channel"
          subtitle="Follow our official Telegram channel to get the latest news and welfare information"
        />
      </div>
    </div>
  );
};

// Reusable Service Card Component
const ServiceCard = ({ icon, title, subtitle, time }) => {
  return (
    <div className="flex rounded-[1.6vw] bg-white p-[4.53333vw_4vw_6.66667vw] mb-[2.66667vw]">
      <div className="size-[11.7333vw] rounded-full bg-[#4CA335] flex justify-center items-center mr-[4.66667vw]">
        {icon}
      </div>
      <div className="w-[80%]">
        <p className="text-[4.26667vw] font-bold">{title}</p>
        <p className="mt-[2vw] text-[3.2vw] text-black text-opacity-85">{subtitle}</p>
        {time && <p className="mt-[0.933333vw] text-[3.2vw] text-black text-opacity-45">{time}</p>}
      </div>
    </div>
  );
};

export default HelpCenter;
