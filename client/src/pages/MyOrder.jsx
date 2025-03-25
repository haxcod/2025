import React, { useEffect, useState } from 'react';
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import meBg from '../assets/me_bg.png';
import emptyIcon from '../assets/no_data.png';
import PurchasedProducts from '../components/PurchasedProducts';
import ExpiredProducts from '../components/ExpiredProducts';
import { fetchData, postData } from '../services/apiService';

const MyOrder = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('vo'); // Track active button
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalClaimed, setTotalClaimed] = useState(0)

  // Fetch products data
  const getProductsData = async () => {
    setLoading(true);
    try {
      const  data  = await fetchData('/api/v1/my/product', {
        params: { mobile: '7905321205' },
      });
      console.log(data.data);
      
      // Calculate total claimed from the products data
      const totalClaimedAmount = data.data.reduce((total, product) => total + product.claimed, 0);
      setTotalClaimed(totalClaimedAmount);
      setProducts(data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Refetch products data every time the tab changes
  useEffect(() => {
    getProductsData();
  }, [isActive]); // Dependency on isActive ensures data is fetched when tab changes

  // Check if product is expired
  const isExpired = (expirationDate) => {
    if (!expirationDate) return false;
    const today = new Date();
    const expiry = new Date(expirationDate);
    return !isNaN(expiry.getTime()) && expiry < today;
  };

  // Filter products based on active filter
  const filteredProducts = products.filter((product) =>
    isActive === 'vo' ? !isExpired(product.expireDate) : isExpired(product.expireDate)
  );

  // Handle button click
  const handleClick = (type) => {
    setIsActive(type);
  };

  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      {/* Header Section */}
      <header className='h-[16vw] w-full text-[5.333333vw]'>
        <div className='flex h-full'>
          <div className='w-1/3 flex justify-start items-center'>
            <button
              className='p-[0_4vw] h-[9.6vw] text-[28px]'
              onClick={() => navigate(-1)}
            >
              <IoChevronBackSharp />
            </button>
          </div>
          <div className='w-1/3 flex justify-center items-center'>
            My Order
          </div>
        </div>
      </header>

      {/* Content Section */}
      <div className='p-[0_4vw]'> 

        {/* Balance and Revenue Box */}
        <div
          className='h-[29.3333vw] box-border p-[9.333333vw_2.4vw_2.666667vw] bg-no-repeat bg-[length:100%_100%] text-[3.466667vw] flex justify-between text-center text-black text-opacity-[.65]'
          style={{ backgroundImage: `url(${meBg})` }}
        >
          <div className='w-1/2'>
            <p className='font-extrabold text-[6.4vw] mb-[2.133333vw] text-black'> ₹{0}</p>
            <p>Deposit Balance</p>
          </div>
          <div className='w-1/2'>
            <p className='font-extrabold text-[6.4vw] mb-[2.133333vw] text-black'> ₹{totalClaimed || 0}</p>
            <p>Total Revenue</p>
          </div>
        </div>

        {/* Orders Buttons */}
        <div className='mt-[2.933333vw] mb-[2.933333vw] relative'>
          <div className='h-[11.733333vw] text-[3.733333vw]'>
            <div className='flex justify-between h-[8.666667vw] bg-transparent box-content pb-[4vw]'>

              {/* Valid Orders Button */}
              <div
                className={`rounded-[4.266667vw] w-[48%] flex justify-center items-center border-[.266667vw] border-[#f0f0f0] text-[#323233] font-semibold transition-colors duration-500 ${
                  isActive === 'vo' ? 'bg-[#4CA335]' : 'bg-white'
                }`}
                onClick={() => handleClick('vo')}
              >
                <span
                  className={`font-normal ${isActive === 'vo' ? 'text-white' : 'text-[#343434]'}`}
                >
                  Valid Orders
                </span>
              </div>

              {/* Expired Orders Button */}
              <div
                className={`rounded-[4.266667vw] w-[48%] flex justify-center items-center border-[.266667vw] border-[#f0f0f0] text-[#323233] font-semibold transition-colors duration-500 ${
                  isActive === 'eo' ? 'bg-[#4CA335]' : 'bg-white'
                }`}
                onClick={() => handleClick('eo')}
              >
                <span
                  className={`font-normal ${isActive === 'eo' ? 'text-white' : 'text-[#343434]'}`}
                >
                  Expired Orders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        {loading ? (
          <div className="mt-20 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="mt-20 flex items-center justify-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="mt-20 flex items-center justify-center">
            <img src={emptyIcon} alt="No Data" className="w-[50%]" />
          </div>
        ) : (
          <section className="products">
            <div className="mt-4 mb-4 grid grid-cols-1 gap-4">
              {filteredProducts.slice().reverse().map((product, index) =>
                isActive === 'vo' ? (
                  <PurchasedProducts key={index} product={product} claim={totalClaimed} setClaim={setTotalClaimed}/>
                ) : (
                  <ExpiredProducts key={index} product={product} />
                )
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
