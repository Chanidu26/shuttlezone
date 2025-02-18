import React from 'react'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import Court from '../pages/Courts/Court'
import CourtDetails from '../pages/Courts/CourtDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import BookingPayment from '../pages/Courts/BookingPayment'
import { Routes, Route } from 'react-router-dom'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Createcourt from '../pages/Createcourt'
import Updatecourt from '../pages/Updatecourt'
const Routers = () => {
  return <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/courts' element={<Court/>}/>
      <Route path='/courts/:id' element={<CourtDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/users/profile/me' element={<MyAccount/>}></Route>
      <Route path='/court/create' element={<Createcourt/>}/>
      <Route path= '/court/booking' element={<BookingPayment/>}/>
      <Route path='/court/update/:id' element={<Updatecourt/>}/>
    </Routes>
}

export default Routers