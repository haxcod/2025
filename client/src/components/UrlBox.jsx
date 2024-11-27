import React, { useEffect, useState } from 'react';
import urlBg from '../assets/url_bg.png';
import UserData from '../hooks/UserData';

const UrlBox = () => {
  const [inviteUrl, setInviteUrl] = useState('')
  const data = UserData();


  useEffect(() => {
    if (data?.userData?.id) {
      const currentUrl = window.location.origin ;
      setInviteUrl(`${currentUrl}/register?inviteCode=${data.userData.id}`);
    }
  }, [data])
  

  // Function to copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    alert('URL copied to clipboard!');
  };

  return (
    <div 
      className="h-[29.333333vw] rounded-[3.2vw] m-[0_2vw_0_4.666667vw] bg-cover bg-no-repeat p-[3.733333vw_0_3.733333vw_3.733333vw]"
      style={{ backgroundImage: `url(${urlBg})` }}
    >
      <p className="p_26">
        COPIED TO URL
      </p>
      <p className="text-[3.2vw] mt-[2.666667vw] opacity-70">
        Paste and share with your invitees!
      </p>
      <div className="flex items-center mt-[4vw]">
        <div 
          onClick={copyToClipboard} 
          className="p-[0_4vw] flex items-center h-[6.4vw] rounded-[6.4vw] text-[2.933333vw] text-[#4ca335] bg-black mr-[1.733333vw] cursor-pointer"
        >
          Copy
        </div>
        <p className="text-[2.4vw]">
          {inviteUrl}
        </p>
      </div>
    </div>
  );
};

export default UrlBox;