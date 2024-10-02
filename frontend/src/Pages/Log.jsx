import React from 'react'
import './Log.css'
import background_img from '../img/court1.jpg'
import { Link } from 'react-router-dom'
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login () {
    const user = { email, password };
    
    try {
        await axios.post(
            "http://localhost:3030/api/user/signin",user
        ).then((res) => {
          Swal.fire({
            title: "Login Successful",
            text: "Press 'OK' to redirect to Home Page",
            icon: "success",
        })
            if (res.data) {
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                
                window.location.href = "/Home";
            }
        }, (error) => {
            console.log(error);
            Swal.fire({
                title: "Invalid Credentials!",
                html: `Please enter valid credentials or <a href="#">customer support</a>`,
                icon: "error",
            })
        });
    } catch (error) {
        
        console.log(error);
        
    }
  }
  return (
    <div className="container">
      {/* Left side: login form */}
      <div className='left-container'>
        <div className="header">
          <div className="text">Login</div>
        </div>
        <div className="inputs">
          <div className='text2'>Email</div>
          <div className="input">
            <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" />
          </div>

          <div className='text2'>Password</div>
          <div className="input">
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </div>
        </div>

        <div className="forgot-password">
          Forget Password?
        </div>
        <div className="submit-container">
          <div className="submit" onClick={login}>
            Login
          </div>
        </div>

        <div className='signuptext'>
          Don't have an account yet?
          <Link to='/SignUp' className='linksignup'>Sign Up</Link>
        </div>

        <div className='firstcontainer'>
          <div className='divider'>OR</div>
          <div className='continuewith'>
            <button className="google-login">
              <FaGoogle className='glogo'/>
              Continue with Google
            </button>

            <button className="facebook-login">
              <FaFacebook className='flogo' />
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>

      {/* Right side: background image */}
      <div className="right-container">
        <img src={background_img} alt="Background" className="background_img" />
        <div className="text-overlay1">
          <h1></h1>
        </div>
        <div className="text-overlay2">
          <p>FOllOW YOUR PASSION</p>
        </div>
      </div>
    </div>
  )
}

export default Login;
