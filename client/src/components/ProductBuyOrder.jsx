import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { AiOutlineProduct } from "react-icons/ai";

const ProductBuyOrder = ({data}) => {
     const { amount, createdAt,description } = data;
     
       const formattedDate = format(createdAt, 'dd-MM-yyyy HH:mm:ss');
    
      return (
        <div className="bg-white rounded-[2.13333vw] mb-[2.66667vw] flex justify-between p-[4vw]">
          <div className="text-[3.46667vw] flex">
            <div className="size-[10.6667vw] mr-[1.6vw] rounded-full flex justify-center items-center bg-[#ff4c4c1a] bg-opacity-[0.1]">
             <AiOutlineProduct className='text-[#ff4c4c] text-[4.668vw]'/>
            </div>
            <div>
              <p className="text-black opacity-[0.85] text-[4vw] mb-[1.86667vw] font-medium">{description}</p>
              <p className="text-[#666666]">{formattedDate}</p>
            </div>
          </div>
          <div className='flex justify-end flex-col items-end'>
            <div className="text-[4vw] flex h-full items-center justify-center font-bold text-[#ff4c4c]">-₹ {amount}</div>
            
          </div>
        </div>
      );
    };


    ProductBuyOrder.propTypes = {
        data: PropTypes.shape({
          amount: PropTypes.number.isRequired,
          createdAt: PropTypes.string,
          description:PropTypes.string
        }).isRequired,
      };

export default ProductBuyOrder
