import React from 'react'
import './Passwordresetc.css'
import Nav from '../components/Nav';


const Passwordresetc=() => {
  return (
    <>
    <Nav/>
    <div className='container'>
     
      <div className='header'>RESET PASSWORD</div>
      
      <div className='otp'>Enter New Password </div>
      <div className='box'></div>
      <div className='otp'>Confirm New Password </div>
      <div className='box'></div>
      <div className='button'><div className='text'>Reset Password</div></div>
    </div></>
  )
}

export default Passwordresetc