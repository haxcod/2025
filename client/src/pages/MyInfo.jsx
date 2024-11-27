import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import editIcon from '../assets/edit_icon.png';

const MyInfo = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header Section */}
      <header className='h-[16vw] w-full text-[5.333333vw] bg-[#ecf9e0]'>
        <div className='flex h-full'>
          <div className='w-1/3 flex justify-start items-center'>
                <button
                className='p-[0_4vw] h-[9.6vw] text-[28px]'
                onClick={() => navigate(-1)} // Navigate to the previous page
                >
                <IoChevronBackSharp />
            </button>
          </div>
          <div className='w-1/3 flex justify-center items-center'>
            My Info
          </div>
        </div>
      </header>

      {/* Avatar Section */}
      <div className="bg-[#ecf9e0] h-[22vw]" />
      <div className="bg-white p-[21.333333vw_8.266667vw] relative">
        <div className="w-[32vw] absolute left-0 right-0 m-auto top-[-16.666667vw]">
          <div className="relative size-[32vw] rounded-full">
            <img
              className="rounded-full w-full h-full object-cover bg-[#f7f8fa] transition-colors duration-300"
              src="https://api.dehaatll.com/storage/client/default.jpg"
              alt="Avatar"
            />
            <input type="file" className="w-0 h-0 invisible" accept="image/*" />
            <div className="absolute right-0 bottom-[1.333333vw] size-[8.533333vw]">
              <img src={editIcon} className='w-full h-full' alt="Edit Icon" />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="pb-[3.466667vw]">
          <label className="block pb-[1.066667vw] text-[4vw]" style={{ lineHeight: '5.333333vw' }}>
            User Name
          </label>
          <div className="p-[1.333333vw_3.733333vw] bg-white rounded-[2.133333vw] h-[13.066667vw] border border-black border-opacity-15 flex items-center">
            <input
              className="w-full outline-none bg-transparent text-black caret-[#4CA335] text-[4vw]"
              type="text"
              placeholder="Please enter user name..."
              autoComplete="off"
            />
          </div>
        </div>

        <div className="pb-[3.466667vw]">
          <label className="block pb-[1.066667vw] text-[4vw]" style={{ lineHeight: '5.333333vw' }}>
            E-mail
          </label>
          <div className="p-[1.333333vw_3.733333vw] bg-white rounded-[2.133333vw] h-[13.066667vw] border border-black border-opacity-15 flex items-center">
            <input
              className="w-full outline-none bg-transparent text-black caret-[#4CA335] text-[4vw]"
              type="text"
              placeholder="Please enter email..."
              autoComplete="off"
            />
          </div>
        </div>

        {/* Confirm Button */}
        <button className="mt-[5.333333vw] w-full h-[12.8vw] text-[4.266667vw] text-white bg-[#4CA335] rounded-[2.133333vw] flex justify-center items-center">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default MyInfo;
