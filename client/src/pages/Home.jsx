import React from 'react'
import TopBar from '../components/TopBar'
import BalanceCard from '../components/BalanceCard'
import TabBox from '../components/TabBox'
import UrlBox from '../components/UrlBox'
import RewardsItems from '../components/RewardsItems'
import BottomBar from '../components/BottomBar'

const Home = () => {
  return (
    <>
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
   <TopBar/>
   <BalanceCard/>
   <TabBox/>
   <UrlBox/>
    <div className="m-[5.333333vw_4.666667vw_0] flex justify-between items-center">
      <p className="text-[#242424] text-[4.266667vw] font-bold">
        More Quest Rewards
      </p>
    </div>
    <RewardsItems/>
  
    </div>
    <BottomBar/>
    </>
  
  )
}

export default Home