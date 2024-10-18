import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { HiStar } from 'react-icons/hi';
import avatar from '../../assets/images/avatar-icon.png';
const Testimonial = () => {
  return (
    <div className='lg:mt-[25px]'>
        <Swiper modules={[Pagination]} spaceBetween={30}  slidesPerView={1} pagination={{ clickable: true }}
           breakpoints = {{
            640:{
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768:{
              slidesPerView: 2,
              spaceBetween:20,
            },
            1024:{
              slidesPerView: 3,
              spaceBetween: 30,
            },
           }}
           >
           <SwiperSlide>
              <div className='py-[30px] px-5 rounded-3'>
                <div className='flex items-center gap-[13px]'>
                    <img src={avatar} alt=''/>
                    <div>
                        <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                        Sahan Kavinda
                        </h4>
                        <div className='flex items-center gap-[2px]'>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                        </div>
                    </div>
                </div>
                <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                  "Highly Recommended! for everyone who wants to play"
                </p>
              </div>
           </SwiperSlide>

           <SwiperSlide>
              <div className='py-[30px] px-5 rounded-3'>
                <div className='flex items-center gap-[13px]'>
                    <img src={avatar} alt=''/>
                    <div>
                        <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                        Sahan Kavinda
                        </h4>
                        <div className='flex items-center gap-[2px]'>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                        </div>
                    </div>
                </div>
                <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                  "This platform is good and very user friendly platform"
                </p>
              </div>
           </SwiperSlide>
          
           <SwiperSlide>
              <div className='py-[30px] px-5 rounded-3'>
                <div className='flex items-center gap-[13px]'>
                    <img src={avatar} alt=''/>
                    <div>
                        <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                        Sahan Kavinda
                        </h4>
                        <div className='flex items-center gap-[2px]'>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                        </div>
                    </div>
                </div>
                <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                  "This platform is good and very user friendly"
                </p>
              </div>
           </SwiperSlide>

           <SwiperSlide>
              <div className='py-[30px] px-5 rounded-3'>
                <div className='flex items-center gap-[13px]'>
                    <img src={avatar} alt=''/>
                    <div>
                        <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                        Sahan Kavinda
                        </h4>
                        <div className='flex items-center gap-[2px]'>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                        </div>
                    </div>
                </div>
                <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                  "This platform is good and very user friendly"
                </p>
              </div>
           </SwiperSlide>

           <SwiperSlide>
              <div className='py-[30px] px-5 rounded-3'>
                <div className='flex items-center gap-[13px]'>
                    <img src={avatar} alt=''/>
                    <div>
                        <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                        Sahan Kavinda
                        </h4>
                        <div className='flex items-center gap-[2px]'>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                            <HiStar className='text-yellowColor w-[18px] h-5'/>
                        </div>
                    </div>
                </div>
                <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                  "This platform is good and very user friendly"
                </p>
              </div>
           </SwiperSlide>

        </Swiper>
    </div>
  )
}

export default Testimonial