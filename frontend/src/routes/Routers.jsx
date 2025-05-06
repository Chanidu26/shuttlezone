import React from 'react'
/*import Home from '../pages/Home'
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
import Updatecourt from '../pages/Updatecourt' */

import Home from '../Pages/Home'
import Contact from '../Pages/Contact'
import Services from '../Pages/Services'
import Court from '../Pages/Courts/Court'
import CourtDetails from '../Pages/Courts/CourtDetails'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import BookingPayment from '../Pages/Courts/BookingPayment'
import { Routes, Route } from 'react-router-dom'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Createcourt from '../Pages/Createcourt'
import Updatecourt from '../Pages/Updatecourt'
import Court_Appointments from '../Pages/Court_Appointments'
import VerifyEmail from '../Pages/VerifyEmail'
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
      <Route path='/court/appointments/:id' element={<Court_Appointments/>}/>
      <Route path='/verify-email/:token' element={<VerifyEmail/>}/>
    </Routes>
}

export default Routers