import React, { useState, useEffect, useContext } from 'react';
import userImg from '../../assets/images/avatar-icon.png';
import Profile from './Profile';
import MyCourts from './MyCourts';
import MyBookings from './MyBookings';
import { authContext } from '../../context/AuthContext';
import useGetProfile from '../../hooks/useFetchData';
import Loading from '../../components/Loader/Loading';
const MyAccount = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [tab, setTab] = useState("bookings");
  const { dispatch } = useContext(authContext);
 

  const { data: userData, loading, error } = useGetProfile(`${baseUrl}/api/user/myprofile`);
  console.log(userData, 'userdata')

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <div className='max-w-[1200px] px-5 mt-5 mx-auto'>
      {!loading && !error &&(
      <div className='grid md:grid-cols-3 gap-8'>
        {/* User Info Section */}
        <div className='bg-white shadow-lg p-6 rounded-lg'>
          <div className='flex flex-col items-center'>
            <figure className='w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full border-4 border-primaryColor overflow-hidden'>
              <img src={userData.photo} alt="user photo" className='w-full h-full object-cover' />
            </figure>
            <h3 className='mt-4 text-xl font-semibold text-headingColor'>{userData.name}</h3>
            <p className='text-gray-600 text-sm'></p>
            <p className='text-gray-600 text-sm'>Email - {userData.email}</p>
          </div>

          <div className='mt-8'>
            <button
              onClick={handleLogout}
              className='w-full bg-primaryColor text-white py-3 rounded-lg hover:bg-primaryColor-dark'>
              Logout
            </button>
            <button
              className='w-full bg-red-600 text-white py-3 rounded-lg mt-4 hover:bg-red-700'>
              Delete Account
            </button>
          </div>
        </div>

        {/* Tab Content Section */}
        <div className='md:col-span-2 bg-white shadow-lg p-6 rounded-lg'>
          {/* Tab Navigation */}
          <div className='flex justify-between mb-6 border-b pb-3'>
            <button
              onClick={() => setTab("bookings")}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
                ${tab === "bookings" ? "bg-primaryColor text-white" : "bg-gray-100 text-headingColor hover:bg-gray-200"}`}>
              My Bookings
            </button>
            <button
              onClick={() => setTab("settings")}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
                ${tab === "settings" ? "bg-primaryColor text-white" : "bg-gray-100 text-headingColor hover:bg-gray-200"}`}>
              Profile Settings
            </button>
            <button
              onClick={() => setTab("courts")}
              className={`px-4 py-2  rounded-md font-medium text-sm transition-all duration-200
                ${tab === "courts" ? "bg-primaryColor text-white" : "bg-gray-100 text-headingColor hover:bg-gray-200"}`}>
              My Courts
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {tab === "bookings" && <MyBookings user = {userData}/>}
            {tab === "settings" && <Profile user = {userData} />}
            {tab === "courts" && <MyCourts  />}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default MyAccount;
