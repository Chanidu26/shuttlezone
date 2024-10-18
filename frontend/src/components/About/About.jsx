import React from 'react'
import aboutImg from '../../assets/images/about.png'

const About = () => {
  return (
    <section className='pt-0'>
        <div className='container'>
            <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                  <img src={aboutImg} alt=''/>
                  <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px]'></div>
                </div>

                <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                   <h2 className='heading'>Who We Are & Our Mission </h2>
                   <p className='text_para'>
                    Welcome to Shuttlezone. Best platform for seamless badminton court bookings.
                    We are passionate about making badminton accessible and enjoyable for everyone. 
                    our user-friendly system ensures you can easily find and book courts at your convenience. 
                   </p>
                   <p className='text_para'>
                    Our mission is to revolutionize the way badminton enthusiasts book courts.
                    We aim to create a community where players of all levels can connect, play, 
                    and grow their skills. By leveraging cutting-edge technology, we strive to offer a 
                    reliable and efficient booking system that eliminates the stress of 
                    finding available courts. We are committed to promoting an active lifestyle and fostering a love for badminton through our innovative platform 
                   </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About