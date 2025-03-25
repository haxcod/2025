import {useState, useMemo } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchData, postData } from '../services/apiService';
import { format } from 'date-fns';

const ProductProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const {product,mobile,totalCredit} = state?.productData ?? { name: "Unknown", price: 0, description: "No details available" };


  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate daily income
  const dailyIncome = useMemo(() => quantity * (product.dailyEarnings || 0), [quantity, product.dailyEarnings]);
  const totalIncome = useMemo(() => quantity * (product.totalRevenue  || 0), [quantity, product.totalRevenue]);
  const totalPaid = useMemo(() => quantity * (product.currentPrice|| 0), [quantity, product.currentPrice]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }else{
      setQuantity(0)
    }
  };
  const expiryDate = useMemo(() => {
    if (!product?.revenueDays) return null;
    const today = new Date();
    const resultDate = new Date(today);
    resultDate.setDate(resultDate.getDate() + product.revenueDays);
    return resultDate.toISOString(); // Convert to ISO format
  }, [product.revenueDays]);


  // Handle missing product data
  if (!product?.fundName) {
    return <div>Product not found!</div>;
  }


  const handleInvestNow = async() => {
    if (quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    if (product.currentPrice > totalCredit) {
      alert("Insufficient balance. Please recharge.");
      return;
    }



    const allData = {
      mobile: mobile,
      fundName: product.fundName || '',
      status: product.status || '',
      revenueDays: product.revenueDays || '',
      dailyEarnings: product.dailyEarnings || '',
      totalRevenue: product.totalRevenue || '',
      currentPrice: product.currentPrice || '',
      vip: product.vip || '',
      expireDate: expiryDate || ''
    };
    const transactionData ={
      mobile: '7905321205',
      type:'buy',
      amount:product.currentPrice,
      description:product.fundName,
      status:'completed'
    }
    setLoading(true);
    setError('');
    
    try {
      const transactionResponse  = await postData('/api/v1/transactions', transactionData);
      console.log(transactionResponse);
      
      if (!transactionResponse || transactionResponse.status !== 201) {
        throw new Error("Transaction creation failed.");
      }
    
      const { data, status } = await postData('/api/v1/my/product', allData);

      if (status === 201) {
        navigate(-1)
        // alert("Investment successfully recorded!");
        console.log('Response Data:', data);
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to submit the investment. Please try again.');
    } finally {
      setLoading(false);
    }
    
  };
  

  return (
    <div className="relative bg-[#f8f9fa]">
      {/* Header Section */}
      <header className="h-[16vw] w-full flex">
        <div className="h-[16vw] w-full text-[5.333333vw] z-[99] flex items-center">
          <button
            className="w-1/3 flex justify-start items-center p-[0_4vw] h-[9.6vw] text-[28px]"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <IoChevronBackSharp />
          </button>
          <div className="w-1/3 flex justify-center items-center">Profile</div>
        </div>
      </header>

      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[39.466667vw] bg-gradient-to-br from-[#b7e661] to-[#21c93e] rounded-b-[5.333333vw]"></div>

      {/* Error Display */}
      {error && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        role="alert"
        aria-live="assertive"
      >
        <div className="relative bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow-lg w-11/12 max-w-md text-center">
          <button
            className="absolute top-0 right-2 text-red-700 font-bold focus:outline-none"
            onClick={() => setError('')}
            aria-label="Close Error Message"
          >
            &times;
          </button>
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      </div>
    )}



      {/* Buy Quantity and Daily Income Section */}
      <div className="rounded-[2.133333vw] bg-white m-[0_4vw] p-[.666667vw_4.266667vw_3.333333vw] relative z-10">
        {[
          { label: 'Buy Quantity', id: 'buy-quantity', type: 'tel', placeholder: 'Enter Quantity' },
          { label: 'Daily Income', id: 'daily-income', type: 'text', readOnly: true },
        ].map((input, index) => (
          <div key={index} className="mt-[4.266667vw]">
            <p className="text-[#333] text-[4vw]">{input.label}</p>
            <div className="border border-[#d9d9d9] rounded-[2.133333vw] mt-[1.333333vw] flex w-full p-[2.666667vw_4.266667vw] text-[3.733333vw] bg-white">
              <input
                type={input.type}
                id={input.id}
                className="block w-full text-[#323233] bg-transparent outline-none"
                placeholder={input.placeholder || ''}
                readOnly={input.readOnly || false}
                value={input.id === 'daily-income' ? `₹ ${dailyIncome}` : quantity}
                onChange={input.id === 'buy-quantity' ? handleQuantityChange : undefined}
                disabled={loading}
              />
            </div>
          </div>
        ))}
        <p className="text-[#4ca335] text-[3.466667vw] mt-[1.333333vw]">Credit Available: ₹ {totalCredit || 0}</p>
        <button
          className="w-full mt-[4.8vw] p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white bg-[#4ca335] flex justify-center items-center"
          type="button"
        >
          Submit
        </button>
      </div>

      {/* Upgrade Gift Pack Section */}
      <div className="rounded-[2.133333vw] bg-white m-[2.666667vw_4vw] text-[3.2vw] p-[4vw] relative z-10">
        <div className="content_top_box">
          <p className="text-[4.266667vw] font-bold mb-[4vw]">{product.fundName}</p>
          {[
            { label: 'Each price', value: `₹ ${product.currentPrice || 0}` },
            { label: 'Revenue', value: `${product.revenueDays || 0} days` },
            { label: 'Maximum', value: '1' },
          ].map((item, index) => (
            <div key={index} className="flex justify-between mb-[3.2vw]">
              <p className="text-[#666] text-[4vw]">{item.label}</p>
              <p
                className={`text-[4vw] ${
                  item.value.includes('₹') ? 'text-[#4ca335]' : 'text-black text-opacity-85'
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <div className="relative border-t border-dashed border-[#cbcbcb] p-[3.333333vw_6.4vw_.666667vw] mt-[2vw]">
          <div className="flex justify-between">
            <p className="text-[#666] text-[4vw]">Total Revenue</p>
            <p className="text-[4.533333vw] font-bold text-[#4ca335]">₹ {totalIncome || 0}</p>
          </div>
        </div>
      </div>

      {/* VIP Notice Section */}
      <div className="m-[4vw_4vw_0] pb-[21.333333vw] relative z-10">
        <p className="text-black text-opacity-85 text-[4vw] mb-[1.333333vw]">{product.fundName}</p>
        <div className="flex">
          <div className="w-[1.333333vw] h-[1.333333vw] rounded-full bg-[#4ca335] mr-[1.333333vw] mt-[1.6vw]" />
          <div className="text-black text-opacity-65 text-[3.2vw] leading-[4.666667vw] w-[98%]">
            <p>
              When your VIP level reaches "<strong className="text-[#008a00]">VIP{product.vip || 0}</strong>", you
              can purchase this upgrade package. Hurry up to level up and claim it!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar Section */}
      <div className="w-full h-[17.333333vw] fixed bottom-0 bg-white flex justify-between items-center p-[0_4vw_0_8.933333vw] z-20">
        <div>
          <p className="text-[3.2vw]">Actually Paid</p>
          <p className="text-[#4ca335] text-[4.533333vw] font-bold mt-[1.866667vw]">₹ {totalPaid}</p>
        </div>
        <button
          className="p-[3.466667vw_9.066667vw] text-[3.466667vw] text-white rounded-[2.13333vw] h-[12.8vw] bg-[#4CA335] flex items-center justify-center"
          type="button"
         onClick={handleInvestNow}
         disabled={loading}
         >
          {loading ? 'Processing...': 'Invest Now'}
        </button>
      </div>
    </div>
  );
};

export default ProductProfile;
