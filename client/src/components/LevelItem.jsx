import React from 'react';
import level0 from '../assets/level-0.png';
import level1 from '../assets/level-1.png';
import level2 from '../assets/level-2.png';
import level3 from '../assets/level-3.png';
import level4 from '../assets/level-4.png';
import level5 from '../assets/level-5.png';
import level6 from '../assets/level-6.png';
import level7 from '../assets/level-7.png';
import lv1 from '../assets/lv1.png';
import lv2 from '../assets/lv2.png';
import lv3 from '../assets/lv3.png';
import lv4 from '../assets/lv4.png';
import lv5 from '../assets/lv5.png';
import lv6 from '../assets/lv6.png';
import lv7 from '../assets/lv7.png';

const LevelItem = () => {
  const levels = [
    {
      amount: '0',
      label: 'This level of VIP requires a total investment amount of ',
      bg: level0,
      levelImg: lv1,
    },
    {
      amount: '495',
      label: 'This level of VIP requires a total investment amount of ',
      bg: level1,
      levelImg: lv1,
    },
    {
      amount: '6,950',
      label: 'This level of VIP requires a total investment amount of ',
      bg: level2,
      levelImg: lv2,
    },
    {
      amount: '29,999',
      label: 'This level of VIP requires a total investment amount of ',
      bg: level3,
      levelImg: lv3,
    },
    {
      amount: '100,000',
      label: 'This level of VIP requires a total investment amount of ',
      bg: level4,
      levelImg: lv4,
    },
    {
      amount: '300,000',
      label: 'This level of VIP requires a total investment amount of ',
      bg: level5,
      levelImg: lv5,
    },
    {
      amount: '700,000',
      label: 'This level of VIP requires a total investment amount of ',
      bg: level6,
      levelImg: lv6,
    },
    {
      amount: '1,000,000',
      label: 'This level of VIP requires a total investment amount of ',
      bg: level7,
      levelImg: lv7,
    },
  ];

  return (
    <div className="level-list">
      {levels.map((level, index) => (
        <div
          key={index}
          className="min-h-[28vw] rounded-[2.133333vw] mb-[2.666667vw] p-[4vw]"
          style={{
            backgroundImage: `url(${level.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="w-[15.466667vw] h-[6.4vw]">
              <img 
                src={level.levelImg} 
                alt={`Level ${index}`} 
                style={{ width: '100%', height: 'auto' }} 
              />
            </div>
            <p className="font-semibold text-[6.4vw]">{level.amount}</p>
          </div>
          <div className="mt-[4vw] text-[3.733333vw]">
            {level.label} 
          </div>
        </div>
      ))}
    </div>
  );
};

export default LevelItem;
