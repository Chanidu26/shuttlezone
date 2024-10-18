import React from 'react'
import logo from '../../assets/images/logo.png'
import { RiLinkedinFill } from 'react-icons/ri'
import { AiFillYoutube, AiFillFacebook, AiFillInstagram } from 'react-icons/ai'
import { Link } from 'react-router-dom'
const Footer = () => {

  const socialLinks = [
    {
      path : "https://www.youtube.com/watch?v=3s3tZnjRWUY",
      icon : <AiFillYoutube className='group-hover:text-white w-4 h-5'/>
    },
    {
      path : "https://www.facebook.com/",
      icon : <AiFillFacebook className='group-hover:text-white w-4 h-5'/>
    },
    {
      path : "https://www.instagram.com/",
      icon : <AiFillInstagram className='group-hover:text-white w-4 h-5'/>
    },
    {
      path : "https://www.linkedin.com/",
      icon : <RiLinkedinFill className='group-hover:text-white w-4 h-5'/>
    }
  ]
  const quickLinks = [
    {
      path : "/",
      title : "Home"
    },
    {
      path : "/about",
      title : "About"
    },
    {
      path : "/contact",
      title : "Contact"
    },
    {
      path : "/login",
      title : "Login"
    }
  ]
  const year = new Date().getFullYear()
  return (
    <footer className='pb-16 pt-10 bg-slate-100'>
      <div className='container'>
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>
            <img src= {logo} alt=''/>
            <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>
              Copyright @ {year} Shuttlezone. Developed by Chanidu Karunarathna all right reserved.
            </p>
            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link,index)=>(
                <Link to={link.path} key={index} className='w-9 h-9 border border-solid border-[black]
                rounded-full flex justify-center items-center group hover:bg-primaryColor'>
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer