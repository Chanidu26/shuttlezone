import React from 'react';
import './Signup.css';
import background_img from '../img/court1.jpg';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from 'react';

const Signup = () => {

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Strong password regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  async function Signup() {
    // Check if passwords match
    if (password !== cPassword) {
      return Swal.fire({
        title: "Password Mismatch",
        text: "Please enter the same password in both fields",
        icon: "warning",
      });
    }

    // Check if password is strong enough
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        title: "Weak Password",
        text: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
        icon: "warning",
      });
    }

    // Proceed with signup
    const user = { name, email, password };

    try {
      const res = await axios.post('http://localhost:3030/api/user/signup', user);

      if (res.data) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
      }

      // Empty the input fields
      setUsername("");
      setEmail("");
      setPassword("");
      setCPassword("");

      Swal.fire({
        title: "Registration Successful",
        text: "Press 'OK' to redirect to Home Page",
        icon: "success",
      }).then(results => {
        window.location.href = '/Login';
      });

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response ? error.response.data.message : "An error occurred. Please try again later.",
        icon: "error",
      });
    }
  }

  return (
    <div className="container">
      {/* Left side: signup form */}
      <div className='left-container'>
        <div className="header">
          <div className="text">SignUp</div>
        </div>
        <div className="inputs">
          <div className='text2'>Username</div>
          <div className="input">
            <input type='text' value={name} onChange={(e) => {setUsername(e.target.value);}} placeholder="Enter your username" required />
          </div>

          <div className='text2'>Email</div>
          <div className="input">
            <input type='email' value={email} onChange={(e) => {setEmail(e.target.value);}} placeholder="Enter your email" required />
          </div>

          <div className='text2'>Password</div>
          <div className="input">
            <input type='password' value={password} onChange={(e) => {setPassword(e.target.value);}} placeholder="Enter your password" required />
          </div>

          <div className='text2'>Confirm Password</div>
          <div className="input">
            <input type='password' value={cPassword} onChange={(e) => {setCPassword(e.target.value);}} placeholder="Confirm your password" required />
          </div>
        </div>

        <div className="forgot-password">
          Forgot Password?
        </div>
        <div className="submit-container">
          <div className="submit" onClick={Signup}>
            Signup
          </div>
        </div>

        <div className='signuptext'>
          Already have an account?
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
          <p>Follow Your Passion</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
