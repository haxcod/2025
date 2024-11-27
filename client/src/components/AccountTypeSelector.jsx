import { RiMoneyRupeeCircleFill, RiMoneyDollarCircleFill } from 'react-icons/ri';

const AccountTypeSelector = ({ isActive, setIsActive }) => {
  return (
    <div className="h-[11.733333vw]">
      <div className="flex justify-between h-[8.666667vw] bg-transparent">
        {[1, 2].map((type) => (
          <div
            key={type}
            className={`rounded-[4.266667vw] w-[48%] flex justify-center items-center text-[3.733333vw] border-[.266667vw] border-[#f0f0f0] transition-colors duration-200 ${isActive === type ? 'bg-[#4CA335]' : 'bg-white'}`}
            onClick={() => setIsActive(type)}
          >
            <span className={`font-normal flex items-center gap-[1vw] ${isActive === type ? 'text-white' : 'text-[#000]'}`}>
              {type === 1 ? (
                <>
                  <RiMoneyRupeeCircleFill className='size-[5vw] mr-[0.333333vw]'/>
                  CASH ACCOUNT
                </>
              ) : (
                <>
                  <RiMoneyDollarCircleFill className='size-[5vw] mr-[0.333333vw]'/>
                  USDT ACCOUNT
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountTypeSelector;
