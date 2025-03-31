import{ useRef, useState } from 'react';
import orderIcon from '../assets/order_icon.png';
import teamIcon from '../assets/team_icon.png';
import vipIcon from '../assets/vip_icon.png';
import recordIcon from '../assets/record_icon.png';
import bankIcon from '../assets/bank_icon.png';
import commissionIcon from '../assets/commission_icon.png';
import helpIcon from '../assets/help_icon.png';
import myIcon from '../assets/my_icon.png';
import passwordIcon from '../assets/password_icon.png';
import languageIcon from '../assets/language_icon.png';
import downloadIcon from '../assets/download_icon.png';
import nextArrow from '../assets/next_arrow.png';
import { useNavigate } from 'react-router-dom';
import LanguageDialog from './LanguageDialog'; // Import LanguageDialog
import { LogOut } from 'lucide-react';
import { useCookies } from 'react-cookie';
const TradeXApkUrl = "/TradeX.apk";

const MenuItem = ({ balance, teamCount, commission }) => {
  const [showLanguageDialog, setShowLanguageDialog] = useState(false); // State for showing dialog
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]); //
  const linkRef = useRef(null);
  const apkUrl = "/TradeX.apk"; // Ensure the file is in the 'public' folder

  const handleLogout = () => {
    removeCookie("user", { path: "/" }); 
    navigate("/login");
  };

  const handleApkDownload =()=>{
    if (linkRef.current) {
      linkRef.current.click();
    }
  }

  const items = [
    { name: 'My Order', icon: orderIcon, hint: `₹ ${balance || 0}`, to: '/myorder' },
    { name: 'Team', icon: teamIcon, hint: `${teamCount || 0}`, to: '/team' },
    { name: 'Vip Level', icon: vipIcon, hint: '', to: '/viplevel' },
    { name: 'Fund Record', icon: recordIcon, hint: '', to: '/fundrecord' },
    { name: 'Bank Card', icon: bankIcon, hint: 'Please add bank card', to: '/bankcard' },
    { name: 'Commission', icon: commissionIcon, hint: `₹ ${commission || 0}`, to: '/commission' },
    { name: 'Help Center', icon: helpIcon, hint: '', to: '/help' },
    { name: 'My Info', icon: myIcon, hint: '', to: '/myinfo' },
    { name: 'Reset Password', icon: passwordIcon, hint: '', to: '/resetpassword' },
    // { name: 'Language', icon: languageIcon, hint: '', to: '', onClick: () => setShowLanguageDialog(true) }, // Handle Language click
    { name: 'Download App', icon: downloadIcon, hint: '', to: '',onClick: handleApkDownload, },
    {
      name: "Logout",
      icon: "",
      hint: "",
      to: "",
      onClick: handleLogout, // Call the logout function
    },

  ];

  return (
    <>
    <a ref={linkRef} href={apkUrl} download="TradeX.apk" style={{ display: "none" }}></a>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-[#ECECEC] h-[12.266667vw] last:border-0 cursor-pointer"
          onClick={() => item.onClick ? item.onClick() : navigate(item.to)}
        >
          <div className="flex items-center font-normal ">
            <div className="size-[5.333333vw] mr-[2.666667vw]">
            {item.name === "Logout" ? <LogOut size={'5.333333vw'} /> : <img src={item.icon} alt={`${item.name} icon`} />}
              
             
            </div>
            <div className="text-[3.733333vw]">{item.name}</div>
          </div>
          <div className="flex items-center">
            <div className={`text-[3.2vw] ${index === 0 ? 'text-[#4ca335]' : 'text-[#949494]'}`}>
              <p>{item.hint}</p>
            </div>
            <div className="w-[1.6vw] ml-[1.866667vw]">
              <img src={nextArrow} alt="more icon" />
            </div>
          </div>
        </div>

      ))}
      {<LanguageDialog isOpen={showLanguageDialog} onClose={()=>setShowLanguageDialog(false)}/>} {/* Render LanguageDialog if shown */}
    </>
  );
};

export default MenuItem;
