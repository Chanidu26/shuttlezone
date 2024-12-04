import React from 'react'
import { useState } from 'react'
import userImg from '../../assets/images/avatar-icon.png'
import MyBookings from './MyBookings'
import Profile from './Profile'
import { useEffect , useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import useGetProfile from '../../hooks/useFetchData'

const MyAccount = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL
  const [tab, setTab] = useState("bookings") 
  const { user, token } = useContext(authContext)

  const { data: userData, loading, error } = useGetProfile(`${baseUrl}/`)

  console.log(userData, 'userdata')
  return (
    <div className='max-w-[1170px] px-5 mt-8 mx-auto'>
        <div className='grid md:grid-cols-3 gap-10'>
            <div className='pb-[50px] px-[30px] rounded-md'>
               <div className='flex items-center justify-center'>
                  <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                    <img src={userImg} 
                    alt='' 
                    className='w-full h-full rounded-full'/>
                  </figure>
               </div>
               <div className='text-center mt-4'>
                <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
                    {user.name}
                </h3>
                <p className='text-textColor text-[15px] leading-6 font-medium'>
                    {user.email}
 
                </p>
                <p className='text-textColor text-[15px] leading-6 font-medium'>
                    Courts - 
                </p>
               </div>

               <div className='mt-[50px] md:mt-[100px]'>
                 <button className='w-full text-white bg-black p-3 text-[16px] leading-7 rounded-md'>
                    Logout
                 </button>
                 <button className='w-full text-white bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md'>
                    Delete Account
                 </button>
                 
               </div>
            </div>

            <div className='md:col-span-2 md:px-[30px]'>
                <div>
                 <button
                  onClick={() => setTab("bookings")}
                  className={`p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7
                  border border-solid border-primaryColor
                 ${tab === "bookings" ? "bg-primaryColor text-white" : "bg-white"}`}>
                   My bookings
                 </button>

                 <button
                  onClick={() => setTab("settings")}
                  className={`py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7
                  border border-solid border-primaryColor
                  ${tab === "settings" ? "bg-primaryColor text-white" : "bg-white"}`}>
                  Profile Settings
                  </button>

                 
                </div>

                {tab === "bookings" && <MyBookings/>}
                {tab === "settings" && <Profile/>}
            </div>
        </div>
    </div>
  )
}

export default MyAccount