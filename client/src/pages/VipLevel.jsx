import React from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import levelBg from '../assets/level_bg.png'
import myLevel from '../assets/my_level.png'
import rsIcon from '../assets/rs_icon.png'
import LevelItem from '../components/LevelItem';

const VipLevel = () => {
  const navigate = useNavigate();

  // Dynamic points and progress
  const currentPoints = 0;
  const requiredPoints = 495;
  const progressPercentage = (currentPoints / requiredPoints) * 100;

  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col relative z-[0]">
      {/* Header */}
      <header className='h-[16vw] w-full text-[5.333333vw] z-10'>
        <div className='flex h-full'>
          <div className='w-1/3 flex justify-start items-center'>
            <button
              className='p-[0_4vw] h-[9.6vw] text-[28px]'
              onClick={() => navigate(-1)} // Navigate to the previous page
            >
              <IoChevronBackSharp color='white'/>
            </button>
          </div>
          <div className='w-1/3 flex justify-center items-center text-white'>
            Vip Level
          </div>
        </div>
      </header>

      {/* Background Image */}
      <div 
        className='absolute top-0 w-full h-[60vw] bg-cover bg-no-repeat z-[-1]' 
        style={{ 
          backgroundImage: `url(${levelBg})`, 
          backgroundSize: '100% 100%' 
        }}>
      </div>

      {/* Content */}
      <div className='p-[0_6.266667vw]'>
        {/* User Info */}
        <div className='flex items-center'>
          <div className='w-[14.666667vw] h-[14.666667vw] rounded-full overflow-hidden mr-[3.333333vw]'>
            <img src="https://api.dehaatll.com/storage/client/default.jpg" alt="User Profile" className="w-full h-full object-cover"/>
          </div>
          <div>
            <p className='text-white text-[5.333333vw]'>ID: 120041</p>
            <p className='text-[#949494] text-[3.733333vw] mt-[1.333333vw]'>+91 790****205</p>
          </div>
        </div>

        {/* Current Level Section */}
        <div className='w-full min-h-[40vw] mb-[0.666667vw] mt-[6.666667vw] relative' 
          style={{ 
            backgroundImage: `url(${myLevel})`, 
            backgroundSize: '100% 100%' 
          }}>
          {/* Current Level Label */}
          <div className='absolute flex justify-center items-center top-0 right-0 rounded-[0_1.333333vw_0_0] h-[5.866667vw] text-white text-[2.933333vw] p-[0_1.333333vw]'
            style={{
              background: 'linear-gradient(270deg, rgb(0, 0, 0), rgba(0, 0, 0, 0.8) 100%)'
            }}>
            Current Level
          </div>

          {/* Level Text with Gradient */}
          <div className='bg-clip-text text-transparent text-[10.666667vw] font-bold pl-[18%] pt-[4%]' 
            style={{ backgroundImage: 'linear-gradient(1.97deg, rgb(56, 30, 6), rgb(143, 98, 37))' }}>
            Lv.0
          </div>

          {/* Upgrade Progress */}
          <div className='text-[2.933333vw] ml-[5.333333vw] mt-[2.666667vw]'>
            {requiredPoints - currentPoints} left to upgrade to next level
          </div>
          <div className='h-[2px] m-[6vw_4.666667vw_3.733333vw] relative rounded-[1.066667vw]' style={{ background: 'rgb(247, 242, 236)' }}>
            <span className='absolute left-0 h-full rounded' style={{ width: `${progressPercentage}%`, background: 'rgb(0, 0, 0)' }}></span>
          </div>

          {/* Points Info */}
          <div className='flex items-center justify-between pb-[20px]'> 
            <div className='flex items-center'>
              <div className='w-[3.466667vw] h-[3.466667vw] m-[0_1.333333vw_0_4.666667vw]'>
                <img src={rsIcon} alt="Rupee Icon" className="w-full h-full object-cover" />
              </div>
              <div className='text-[3.2vw] mt-[1px] mr-[0.666667vw]'>{currentPoints}/{requiredPoints}</div>
            </div>
            <div className='text-[2.4vw] mr-[4.666667vw]'>Unlock 1 additional benefit after upgrading</div>
          </div>
        </div>

        {/* Membership Level Section */}
        <p className='text-[5.333333vw] text-black mb-[2vw] mt-[5.333333vw]'>Membership Level</p>
        <LevelItem />
      </div>
    </div>
  )
}

export default VipLevel;
