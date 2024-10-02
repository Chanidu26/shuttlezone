import React from 'react'
import './Signup.css'
import background_img from '../img/court1.jpg'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from 'react';

const Signup = () => {

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  async function Signup() {
    if (password === cPassword) {
        const user = { name, email, password};
        
        
        try {
            await axios.post('http://localhost:3030/api/user/signup', user).then((res) => {
                if (res.data) {
                    localStorage.setItem("currentUser", JSON.stringify(res.data));
                }
            });
            
            //Empty the input fields
            setUsername("");
            setEmail("");
            setPassword("");
            setCPassword("");

            Swal.fire({
                title: "Registration Successful",
                text: "Press 'OK' to redirect to Home Page",
                icon: "success",
            }).then(results => {
                window.location.href = '/home'
            })

        } catch (error) {
            console.log(error);
           
        }
    } else {
        Swal.fire({
            title: "Password Mismatch",
            text: "Please enter the same password in both fields",
            icon: "warning",
        })
    }
}

  return (
    <div className="container">
      {/* Left side: login form */}
      <div className='left-container'>
        <div className="header">
          <div className="text">SignUp</div>
        </div>
        <div className="inputs">
          <div className='text2'>Username</div>
          <div className="input">
            <input type='text' value={name} onChange={(e) => {setUsername(e.target.value);}} placeholder="Enter your username" />
          </div>

          <div className='text2'>Email</div>
          <div className="input">
            <input type='email' value={email} onChange={(e) => {setEmail(e.target.value);}}  placeholder="Enter your email" />
          </div>

          <div className='text2'>Password</div>
          <div className="input">
            <input type='password' value={password} onChange={(e) => {setPassword(e.target.value);}}  placeholder="Enter your password" />
          </div>
          <div className='text2'>Confirm password</div>
          <div className="input">
            <input type='password' value={cPassword} onChange={(e) => {setCPassword(e.target.value)}} placeholder="Enter your password again" />
          </div>
        </div>

        <div className="forgot-password">
          Forget Password?
        </div>
        <div className="submit-container">
          <div className="submit" onClick={Signup}>
            Signup
          </div>
        </div>

        <div className='signuptext'>
          Already have account?
          <Link to='/Login' className='linksignup'>Login</Link>
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
export default Signup;
