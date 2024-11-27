import React from 'react'
import TopBar from '../components/TopBar'
import UserInfo from '../components/UserInfo'
import WalletInfo from '../components/WalletInfo'
import MeList from '../components/MeList'
import MenuItem from '../components/MenuItem'
import BottomBar from '../components/BottomBar'

const My = () => {
  return (
   <>
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col p-[4vw]">
         <UserInfo/>
         <WalletInfo/>
         <MeList/>
         <div className='bg-white rounded-[2.666667vw] p-[3.466667vw_4vw_.8vw]'>
           <MenuItem/>
           {/* <MenuItem/> */}
         </div>
         
    </div>
    <BottomBar/>
   </>
  )
}

export default My