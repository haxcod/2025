import React from 'react';
import { TiHomeOutline } from 'react-icons/ti';
import { TbCube } from 'react-icons/tb';
import { PiFlowerTulipBold } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const BottomBar = () => {
  const location = useLocation(); // Get current location
  const currentPath = location.pathname.toLowerCase(); // Get the current path

  const buttonData = [
    { label: 'Home', icon: TiHomeOutline, to: '/' },
    { label: 'Product', icon: TbCube, to: '/products' },
    { label: 'Comment', icon: PiFlowerTulipBold, to: '/comments' },
    { label: 'Me', icon: FaRegUser, to: '/my' },
  ];

  const isActive = (to) => currentPath === to.toLowerCase(); // Check if the current path matches the button's path

  return (
    <footer className="bottom-bar">
      <div className="h-[16vw]" /> {/* Spacer */}
      <div
        className="fixed bottom-0 left-0 h-[16vw] w-full z-10 shadow-md bg-white flex transition-colors duration-250"
        style={{ boxShadow: '0 -0.533333vw 1.6vw 0 rgba(211, 211, 211, 0.24)' }}
      >
        {buttonData.map((button, index) => {
          const IconComponent = button.icon;

          return (
            <Link
              key={index}
              to={button.to}
              aria-label={button.label}
              className={`flex-auto flex items-center justify-center p-[1.6vw] bg-transparent z-10 transition-all duration-250
                ${isActive(button.to) ? 'text-[#4CA335]' : 'text-[#979797]'}`}
              style={{ transition: 'margin 0.25s' }}
            >
              <div
                className={`flex items-center transition-all duration-250 ${isActive(button.to) ? 'bg-[#4CA335] rounded-[4.133333vw] p-[0_4vw_.266667vw] h-[8.266667vw] text-white' : ''}`}
              >
                <IconComponent
                  className={`text-[5.333333vw] mr-[1.6vw] transition-colors duration-250 ${isActive(button.to) ? 'text-white' : 'text-[#bac3d2]'}`}
                />
                {isActive(button.to) && (
                  <span className="text-[3.733333vw] font-medium">
                    {button.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default BottomBar;
