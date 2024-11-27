import React from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
  return (
    <div>
         <header className='h-[16vw] w-full text-[5.333333vw] bg-[#ecf9e0]'>
        <div className='flex h-full'>
          <div className='w-[20%] flex justify-start items-center'>
                <button
                className='p-[0_4vw] h-[9.6vw] text-[28px]'
                onClick={() => navigate(-1)} // Navigate to the previous page
                >
                <IoChevronBackSharp />
            </button>
          </div>
          <div className='w-[60%] flex justify-center items-center'>
            Reset Password
          </div>
        </div>
       </header>
       <div className='mt-[5.333333vw] p-[0_6.666667vw]'>
       <div className="pb-[3.466667vw]">
          <label className="block pb-[1.066667vw] text-[4vw]" style={{ lineHeight: '5.333333vw' }}>
            Mobile Number
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
           Old password
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
            New password
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
            Confirm password
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
        <button className="mt-[5.333333vw] w-full h-[12.8vw] text-[4.266667vw] text-white bg-[#4CA335] rounded-[2.133333vw] flex justify-center items-center">
          Confirm
        </button>
       </div>
    </div>
  )
}

export default ResetPassword