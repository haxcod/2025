import axios from "axios";
import { useState, useEffect } from "react";
import Popup from "./SuccessPopup";
import { format } from 'date-fns';
import { fetchData, postData,updateData } from '../services/apiService';

const PurchasedProducts = ({ product, claim, setClaim }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClaimed, setIsClaimed] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTimeout, setPopupTimeout] = useState(null);

  const handleIsClaimed = async (productId, amount) => {
    setLoading(true); // Set loading to true when the claim is being processed
    setError(null); // Reset the error state

    try {
      if (!productId) {
        throw new Error('Product ID is required.');
      }
      if (!amount || amount <= 0) {
        throw new Error('A valid amount is required.');
      }

      const response = await updateData('/api/v1/my/product/claim', {
        productId,
        amount,
      });

      setIsClaimed(true);
      setClaim(claim + amount);
      setShowPopup(true);

      console.log('Product claimed successfully:', response.data);

      // Auto-close the popup after 3 seconds
      if (popupTimeout) clearTimeout(popupTimeout); // Clear any previous timeouts
      const timeoutId = setTimeout(() => setShowPopup(false), 3000);
      setPopupTimeout(timeoutId);

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to claim product.';
      console.error('Error claiming product:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isCheckedIsClaimed = (createdAt, updatedAt) => {
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);
    const todayDate = new Date();

    if (createdDate.getTime() === updatedDate.getTime()) {
      return true;
    }

    if (todayDate.toDateString() === updatedDate.toDateString()) {
      return true;
    }

    if (todayDate > updatedDate) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const result = isCheckedIsClaimed(product.createdAt, product.updatedAt);
    setIsClaimed(result);
  }, [product.createdAt, product.updatedAt]);

  return (
    <div className="p-[20px] bg-white shadow-md rounded-lg relative">
      <div className="flex justify-between items-center pb-4 border-b border-gray-300 mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {product.fundName}{' '}
            <span className="ml-2 px-2 py-1 text-sm bg-orange-100 text-orange-600 rounded">
              {product.status}
            </span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Expired: <strong>{format(new Date(product.expireDate), 'dd/MM/yyyy')}</strong>
          </p>
        </div>
        <p className="text-xl font-semibold text-green-600">
          ₹ {product.currentPrice}
        </p>
      </div>

      <div className="flex justify-between items-center text-center">
        <div>
          <p className="text-lg font-semibold text-green-600">₹ {product.dailyEarnings}</p>
          <p className="text-sm text-gray-500 mt-1">Daily Earnings</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-green-600">₹ {product.totalRevenue}</p>
          <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
        </div>
        <button
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleIsClaimed(product._id, product.dailyEarnings)}
          disabled={isClaimed || loading}
        >
          {loading ? (
            <span>Processing...</span>
          ) : isClaimed ? (
            'Claimed'
          ) : (
            'Claim'
          )}
        </button>
      </div>

      {/* Show error message if there is an error */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Popup to show success message */}
      {showPopup && <Popup handleClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default PurchasedProducts;
