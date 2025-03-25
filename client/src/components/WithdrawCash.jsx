import React, { useState } from 'react';
import axios from 'axios';
import { fetchData, postData } from '../services/apiService';
import PaymentConfirmation from './PaymentConfirmation';
import { useNavigate } from 'react-router-dom';

const WithdrawCash = ({ bankData,balance }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    // Convert withdrawAmount to a number for proper validation
    const amount = Number(withdrawAmount);
    
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid withdrawal amount.');
      return;
    }
    if (amount < 200) { 
      setError('Minimum withdrawal amount is 200'); 
      return; 
    }
    if (amount > balance) { 
      setError('Insufficient balance for withdrawal.');
      return;
    }
  
   
    // Prepare data for withdrawal
    const allData = {
      amount: withdrawAmount,
      mobile: bankData?.mobile,
      type: "debit",
      status:'completed',
      description:'Withdraw'
    };
    setLoading(true);
    try {
      const response = await postData('/api/v1/transactions',  allData );
      // console.log(response);
      
      if (response.status === 201) {
        // alert(`Successfully withdrew ₹${withdrawAmount}`);
        setWithdrawAmount(''); // Clear the input field after successful withdrawal
        navigate('/successful', {state:{amount:withdrawAmount}})
      }
    } catch (error) {
      console.error('Error during withdrawal:', error);
      setError('There was an error processing the withdrawal.');
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="withdraw">
      <div className="p-[4vw_2.666667vw_2.666667vw] rounded-[2.666667vw] bg-white mb-[2.666667vw]">
        <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
          <span>Withdraw amount</span>
        </div>
        <div className="border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-white">
          <span className="text-[3.733333vw] text-[#4ca335] mr-[1.333333vw]">₹</span>
          <input
            type="tel"
            inputMode="numeric"
            className="block w-full bg-transparent outline-none"
            placeholder="Please enter withdraw amount..."
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <p className="text-red-500 text-[3.33vw]">{error}</p>} {/* Display error message */}
      </div>

      <div className="p-[4vw_2.666667vw_2.666667vw] rounded-[2.666667vw] bg-white">
        <p className="text-[#333] text-[4.266667vw] font-bold mb-[4vw]">Deposit exchange</p>
        
        <div className="mb-[2.666667vw]">
          <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
            <span>Holder Name</span>
          </div>
          <div className="border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-gray-100 cursor-not-allowed">
            <div className="block w-full bg-transparent">{bankData.holderName}</div>
          </div>
        </div>

        <div className="mb-[2.666667vw]">
          <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
            <span>Bank Account</span>
          </div>
          <div className="border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-gray-100 cursor-not-allowed">
            <div className="block w-full bg-transparent">{bankData.accountNumber}</div>
          </div>
        </div>

        <div className="mb-[2.666667vw]">
          <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
            <span>IFSC Code</span>
          </div>
          <div className="border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-gray-100 cursor-not-allowed">
            <div className="block w-full bg-transparent">{bankData.ifscCode}</div>
          </div>
        </div>
      </div>

      <button
        className="mt-[6.666667vw] p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white bg-[#4CA335] w-full outline-none active:bg-[#459330]"
        type="button"
        onClick={handleWithdraw}
      >
        <div>
        {loading ? 'Processing...' : 'Confirm'}
        </div>
      </button>
    </div>
  );
};

export default WithdrawCash;
