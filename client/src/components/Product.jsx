import vip1 from '../assets/vip1.png';
import vip2 from '../assets/vip2.png';
import vip3 from '../assets/vip3.png'; 
import vip4 from '../assets/vip4.png';

const Product = ({ fundName, status, revenueDays, dailyEarnings, totalRevenue, currentPrice, vip, handleInvest }) => {
  return (
    <div className="m-[0_4.4vw_2.666667vw] p-[3.333333vw_4vw_4.666667vw] bg-white relative rounded-[2.133333vw]">
      <div className="flex justify-between items-center pb-[3.2vw] border-b-[.266667vw] border-[#e9ecef] mb-[4vw]">
        <div>
          <p className="text-[#212529] text-[4.8vw]">
            {fundName}
            <span className="bg-[#ff6600] bg-opacity-20 text-[#f60] inline-block rounded-[0px_1.333333vw] text-[3.2vw] font-medium p-[1px_2vw]">
              {status}
            </span>
          </p>
          <p className="text-[#404040] text-[3.466667vw] mt-[2vw]">Revenue: {revenueDays} days</p>
        </div>
        <p className="text-[#4ca335] text-[6.4vw] min-w-[25%]">
          <span className="text-[3.733333vw] text-[#4ca335]">₹</span>
          {currentPrice}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[#4ca335] text-[4.8vw]">
            <span className="text-[3.733333vw] text-[#4ca335]">₹</span>
            {dailyEarnings}
          </p>
          <p className="text-[3.466667vw] text-[#595959] mt-[2vw]">Daily Earnings</p>
        </div>
        <div>
          <p className="text-[#4ca335] text-[4.8vw]">
            <span className="text-[3.733333vw] text-[#4ca335]">₹</span>
            {totalRevenue}
          </p>
          <p className="text-[3.466667vw] text-[#595959] mt-[2vw]">Total Revenue</p>
        </div>
        <div className="flex items-center">
          <button className="text-white text-[3.733333vw] text-center h-[8vw] leading-[8vw] p-[0_4vw] rounded-[4vw] bg-[#4ca335]" onClick={() => handleInvest()}>
            Invest
          </button>
        </div>
      </div>
      {vip > 0 ? (
        <div className="w-[10vw] h-auto absolute right-0 top-0">
          <img
            src={vip === 1 ? vip1 : vip === 2 ? vip2 : vip === 3 ? vip3 : vip === 4 ? vip4 : ''}
            alt={`VIP Level ${vip}`}
          />
        </div>
      ) : ''}
    </div>
  );
};

export default Product;
