import { format } from 'date-fns'; 
import { GiExtraTime } from "react-icons/gi";

const ExpiredProducts = ({product}) => {
  return (
    <div className=" p-[20px] bg-gray-100 shadow-md rounded-lg relative">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-300 mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-700">
            {product.fundName}{' '}
            <span className="ml-2 px-2 py-1 text-sm bg-red-100 text-red-600 rounded">
              {product.status}
            </span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">Revenue: {product.revenueDays} days</p>
        </div>
        <p className="text-xl font-semibold text-gray-500 line-through">
          ₹ {product.currentPrice}
        </p>
      </div>

      {/* Details */}
      <div className="flex justify-between items-center text-center">
        <div>
          <p className="text-lg font-semibold text-gray-700">₹ {product.claimed}</p>
          <p className="text-sm text-gray-500 mt-1">Total Received</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-1">Expired On:</p>
          <p className="text-lg font-semibold text-gray-500 line-through"> {format(new Date(product.expireDate), 'dd/MM/yyyy')}</p>
        </div>
        <div className="flex items-center">
        <GiExtraTime color='gray' size={'40px'}/>
        </div>
      </div>
    </div>
  );
};

export default ExpiredProducts;
