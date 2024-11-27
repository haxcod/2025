import { BiTransferAlt } from "react-icons/bi";
import { TbCreditCardPay } from "react-icons/tb";
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const WithdrawOrder = ({ data }) => {
  const { amount, createdAt } = data;
  const formattedDate = format(createdAt, 'dd-MM-yyyy HH:mm:ss');

  // Calculate the fee and actual receipt (7% fee)
  const fee = 7; // 7% fee
  const feeAmount = (amount * fee) / 100;
  const actualReceipt = amount - feeAmount;

  return (
    <div className="bg-white rounded-[2vw] mb-[2.67vw] p-[4vw] flex items-center">
      
      {/* Icon Section */}
      <div className="w-[10.67vw] h-[10.67vw] mr-[1.6vw] rounded-full flex justify-center items-center bg-[#ff4c4c1a]">
        <TbCreditCardPay className="text-[#ff4c4c] text-[4.67vw]" aria-label="Credit Card Payment Icon" />
      </div>

      {/* Text Section */}
      <div className="flex-grow flex flex-col justify-between">
        
        {/* Withdraw and Amount */}
        <div className="flex justify-between items-center">
          <p className="text-black opacity-85 text-[4vw] font-medium">Withdraw</p>
          <p className="text-[4vw] font-bold text-[#ff4c4c]">-₹ {amount}</p>
        </div>

        {/* Fee and Percentage */}
        <div className="flex justify-between items-center mt-[0.87vw]">
          <p className="text-black opacity-85 text-[3.33vw] font-medium">Fee</p>
          <p className="text-[#ff4c4c] text-[3.33vw]">{fee} %</p>
        </div>

        {/* Actual Receipt */}
        <div className="flex justify-between items-center mt-[0.87vw]">
          <p className="text-black opacity-85 text-[3.33vw] font-medium">Actual receipt</p>
          <p className="text-[#4ca335] text-[3.33vw]">-₹ {actualReceipt}</p>
        </div>

        {/* Date and Status */}
        <div className="flex justify-between items-center mt-[0.87vw]">
          <p className="text-[#666666]">{formattedDate}</p>
          <div className="flex items-center text-[#ffb51a] text-[3.47vw]">
            <div className="w-[3vw] h-[3vw] bg-[#ffb51a] rounded-full flex justify-center items-center mr-[0.97vw]">
              <BiTransferAlt className="text-white text-[2.43vw]" aria-label="Processing Icon" />
            </div>
            Processing
          </div>
        </div>
      </div>
    </div>
  );
};

WithdrawOrder.propTypes = {
  data: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default WithdrawOrder;
