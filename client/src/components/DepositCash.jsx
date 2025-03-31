import { useState, useEffect, useRef } from "react";
import { fetchData, postData } from "../services/apiService";
import UserData from "../hooks/UserData";
import { load } from "@cashfreepayments/cashfree-js";

const DepositCash = ({ mobileNumber,inviteBy }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = UserData();
  const cashfreeRef = useRef(null);
  // let cashfree;

  useEffect(() => {
    const initializeSDK = async () => {
      if (!cashfreeRef.current) {
        cashfreeRef.current = await load({
          mode: "production",
        });
      }
    };
    initializeSDK();
  }, []); // Run only once on mount


  const handleQuickAmountClick = (amount) => {
    setDepositAmount(amount);
    setSelectedAmount(amount);
    setError("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    setDepositAmount(value);
    setSelectedAmount(null);
    setError("");
  };

  const getSessionId = async (amount) => {
    try {
      const data = {
        userName: userData.name,
        userMobile: userData.mobile,
        userId: userData.id,
        userEmail: userData.email,
        amount,
      };

      const res = await postData("/api/v1/payment", data);

      if (res.data && res.data.payment_session_id) {
        return { sessionId: res.data.payment_session_id, orderId: res.data.order_id };
      } else {
        setError("Failed to initiate payment. Please try again.");
        return null;
      }
    } catch (err) {
      console.error("Error fetching session ID:", err);
      setError("There was an error processing your request.");
      return null;
    }
  };
  const verifyPayment = async (orderId) => {
    try {
      let res = await postData("/api/v1/verify", { orderId });
  
      if (res?.data) {
        console.log(res);
        console.log(res.data);
  
        if (res.data.payment_status === "SUCCESS") {
          await createTransaction("completed");
        
        } else {
          createTransaction("failed");
          alert("Payment failed or canceled.");
        }
      } else {
        createTransaction("failed");
        alert("Payment verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      createTransaction("failed");
      alert("An error occurred while verifying the payment.");
    }
  };

  const createTransaction = async (status) => {
    try {
      const allData = {
        amount: depositAmount,
        mobile: mobileNumber,
        type: "credit",
        description: "Deposit",
        status,
      };
      const response = await postData("/api/v1/transactions", allData);

      if (response.status === 201) {
        // alert(`Deposited ₹${depositAmount} successfully!`);
        setDepositAmount("");
        setSelectedAmount(null);
        setError("");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      setError("Transaction failed. Please try again.");
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || isNaN(depositAmount) || depositAmount < 120 || depositAmount > 100000) {
      setError("Please enter a valid deposit amount between ₹120 and ₹100,000.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const sessionData = await getSessionId(1);
      if (!sessionData) return;

      const { sessionId, orderId } = sessionData;

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      await cashfreeRef.current.checkout(checkoutOptions);
      console.log("Payment initialized");

     await verifyPayment(orderId);
    } catch (error) {
      console.error("Error during deposit:", error);
      setError("There was an error processing your deposit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="depositCash">
      {/* Quick Amount Selection */}
      <div className="p-[4vw_2.666667vw_0] rounded-[2.666667vw] bg-white mb-[2.666667vw]">
        <p className="text-[#333] text-[4.266667vw] font-bold mb-[2.666667vw]">Quick amount</p>
        <div className="flex flex-wrap justify-between">
          {[1000, 3000, 5000, 10000, 30000, 50000].map((amount) => (
            <div
              key={amount}
              onClick={() => handleQuickAmountClick(amount)}
              className={`flex justify-center items-center w-[26.666667vw] h-[9.066667vw] ${
                selectedAmount === amount ? "bg-[#4ca335] text-white" : "bg-white text-[#4ca335]"
              } border-[.266667vw] border-[#4ca335] rounded-[13.333333vw] mb-[2.666667vw] cursor-pointer`}
            >
              ₹{amount.toLocaleString()}
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Amount Input */}
      <div className="p-[4vw_2.666667vw_2.666667vw] rounded-[2.666667vw] bg-white mb-[2.666667vw]">
        <p className="text-[#333] text-[4.266667vw] font-bold mb-[2.666667vw]">Deposit amount</p>
        <div className="border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] bg-white">
          <span className="text-[3.733333vw] text-[#4ca335] mr-[1.333333vw]">₹</span>
          <input
            type="tel"
            inputMode="numeric"
            className="block w-full bg-transparent outline-none"
            placeholder="Please enter deposit amount..."
            value={depositAmount}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>
        {error && <p className="text-red-500 text-[3.733333vw] mt-[1vw]">{error}</p>}
      </div>

      {/* Deposit Button */}
      <button
        className={`mt-[6.666667vw] p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white ${
          depositAmount && depositAmount >= 120 && depositAmount <= 100000
            ? "bg-[#4CA335] active:bg-[#459330]"
            : "bg-gray-400 cursor-not-allowed"
        } w-full outline-none`}
        type="button"
        onClick={handleDeposit}
        disabled={!depositAmount || depositAmount < 200 || depositAmount > 100000 || loading}
      >
        {loading ? "Processing..." : "To Deposit"}
      </button>
    </div>
  );
};

export default DepositCash;
