import React from 'react'
import { useState, useEffect } from 'react' 
import court1 from '../assets/images/court1.jpg'
import court3 from '../assets/images/court3.jpg'
import court2 from '../assets/images/court2.jpg'
import court4 from '../assets/images/court4.jpg'
import player from '../assets/images/player.png'
import home from '../assets/images/home.jpg'
import icon1 from '../assets/images/icon01.png'
import icon2 from '../assets/images/icon02.png'
import icon3 from '../assets/images/icon03.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import About from '../components/About/About'
import ServiceList from '../components/Services/ServiceList'
import Testimonial from '../components/Testimonial/Testimonial'
const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [courtCount, setCourtCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);

  useEffect(() => {
    // Counter animation
    const courtInterval = setInterval(() => {
      setCourtCount(prev => {
        if (prev < 100) return prev + 3;
        clearInterval(courtInterval);
        return 100;
      });
    }, 20);
    
    const userInterval = setInterval(() => {
      setUserCount(prev => {
        if (prev < 100) return prev + 3;
        clearInterval(userInterval);
        return 100;
      });
    }, 20);
    
    const expInterval = setInterval(() => {
      setExperienceCount(prev => {
        if (prev < 100) return prev + 3;
        clearInterval(expInterval);
        return 100;
      });
    }, 20);
    return () => {
      clearInterval(courtInterval);
      clearInterval(userInterval);
      clearInterval(expInterval);
    };
  }, []);
  return (
    <>
    {/* hero section */}
    <section className='hero_section pt-[55px] 2xl:h-[800px] bg-cover' style={{backgroundImage: `url(${home})`}}>
      <div className='container' >
        <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
          {/* hero content */}
          <div>
          <div className='lg:w-[570px]'>
            <h1 className='text-[36px] leading-[46px] text-white font-[800] md:text-[55px] md:leading-[70px]'>
            Super Easy Badminton Court Bookings Await!
            </h1>
            <Link to = '/courts'>
              <button className='btn'>Book a Court Now</button>
            </Link>
          </div>
          <div className='mt-[30px] lg:mt-[50px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>

            <div>
              <h2 className='text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700]
               text-white'>{courtCount}+</h2>
               <span className='w-[100px] h-2 bg-red-700 Crounded-full block mt-[-14px]'></span>
               <p className='text_para text-slate-50'>Courts</p>
            </div>

            <div>
              <h2 className='text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700]
               text-white'>{userCount}+</h2>
               <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
               <p className='text_para text-slate-50'>Users</p>
            </div>

            <div>
              <h2 className='text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700]
               text-white'>{experienceCount} %</h2>
               <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
               <p className='text_para text-slate-50'>Experience</p>
            </div>*


          </div>
          </div>

        

        </div>

      </div>
    </section>

    {/*hero section end*/}

    <section>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            How it works
          </h2>
          <p className='text_para text-center'>
            What you can get from us
          </p>
        </div>


        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px]
         lg:mt-[55px]'>
           <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
                <img src={icon1}></img>
            </div>

            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Create a Court</h2>
              <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                Create your own court
              </p>

              <Link to = '/courts' className='w-[44px] h-[44px] rounded-full border border-solid border-black
               mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                < BsArrowRight className='group-hover:text-white w-6 h-5 '/>
              </Link>
            </div>
           </div>

           <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
                <img src={icon2}></img>
            </div>

            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find Court and Location</h2>
              <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                Find the courts
              </p>

              <Link to = '/courts' className='w-[44px] h-[44px] rounded-full border border-solid border-black 
              mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                < BsArrowRight className='group-hover:text-white w-6 h-5 '/>
              </Link>
            </div>
           </div>

           <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
                <img src={icon3}></img>
            </div>

            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Book your Court</h2>
              <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                Book your court with secure payments
              </p>

              <Link to = '/courts' className='w-[44px] h-[44px] rounded-full border border-solid border-black 
              mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                < BsArrowRight className='group-hover:text-white w-6 h-5 '/>
              </Link>
            </div>
           </div>
         </div>


      </div>
    </section>

    {/*about section*/}
    <About/>

    {/*services section */}
    <section>
      <div className='container'>
        <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            Services
          </h2>
          <p className='text_para text-center'>
            Our system offers unmatched Below Services
          </p>
        </div>

        <ServiceList/>
      </div>
    </section>

    {/*testimonials section*/}
    <section>
      <div className='container'>
       <div className='xl:w-[470] mx-auto'>
        <h4 className='heading text-center'>What our clients Say</h4>
        <p className='text_para text-center'>
          what are peoples ideas
        </p>
       </div>

       <Testimonial/>

      </div>
    </section>
    </>
  )
}

export default Home