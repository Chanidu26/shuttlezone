import React from 'react';
import star from '../../assets/images/Star.png';
import { useNavigate } from 'react-router-dom';

const CourtCard = ({ court, onBook }) => {
  const { _id, name, images, location, price, rating} = court;
  const navigate = useNavigate();
  const handleBooking = () => {
    navigate(`/courts/${_id}`);
  };

  return (
    <div className="p-3 rounded-lg lg:p-2 hover:scale-105 bg-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="w-full h-[200px] overflow-hidden rounded-md">
        <img src={images[0]} className="w-full h-full object-cover" alt={name} />
      </div>
      <h2 className="text-[18px] px-2 leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {name}
      </h2>
      <p className="text-gray-600 px-2">{location}</p>
      <p className="text-gray-800 px-2 font-bold">{price} Rs per 30 mins</p>
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        {/*<div className="flex items-center gap-[6px] px-2">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold">
            <img src={star} alt="star" /> {rating}
          </span>
        </div> */}
      </div>
      
      <button
        className="bg-primaryColor text-white py-2 px-4 rounded mt-2 mb-2 ml-2"
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
};

export default CourtCard;
