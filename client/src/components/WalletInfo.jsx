import React from 'react'
import meBg from '../assets/me_bg.png'

const WalletInfo = ({depositBal,withdrawBal,totalRev}) => {
  return (
   <div className='mt-[4vw] h-[25.3333vw] box-border p-[6.666667vw_2.4vw] bg-no-repeat bg-[length:100%_100%] text-[3.466667vw] flex justify-between text-center text-black text-opacity-[.65]' style={{backgroundImage:`url(${meBg})`}}>
     <div>
      <p className='font-extrabold text-[5.333333vw] mb-[2.133333vw] text-black'> ₹{depositBal || 0}</p>
      <p>Deposit Balance</p>
     </div>
     <div>
     <p className='font-extrabold text-[5.333333vw] mb-[2.133333vw] text-black'> ₹{withdrawBal || 0}</p>
     <p>Withdraw Balance</p>
     </div>
     <div>
     <p className='font-extrabold text-[5.333333vw] mb-[2.133333vw] text-black'> ₹{totalRev || 0}</p>
     <p>Total Revenue</p>
     </div>
   </div>
  )
}

export default WalletInfo