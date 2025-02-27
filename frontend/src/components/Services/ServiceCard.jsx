import React from 'react'

const ServiceCard = ({item,index}) => {

    const {name, desc, icon, bgColor, textColor} = item
  return (
    <div className='py-[10px] px-1 lg:px-5 hover:scale-105 hover:shadow-lg transition-all duration-300'>
       <h2 className='text-[20px] leading-9 text-headingColor font-[700]'>{name} {icon}</h2>
       <p className='text-[15px] lg:text-[16px] leading-7 font-[400] text-textColor mt-4'>{desc}</p>
    </div>
  )
}

export default ServiceCard