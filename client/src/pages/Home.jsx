import React, { useLayoutEffect } from 'react'
import TopBar from '../components/TopBar'
import BalanceCard from '../components/BalanceCard'
import TabBox from '../components/TabBox'
import UrlBox from '../components/UrlBox'
import RewardsItems from '../components/RewardsItems'
import BottomBar from '../components/BottomBar'
import UserData from '../hooks/UserData'
import useTransactionStore from '../store/TransactionStore'

const Home = () => {
    const { userData } = UserData();
    const {summary,todayRevenue, fetchTransactions } = useTransactionStore();
  
    useLayoutEffect(() => {
      if (userData?.mobile) {
        fetchTransactions(userData.mobile);
        // console.log(summary);
        
      }
    }, [userData.mobile]);
  return (
    <>
    <div className="bg-gradient-to-b from-[#ecfade] to-[#efefef] min-h-screen flex flex-col">
   <TopBar userData={userData}/>
   <BalanceCard totalRevenue={summary.totalRevenue} todayRevenue={todayRevenue}/>
   <TabBox/>
   <UrlBox/>
    <div className="m-[5.333333vw_4.666667vw_0] flex justify-between items-center">
      <p className="text-[#242424] text-[4.266667vw] font-bold">
        More Quest Rewards
      </p>
    </div>
    <RewardsItems userData={userData}/>
  
    </div>
    <BottomBar/>
    </>
  
  )
}

export default Home