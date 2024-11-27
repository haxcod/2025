import React from 'react';
import depositIcon from '../assets/deposit_icon.png';
import withdrawIcon from '../assets/withdraw_icon.png';
import teamIcon from '../assets/team_icon.png';
import aboutIcon from '../assets/about_icon.png';
import { useNavigate } from 'react-router-dom';

const TabBox = () => {
    const navigate = useNavigate()

    const tabItem = [
        {
            label: 'Deposit',
            icon: depositIcon,
            to:'/deposit'
        },
        {
            label: 'Withdraw',
            icon: withdrawIcon,
             to:'/withdraw'
        },
        {
            label: 'Team',
            icon: teamIcon,
             to:'/team'
        },
        {
            label: 'About',
            icon: aboutIcon,
             to:'/about'
        }
    ];

    return (
        <div className="m-[4.8vw_4.666667vw] flex justify-between">
            {tabItem.map((item, index) => (
                <div key={index} className="text-center">
                    <div className="w-[15.466667vw] h-[15.466667vw] flex justify-center items-center rounded-[3.2vw] bg-white m-[0_auto]" onClick={()=>navigate(item.to)}>
                        <div className="w-[5.866667vw] h-auto">
                            <img src={item.icon} alt={item.label} />
                        </div>
                    </div>
                    <p className="text-[3.733333vw] font-medium text-center mt-[2.133333vw]">
                        {item.label}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TabBox;
