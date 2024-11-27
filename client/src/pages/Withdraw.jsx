import React, { useEffect, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import AccountBalance from '../components/AccountBalance';
import WithdrawCash from '../components/WithdrawCash';
import ToBind from '../components/ToBind';
import ExplanationWithdraw from '../components/ExplainationWithdraw';
import WithdrawUSDT from '../components/WithdrawUSDT';
import AccountTypeSelector from '../components/AccountTypeSelector';
import axios from 'axios';

const Withdraw = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(1);
  const [bankData, setBankData] = useState({
    holderName: '',
    mobile: '',
    ifscCode: '',
    accountNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getData = async () => {
    try {
      setLoading(true); // Start loading
      setError(''); // Clear any previous error
      const response = await axios.get('http://localhost:3000/api/v1/bank', {
        params: { mobile: '7905321205' },
      });
      if (response.data.data && response.data.data.length > 0) {
        const data = response.data.data.at(-1); // Get the latest data
        setBankData({
          holderName: data.holder,
          mobile: data.mobile,
          accountNumber: data.account,
          ifscCode: data.ifsc,
        });
      } else {
        return <ToBind />
      }
    } catch (err) {
      console.error('Error fetching data:', err.message);
      setError('Failed to fetch bank data. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      <header className="h-[16vw] w-full text-[5.333333vw]">
        <div className="flex h-full">
          <div className="w-1/3 flex justify-start items-center">
            <button className="p-[0_3.2vw] h-[9.6vw] text-[28px]" onClick={() => navigate(-1)}>
              <IoChevronBackSharp />
            </button>
          </div>
          <div className="w-1/3 flex justify-center items-center">Withdraw</div>
        </div>
      </header>

      <div className="p-[0_4.533333vw]">
        <AccountTypeSelector isActive={isActive} setIsActive={setIsActive} />
        <AccountBalance />
        
        {/* Loading, error, and conditional rendering */}
        {loading && <p className='text-center'>Loading bank data...</p>}

        {error && !loading && <p className='text-center text-red-500'>{error}</p>}

        {!loading && !error && (
          isActive === 1 ? (
            bankData.accountNumber ? (
              <WithdrawCash bankData={bankData} />
            ) : (
              <ToBind />
            )
          ) : bankData.accountNumber ? (
            <WithdrawUSDT bankData={bankData} />
          ) : (
            <ToBind />
          )
        )}

        <ExplanationWithdraw />
      </div>
    </div>
  );
};

export default Withdraw;
