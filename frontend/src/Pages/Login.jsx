import React, { useState } from 'react'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  return (
    <section className='pt-5'>
      
      <div className='px-4 mx-auto max-w-screen-md '>
        <h2 className='heading text-center'>Login</h2>
        <p className='text_para text-center'>Welcome Back! Login to ShuttleZone</p>

        <form className="px-5 py-7">
            <div className="mb-4">
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
            <button type="submit" className="w-full bg-primaryColor text-white p-3 rounded-lg">
              Login
            </button>
          </form>
          <p className='text_para text-center'>You dont have account? <a className='text-primaryColor' href='/signup'>Signup</a>'</p>
          

      </div>
    </section>
  )
}

export default Login