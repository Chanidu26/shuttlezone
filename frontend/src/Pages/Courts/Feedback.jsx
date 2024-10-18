import React from 'react'
import avatar from '../../assets/images/avatar-icon.png'
import { AiFillStar } from 'react-icons/ai'
const Feedback = () => {
  return (
    <div className=''>
        <div className='mb-[50px] pt-6 '>
            <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
                All Reviews
            </h4>

            <div className='flex justify-between gap-10 mb-[30px]'>
                <div className='flex gap-2'>
                    <figure className='w-10 h-10 rounded-full'>
                       <img className='w-full' src={avatar} alt=''/> 
                    </figure>

                    <div>
                        <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>
                            Chanidu Karunarathna
                        </h5>
                        <p className='text-[14px] leading-6 text-textColor'>
                            2023-12-23
                        </p>
                        <p className='text_para mt-3 font-medium text-[15px]'>
                            Good Services Highly Recommended
                        </p>
                    </div>
                </div>

                
                <div className='flex gap-1 pr-20 '>
                {[...Array(5).keys()].map((_, index) => (
                    <AiFillStar key={index} color="black" />
                 ))}

                </div>
            </div>

            <div className='flex justify-between gap-10 mb-[30px]'>
                <div className='flex gap-2'>
                    <figure className='w-10 h-10 rounded-full'>
                       <img className='w-full' src={avatar} alt=''/> 
                    </figure>

                    <div>
                        <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>
                            Chanidu Karunarathna
                        </h5>
                        <p className='text-[14px] leading-6 text-textColor'>
                            2023-12-23
                        </p>
                        <p className='text_para mt-3 font-medium text-[15px]'>
                            Good Services Highly Recommended
                        </p>
                    </div>
                </div>

                
                <div className='flex gap-1 pr-20 '>
                {[...Array(5).keys()].map((_, index) => (
                    <AiFillStar key={index} color="black" />
                 ))}

                </div>
            </div>
        </div>
    </div>
  )
}

export default Feedback