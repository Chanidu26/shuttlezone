import React from 'react'
import './Passwordreset.css'
import Nav from '../components/Nav';

const Passwordreset=() => {
  return (
    <div>
      <Nav/>
      <div className='container'>
        
        
        <div className='header'>RESET PASSWORD</div>
        <div className='resettext'>check your e-mail  we will send you
        a otp code to recover your account </div>
        <div className='otp'>Enter OTP </div>
        <div className='box'></div>
        <div className='button'><div className='text'>Submit</div></div>
      </div>
    </div>
  )
}

export default Passwordreset