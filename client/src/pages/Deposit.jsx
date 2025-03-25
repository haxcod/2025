// Deposit.jsx
import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
// import withdrawImg from '../assets/withdraw.png';
import DepositCash from '../components/DepositCash';
// import DepositUSDT from '../components/DepositUSDT';
import AccountBalance from '../components/AccountBalance';
import ExplanationDeposit from '../components/ExplanationDeposit';
// import AccountTypeSelector from '../components/AccountTypeSelector';
import UserData from '../hooks/UserData';

const Deposit = () => {
  const navigate = useNavigate();
    const {userData} = UserData()
  // const [isActive, setIsActive] = useState(1);
  

  return (
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
      <header className="h-[16vw] w-full text-[5.333333vw]">
        <div className="flex h-full">
          <div className="w-1/3 flex justify-start items-center">
            <button className="p-[0_3.2vw] h-[9.6vw] text-[28px]" onClick={() => navigate(-1)}>
              <IoChevronBackSharp />
            </button>
          </div>
          <div className="w-1/3 flex justify-center items-center">Deposit</div>
        </div>
      </header>

      <div className="p-[0_4.533333vw]">
      {/* <AccountTypeSelector isActive={isActive} setIsActive={setIsActive} /> */}
        <AccountBalance mobileNumber={userData.mobile}/>
        <DepositCash  mobileNumber={userData.mobile}/>
        {/* {isActive === 1 ? <DepositCash /> : <DepositUSDT />} */}
        <ExplanationDeposit/>
      </div>
    </div>
  );
};

export default Deposit;
