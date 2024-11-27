import React from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import emptyIcon from '../assets/no_data.png'

const Commission = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      <header className="h-[16vw] w-full text-[5.333333vw]">
        <div className="flex h-full">
          <div className="w-1/3 flex justify-start items-center">
            <button
              className="p-[0_3.2vw] h-[9.6vw] text-[28px]"
              onClick={() => navigate(-1)} // Navigate to the previous page
            >
              <IoChevronBackSharp />
            </button>
          </div>
          <div className="w-1/3 flex justify-center items-center">Commission</div>
        </div>
      </header>
      
      <div className='m-[20vh_0] flex items-center justify-center'>
           <img src={emptyIcon} alt="" />
       </div>
      </div>
  )
}

export default Commission