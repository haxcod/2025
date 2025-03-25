import withdrawImg from '../assets/withdraw.png';

const AccountBalance = ({balance}) => {
  return (
    <div className="text-white h-[33.333333vw] mb-[2.666667vw] p-[3.733333vw_6.666667vw_4vw] bg-no-repeat" style={{backgroundImage:`url(${withdrawImg})`, backgroundSize:'100% 100%'}}>
  <p className="text-[4.266667vw] font-medium mb-[9.333333vw]">
    Account balance
  </p>
  <div className="flex justify-between items-center">
    <p className="text-[6.4vw] font-bold m-[2.133333vw_0]">
      ₹{balance || 0}
    </p>
    <p className="font-bold">
      {" "}
      ≈ ₮ 0
    </p>
  </div>
</div>

  )
}

export default AccountBalance