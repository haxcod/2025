import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { RatingReview } from '../components/RatingReview';

const NewComment = () => {
    const navigate = useNavigate()
  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      <header className='h-[16vw] w-full text-[5.333333vw]'>
        <div className='flex h-full'>
          <div className='w-1/3 flex justify-start items-center'>
            <button className='p-[0_4vw] h-[9.6vw] text-[28px]'><IoChevronBackSharp  onClick={()=>navigate(-1)}/></button>
          </div> 
          <div className='w-1/3 flex justify-center items-center'>Comment</div>
        </div>
      </header>
      <div className="rounded-[2.666667vw] bg-white p-[6.133333vw_4.4vw_3.733333vw] m-[0_4vw_2.666667vw]">
        <p className="text-[#161827] text-[4.266667vw] mb-[3.333333vw]">
          Utterance
        </p>
        <div className="h-[52vw] p-[1.333333vw_2.933333vw] bg-[#f6f6f8] rounded-[2.666667vw] w-full flex text-[3.733333vw]">
          <textarea
            aria-label="Enter your comment"
            className="flex-grow block box-border w-full text-[#323233] text-left bg-transparent resize-none outline-none"
            placeholder="Please enter utterance..."
            defaultValue={""}
          />
        </div>
      </div>

      <div className="rounded-[2.66667vw] bg-white p-[6.13333vw_4.4vw_3.73333vw] m-[0px_4vw_2.66667vw]">
      <p className="text-[rgb(22, 24, 39)] text-[4.26667vw] mb-[3.33333vw]">Picture upload</p>
      <div className="w-full box-border">
        <div className="w-full flex flex-wrap">
          <div className="size-[25.0667vw] bg-[#f7f8fa] shadow-none flex justify-center items-center m-[0_2.666667vw_2.666667vw_0] cursor-pointer ">
            <input
              type="file"
              className="block size-0 invisible"
              multiple
              accept="image/*"
              aria-label="Upload pictures"
            />
            <FaPlus
              className="text-[#cccccc] text-[6.4vw] "
              style={{ transitionDuration: "0ms" }}
            />
            <div className="var-hover-overlay" />
          </div>
        </div>
        <div className="flex justify-between text-[3.733333vw] mt-[1.6vw]">
          <div className="flex-grow text-[#D44343] mr-[1.066667vw] text-left" />
          <div className="flex-grow-0 text-[#888] text-right">
            <div>0 / 9</div>
          </div>
        </div>
      </div>
      <p className="text-[#161827] text-[4.26667vw] mb-[1.33333vw]">Score</p>
      <div className="flex items-center">
        <div className="h-[10.6667vw] flex items-center p-[0px_4.66667vw] rounded-[5.33333vw] bg-[#f0f0f0]">
          <RatingReview/>
        </div>
        <p className="text-black opacity-85 text-[3.73333vw] ml-[2.4vw]">5 POINTS</p>
      </div>
    </div>

      <button className='m-[3.73333vw_4vw_0] p-[0_.26667vw] rounded-[2.13333vw] h-[12.8vw] text-[4.266667vw] bg-[#4CA335] text-white' style={{width: `calc(100% - 8vw)`}}>Confirm</button>
    </div>
  );
};

export default NewComment;
