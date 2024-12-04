import React from 'react';
import star from '../../assets/images/Star.png';
import { useNavigate } from 'react-router-dom';

const CourtCard = ({ court }) => {
  const {id, name, photo, description, price, rating } = court;
  const navigate = useNavigate()
  const handleBooking = () => {
    navigate(`/courts/${id}`);
  };
  return (
    <div className='p-3 lg:p-5 hover:scale-105 hover:shadow-lg transition-all duration-300'>
      <div className="w-full h-[170px] overflow-hidden rounded-md">
        <img src={photo} className='w-full h-full object-cover' alt={name} />
      </div>
      <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>
        {name}
      </h2>
      <p>{description}</p>
      <p>{price}</p>
      <div className='mt-2 lg:mt-4 flex items-center justify-between'>
        <div className='flex items-center gap-[6px]'>
          <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text'>
            <img src={star} alt="star" /> {rating}
          </span>
        </div>
      </div>
      <button className='bg-primaryColor text-white py-2 px-4 rounded
      ' onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default CourtCard;
