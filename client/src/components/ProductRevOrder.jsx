import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { MdCallReceived } from "react-icons/md";

const ProductRevOrder = ({data}) => {
     const { amount, createdAt } = data;
       const formattedDate = format(createdAt, 'dd-MM-yyyy HH:mm:ss');
      return (
        <div className="bg-white rounded-[2.13333vw] mb-[2.66667vw] flex justify-between p-[4vw]">
          <div className="text-[3.46667vw] flex">
            <div className="size-[10.6667vw] mr-[1.6vw] rounded-full flex justify-center items-center bg-[#4ca335] bg-opacity-[0.1]">
              {/* <i
                className="text-[#4CA335]"
                style={{ transitionDuration: "0ms" }}
              /> */}
               <MdCallReceived className='text-[#4CA335] text-[4.668vw]'/>
            </div>
            <div>
              <p className="text-black opacity-[0.85] text-[4vw] mb-[1.86667vw] font-medium">Revenue</p>
              <p className="text-[#666666]">{formattedDate}</p>
            </div>
          </div>
          <div>
            <div className="text-[4vw] flex h-full items-center justify-center  font-bold text-[#4ca335]">+₹ {amount}</div>
          </div>
        </div>
      );
    };


    ProductRevOrder.propTypes = {
        data: PropTypes.shape({
          amount: PropTypes.number.isRequired,
          createdAt: PropTypes.string,
        }).isRequired,
      };

export default ProductRevOrder
