
import React from 'react'
import logo from '../img/logo.png'
import profilePic from '../img/profilePic.jpeg'
import './Navigation.css'
import Landing from '../Pages/Landing'

const Navigation = () => {
  return (
    <div className='navcontainer'>
      <img src={logo} alt="Logo" className='img'/>
      <div className='linkbox'>
          <div className="nav-links">
              <a href="#">Home</a>
              <a href="#">Booking History</a>
              <a href="#">Payments</a>
              <a href="#">Attendance</a>
            </div>
          
        <div className='Logintextcontainer' onClick={Landing}>Logout</div>
        <div className='signupt'>Create Court</div>
      </div>
      <div>
      <img src={profilePic} alt="Profile" className='profile-pic'/> {/* Add profile picture */}
      </div> 
    </div>
  )
}

export default Navigation

