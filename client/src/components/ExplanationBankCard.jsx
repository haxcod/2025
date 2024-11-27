const ExplanationBankCard = () => {
  return (
    <div  className="mt-[3.3333vw] mb-[6.666667vw]">
  <div  className="text-[4vw]">
    Explain
  </div>
  <p className="text-black text-opacity-65 text-[3.2vw] relative pl-[2.666667vw] mt-[2.666667vw] leading-[4vw] after:">
  ● Please accurately fill in the bank account information for the payment;
    cryptocurrency accounts only support addresses for USDT (TRC20) chain.
  </p>
  <p className="text-black text-opacity-65 text-[3.2vw] relative pl-[2.666667vw] mt-[2.666667vw] leading-[4vw]">
    {" "}
    ● After ensuring all information is correct, please use the mobile number
    registered on your platform account to receive an OTP for confirmation. If
    you have any questions, please contact the customer service at the help
    center.
  </p>
</div>

  )
}

export default ExplanationBankCard