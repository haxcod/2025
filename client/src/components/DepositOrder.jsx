import { BiTransferAlt } from "react-icons/bi";
import { TbCreditCardRefund } from "react-icons/tb";
import PropTypes from "prop-types";
import { format } from "date-fns";

const DepositOrder = ({ data }) => {
  const { amount, createdAt, status } = data;
  const formattedDate = format(createdAt, "dd-MM-yyyy HH:mm:ss");

  return (
    <div className="bg-white rounded-[2.13333vw] mb-[2.66667vw] flex justify-between p-[4vw]">
      <div className="text-[3.46667vw] flex">
        <div className="size-[10.6667vw] mr-[1.6vw] rounded-full flex justify-center items-center bg-[#4ca335] bg-opacity-[0.1]">
          {/* <i
            className="text-[#4CA335]"
            style={{ transitionDuration: "0ms" }}
          /> */}
          <TbCreditCardRefund className="text-[#4CA335] text-[4.668vw]" />
        </div>
        <div>
          <p className="text-black opacity-[0.85] text-[4vw] mb-[1.86667vw] font-medium">
            Deposit
          </p>
          <p className="text-[#666666]">{formattedDate}</p>
        </div>
      </div>
      <div>
        <div className="text-[4vw] font-bold text-[#4ca335]">+₹ {amount}</div>
        <div className="text-[#ffb51a] text-right text-[3.46667vw] mt-[1.86667vw] flex items-center">
          <div className="bg-[#ffb51a] rounded-full size-[3vw] flex justify-center items-center mr-[.9668vw]">
            <BiTransferAlt className="size-[2.43333vw] text-white" />
          </div>
          <span
            className={`${
              status === "pending"
                ? "text-[#ffb51a]"
                : status === "failed"
                ? "text-[#dc3545]"
                : status === "completed"
                ? "text-[#28a745]"
                : "text-[#666666]" // Default color
            }`}
          >
            {status === "pending"
              ? "Transferring"
              : status === "failed"
              ? "Failed"
              : status === "completed"
              ? "Completed"
              : "Processing"}
          </span>
        </div>
      </div>
    </div>
  );
};
DepositOrder.propTypes = {
  data: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default DepositOrder;
