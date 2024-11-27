import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import Product from '../components/Product';

// Import icons
import fundIcon1 from '../assets/fund_icon1.png';
import fundIcon1Active from '../assets/fund_icon1_active.png';
import fundIcon2 from '../assets/fund_icon2.png';
import fundIcon2Active from '../assets/fund_icon2_active.png';
import fundIcon3 from '../assets/fund_icon3.png';
import fundIcon3Active from '../assets/fund_icon3_active.png';
import fundIcon4 from '../assets/fund_icon4.png';
import fundIcon4Active from '../assets/fund_icon4_active.png';

// Import JSON data
import productData from '../data/products.json';

const Products = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // Structure tabs using JSON data
  const productTabs = [
    { name: "Land Fund", data: productData.landfund },
    { name: "Upgrade Benefits", data: productData.upgrade },
    { name: "Seed Fund", data: productData.seeds },
    { name: "Mutual Funds", data: productData.mutual },
  ];

  const currentProducts = productTabs[current].data;

  const handleClick = (product) => {
    navigate('/profile',{state:{product}});
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col relative">
        <div className="pb-[8vw] text-center bg-gradient-to-br from-[#b7e661] to-[#21c93e] sticky left-0 top-0">
          <div className="text-[5.333333vw] font-medium leading-[7.466667vw] p-[4.266667vw_0]">
            Product
          </div>

          <div className="flex justify-around">
            {productTabs.map((tab, index) => (
              <div
                key={index}
                className="text-center"
                onClick={() => setCurrent(index)}
              >
                <div
                  className={`w-[15.466667vw] h-[15.466667vw] flex justify-center items-center rounded-[3.2vw] m-[0_auto] ${
                    index === current ? 'bg-[#000]' : 'bg-[#bbeda9]'
                  }`}
                >
                  <div className="w-[5.866667vw] h-auto">
                    <img
                      src={index === current ? fundIcon1Active : fundIcon1}
                      alt={`${tab.name} icon`}
                    />
                  </div>
                </div>
                <p className="text-[3.733333vw] font-medium text-center mt-[2.133333vw]">
                  {tab.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[-3.2vw] pt-[3.2vw] mb-[20vw] rounded-t-[5.333333vw] bg-[#f0f1f3] z-0 flex-1 overflow-y-auto h-screen">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <Product
                key={index}
                {...product}
                handleInvest={()=>handleClick(product)}
              />
            ))
          ) : (
            <p className="text-center p-4">No products available in this category.</p>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-20">
        <BottomBar />
      </div>
    </>
  );
};

export default Products;
