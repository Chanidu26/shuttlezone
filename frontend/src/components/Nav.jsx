
import React from 'react'
import logo from '../img/logo.png'
import './Nav.css'

const Nav = () => {
  return (
    <div className='navcontainer'>
      <img src={logo} alt="Logo" className='img'/>
      
      <div className='Logintextcontainer'>Log In</div>
      <div className='signupt'>SignUp</div>
      
    </div>
  )
}

export default Nav

