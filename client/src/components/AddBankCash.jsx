import { useState, useEffect } from "react";
import axios from "axios";

const InputField = ({ label, prefix, value, onChange, placeholder = "Enter value...", disabled }) => (
  <div className="mb-[4vw]">
    <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
      <span>{label}</span>
    </div>
    <div
      className={`border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] ${
        disabled ? "bg-gray-100" : "bg-white"
      }`}
    >
      {prefix && <span className="text-[3.733333vw] text-[#4ca335] mr-[1.333333vw]">{prefix}</span>}
      <input
        type={label === "Mobile number" || label === "Bank Account" ? "tel" : "text"}
        inputMode={label === "Mobile number" || label === "Bank Account" ? "numeric" : "text"}
        className="block w-full bg-transparent outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  </div>
);

const AddBankCash = ({ mobileNumber}) => {
  const [holderName, setHolderName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate Form
  useEffect(() => {
    const isValid =
      holderName &&
      bankAccount.length >= 9 &&
      bankAccount.length <= 18 &&
      /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode);

    setIsFormValid(isValid);
  }, [holderName, bankAccount, ifscCode]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError("Please correct the form fields before proceeding.");
      return;
    }

    const payload = {
      mobile: mobileNumber,
      holder: holderName,
      account: bankAccount,
      ifsc: ifscCode,
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/bank", payload);
      console.log("Response:", response.data);
      alert("Bank details added successfully!");
      setHolderName("");
      setBankAccount("");
      setIfscCode("");
    } catch (err) {
      console.error("Error submitting bank details:", err);
      setError("Failed to add bank details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-[4vw_2.666667vw_2.666667vw] rounded-[2.666667vw] bg-white mb-[2.666667vw]">
        <InputField label="Mobile number" value={mobileNumber} disabled />
        <InputField
          label="Holder Name"
          placeholder="Enter holder name..."
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
          disabled={loading}
        />
        <InputField
          label="Bank Account"
          placeholder="Enter account number..."
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          disabled={loading}
        />
        <InputField
          label="IFSC Code"
          placeholder="Enter IFSC code..."
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
          disabled={loading}
        />
        {error && <p className="text-red-500 text-[3.2vw] mb-[4.266667vw]">{error}</p>}
        <p className="text-[3.2vw] text-[#e25c5c] mb-[4.266667vw]">
          IFSC is 11 characters long, with the 5th character as "0".
        </p>
      </div>
      <button
        className={`mt-[6.666667vw] p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white ${
          loading || !isFormValid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#4CA335] active:bg-[#459330] hover:bg-[#3e8c2a]"
        } w-full outline-none`}
        type="button"
        onClick={handleSubmit}
        disabled={loading || !isFormValid}
        aria-label="Confirm"
      >
        <div>{loading ? "Processing..." : "Confirm"}</div>
      </button>
    </>
  );
};

export default AddBankCash;
