import React, { useState } from 'react';

const DepositUSDT = () => {
  const [depositAmount, setDepositAmount] = useState('');
  
  // Calculate the deposit exchange
  const depositExchange = depositAmount ? (depositAmount * 95).toFixed(2) : '';

  return (
    <div className='p-[4vw_2.666667vw_2.666667vw] rounded-[2.666667vw] bg-white'>
      <div className="mb-[2.666667vw]">
        <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
          <span>Deposit amount</span>
        </div>
        <div className="border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-white">
          <span className="text-[3.733333vw] text-[#4ca335] mr-[1.333333vw]">₮</span>
          <input
            type="tel"
            inputMode="numeric"
            className="block w-full bg-transparent outline-none"
            placeholder="Please enter deposit amount..."
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-[2.666667vw]">
        <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
          <span>Deposit exchange</span>
        </div>
        <div className="border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-white">
          <span className="text-[3.733333vw] text-[#4ca335] mr-[1.333333vw]">₹</span>
          <input
            type="tel"
            inputMode="numeric"
            className="block w-full bg-transparent outline-none"
            value={depositExchange}
            disabled
          />
        </div>
      </div>

      <div className="mb-[2.666667vw]">
        <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
          <span>Deposit Channel</span>
        </div>
        <div className="border border-[#4ca335] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-[#edf6ea]">
          <input
            className='text-[#4ca335]'
            type="tel"
            inputMode="numeric"
            disabled
            value={'₹10~₹10,000'}
          />
        </div>
      </div>

      <button
        className="mt-[6.666667vw] p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white bg-[#4CA335] w-full outline-none active:bg-[#459330]"
        type="button"
      >
        <div>To Deposit</div>
      </button>
    </div>
  );
}

export default DepositUSDT;
