import cardImage from '../assets/card_bg.png';

const BalanceCard = () => {
  return (
    <div
      className="h-[48vw] rounded-[2.666667vw] p-[16.533333vw_6.666667vw_5.333333vw] shadow-[0_5.333333vw_8vw_rgba(75,161,52,.4)] m-[0_4.666667vw] bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${cardImage})` }}
    >
      <p className="text-[3.733333vw]">Total Revenue</p>
      <p className="text-[8.533333vw] font-bold mt-[1.333333vw]">₹0</p>
      <div className="flex justify-between items-center mt-[2vw]">
        <p className="text-[3.733333vw]">Today Revenue</p>
        <p className="text-[5.333333vw] font-bold">₹0</p>
      </div>
    </div>
  );
};

export default BalanceCard;
