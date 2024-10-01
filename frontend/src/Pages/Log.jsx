import React from 'react'
import './Log.css'
import background_img from '../img/court1.jpg'
import {Link} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const login = () => {
  return (
    <div className="container">
            
        <div className='left-container'>
            <div className="header">
                <div className="text">Log In</div>
            </div>
            <div className="inputs">
                <div className='text2'>E mail</div>
                <div className="input">
                    <img src='' alt=''/>
                    <input type='email'/>
                </div>
                
                <div className='text2'>Password</div>
                <div className="input">
                    <img src='' alt=''/>
                    <input type='password'/>
                </div>
            </div>
            <div className="forgot-password">
                forget Password?
            </div>
            <div className="submit-container">
                <div className="submit">
                    Log In
                </div>
            </div>
            <div className='signuptext'>
                don't you have account yet?
                
                <Link to='/SignUp' className='linksignup'>
                    Sign Up
                </Link>
            </div>
            <div className='firstcontainer'>
                <div className='divider'>
                        OR
                </div>
                <div className='continuewith'>
                <button className="google-login"><div className='icon1'><FaGoogle className='glogo'/></div><div className='textg'>Continue with Google</div></button>
                

                <button className="facebook-login"><div className='icon2'><FaFacebook className='flogo'/></div><div className='textf'>Continue with Facebook</div></button>
                </div>
            </div>
        </div>



        <div className="right-container">
        <img src={background_img} alt="" className="background_img" />
            <div className="text-overlay1">
                <h1>HELLO!</h1>
                
            </div>
            <div className="text-overlay2">
                
                <p>FOLLOW YOUR <br></br>OWN <br></br>PASSION</p>
            </div>
        </div>
    </div>
  )
}
export default login;
