import React from 'react'
import UserData from '../hooks/UserData'
import MaskedNumber from '../hooks/MaskedNumber';
import Logo from '/logo-rounded.png'

const UserInfo = () => {

  const user = UserData();
  return (
    <div className="h-[17.333333vw] flex items-center justify-between">
      <div className="items-center flex">
        <div className="h-[17.0667vw] w-[17.0667vw] rounded-full mr-[4.26667vw]">
          <img
            src={Logo}
            className="rounded-full border-4"
            alt="User Profile"
          />
        </div>
        <div>
          <div className="flex leading-3">
            <p className='text-[3.466667vw]'>ID: {user.userData.id}</p>
            <i className="text-[#4CA335] text-[5.33333vw] ml-[1.33333vw]"></i>
          </div>
          <div className="text-[#949494] text-[4.466667vw] mt-[2.13333vw]">
            +91 <MaskedNumber number={user.userData ? user.userData.mobile : null}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
