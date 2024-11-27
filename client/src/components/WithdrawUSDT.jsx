import React, { useState } from 'react';

// Reusable Input Field Component
const InputField = ({ label, prefix, value, onChange, placeholder = "Enter value...", disabled = false }) => (
  <div className="mb-[4vw]">
    <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
      <span>{label}</span>
    </div>
    <div className={`border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] ${disabled ? 'bg-gray-100' : 'bg-white'}`}>
      {prefix && <span className="text-[3.733333vw] text-[#4ca335] mr-[1.333333vw]">{prefix}</span>}
      <input
        type="tel"
        inputMode="numeric"
        className="block w-full bg-transparent outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  </div>
);

// Reusable Display Field Component
const DisplayField = ({ label, value }) => (
  <div className="mb-[2.666667vw] ">
    <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
      <span>{label}</span>
    </div>
    <div className="border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-gray-100 cursor-not-allowed">
      <div className="block w-full bg-transparent">{value}</div>
    </div>
  </div>
);

const WithdrawUSDT = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const holderName = "John Doe"; 
  const bankAccount = "123456789";
  const ifscCode = "ABC123456";

  // Calculate withdrawExchange based on withdrawAmount
  const withdrawExchange = withdrawAmount ? (withdrawAmount * 95).toFixed(2) : '';

  return (
    <div className="withdraw">
      <div className="p-[4vw_2.666667vw_2.666667vw] rounded-[2.666667vw] bg-white mb-[2.666667vw]">
        <InputField
          label="Withdraw amount"
          prefix="₹"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Please enter withdraw amount..."
        />
        <InputField
          label="Withdraw exchange"
          prefix="₹"
          value={withdrawExchange|| '--'}
          onChange={() => {}}
          disabled
        />
      </div>

      <div className="p-[4vw_2.666667vw_2.666667vw] rounded-[2.666667vw] bg-white">
        <p className="text-[#333] text-[4.266667vw] font-bold mb-[4vw]">Withdraw Method</p>
        <DisplayField label="Holder Name" value={holderName} />
        <DisplayField label="Bank Account" value={bankAccount} />
        <DisplayField label="IFSC Code" value={ifscCode} />
      </div>

      <button
        className="mt-[6.666667vw] p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white bg-[#4CA335] w-full outline-none active:bg-[#459330]"
        type="button"
        onClick={() => console.log('Withdraw confirmed')}
      >
        <div>Confirm</div>
      </button>
    </div>
  );
};

export default WithdrawUSDT;
