import { useState } from "react";

const InputField = ({ label, prefix, value, onChange, placeholder = "Enter value...", disabled = false }) => (
  <div className="mb-[4vw]">
    <div className="pb-[1.066667vw] text-[4vw] leading-[5.333333vw]">
      <span>{label}</span>
    </div>
    <div className={`border border-[#d9d9d9] rounded-[2.133333vw] h-[12.8vw] flex items-center w-full p-[2.666667vw_4.266667vw] overflow-hidden text-[#323233] text-[3.733333vw] ${disabled ? 'bg-gray-100' : 'bg-white'}`}>
      {prefix && <span className="text-[3.733333vw] text-[#4ca335] mr-[1.333333vw]">{prefix}</span>}
      <input
        type={label === 'Mobile number' ? 'tel' : 'text'}
        inputMode={label === 'Mobile number' ? 'numeric' : 'text'}
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

const AddBankUSDT = () => {
  const [holderName, setHolderName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleSubmit = () => {
    if (walletAddress.length === 0) {
      alert('Please enter a wallet address.');
      return;
    }
    console.log('Form submitted:', { holderName, walletAddress });
  };

  return (
    <>
    <div className="p-[4vw_2.666667vw_2.666667vw] rounded-[2.666667vw] bg-white mb-[2.666667vw]">
      <InputField label={'Mobile number'} value={7905321205} disabled />
      <InputField
        label={'Holder Name'}
        placeholder={'Enter holder name...'}
        value={holderName}
        onChange={(e) => setHolderName(e.target.value)}
      />
      <InputField label={'Wallet Network'} value={'TRON(TRC20)'} disabled />
      <InputField
        label={'Wallet Address'}
        placeholder={'Enter wallet address...'}
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <p className="text-[3.2vw] text-[#e25c5c] mb-[4.266667vw]">Please ensure your wallet address is correct.</p>
      
      
    </div>
    <button
        className="mt-[6.666667vw] p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white bg-[#4CA335] w-full outline-none active:bg-[#459330] hover:bg-[#3e8c2a]"
        type="button"
        onClick={handleSubmit}
        aria-label="Confirm"
      >
        <div>Confirm</div>
      </button>
    </>
  );
}

export default AddBankUSDT;
