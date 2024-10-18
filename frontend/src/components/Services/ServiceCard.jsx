import React from 'react'

const ServiceCard = ({item,index}) => {

    const {name, desc, bgColor, textColor} = item
  return (
    <div className='py-[10px] px-3 lg:px-5 hover:scale-105 transition-all duration-300'>
       <h2 className='text-[23px] leading-9 text-headingColor font-[700]'>{name}</h2>
       <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>{desc}</p>
    </div>
  )
}

export default ServiceCard