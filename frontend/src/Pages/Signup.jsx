import React from 'react'
import signupImg from '../assets/images/signup.gif'
import { useState } from 'react'
import axios from 'axios'
//import baseurl
const baseUrl = process.env.REACT_APP_API_BASE_URL
const Signup = () => {
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')

  const register = async (e) => {
    e.preventDefault()
    const user = {name, email, password}
    try{
      await axios.post(`${baseUrl}/api/user/signup`, user).then((res) => {
        if (res.data) {
          localStorage.setItem("currentUser", JSON.stringify(res.data));
      }
      })
      setEmail('')
      setName('')
      setPassword('')
      alert('User registered successfully')
      window.location.href = '/login'
    }
    catch(err){
      console.log(err)
    }
  }
  
  return (
    <section className='px-5 xl:px-0 pt-6'>
      <div className='max-w-[1000px] mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          {/* img box */}
          <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
            <figure className='rounded-l-lg'>
               <img src={signupImg} alt="" className='w-full rounded-l-lg' />
            </figure>
          </div>

          {/* form box */}
          <div className='rounded-l-lg lg:pl-16 py-10 pt-1'>
              <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Create an <span className='text-primaryColor'>Account</span></h3>
              <form>
                <div className="mb-2">
                   <label className="font-semibold text-sm text-gray-600 block">Name</label>
                   <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-2">
                   <label className="font-semibold text-sm text-gray-600 block">Email</label>
                   <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-6">
                  <label className="font-semibold text-sm text-gray-600 block">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your password"
                   />
                </div>

                <button onClick={register} type="submit" className="w-full bg-primaryColor text-white p-3 rounded-lg">
                 Register
                </button>
              </form>
              <p className='text_para text-center'>You already have account? <a className='text-primaryColor' href='/login'>Login</a>'</p>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Signup