import React, { useState, useEffect } from 'react';
import star from '../../assets/images/Star.png'
import Feedback from './Feedback';
// Array of images for the court
const courtImages = [
  "https://www.shutterstock.com/image-photo/professional-tournament-badminton-court-nobody-600nw-615785603.jpg",
  "https://cdn.pixabay.com/photo/2023/12/06/08/06/badminton-8433177_640.jpg",
  "https://www.shutterstock.com/image-photo/badminton-court-green-260nw-1137893252.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXCMujdhLW6rJUMSjzWa3sYQUX6gO3rTyRa1OkPjOebOVE1xgqE4n0YFknXkdWIbj18wU&usqp=CAU",
  "https://www.shutterstock.com/image-photo/badminton-court-green-260nw-1137893252.jpg"
];

const CourtDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  // Go to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courtImages.length);
  };

  // Go to the previous slide
  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + courtImages.length) % courtImages.length);
  };

  return (
    <section className="max-w-[1200px] px-5 pt-10 mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Court Image Slider */}
        <div className="relative w-full">
          <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
            <img
              src={courtImages[currentIndex]}
              alt={`Court image ${currentIndex + 1}`}
              className="absolute w-full h-full object-cover transition-all duration-500 ease-in-out"
            />
          </div>
          {/* Previous Button */}
          <button
            onClick={goToPreviousSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 text-black px-3 py-1 rounded-full focus:outline-none"
          >
            Prev
          </button>
          {/* Next Button */}
          <button
            onClick={goToNextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 text-black px-3 py-1 rounded-full focus:outline-none"
          >
            Next
          </button>
        </div>

        {/* Court Description */}
        <div className="court-description">
          <h2 className="text-3xl font-bold mb-5">BadmintonCourts Complex</h2>
          <div className='flex items-center gap-[6px] mb-4'>
            <span className='flex items-center gap-[6px] text-[18px] leading-5 lg:test-[16px]
            lg:leading-7 font-semibold text-headingColor'>
              <img src={star} alt='' /> 4.6
            </span>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            This is a high-quality badminton court with top-notch amenities, perfect for players of all levels. The court is made of professional-grade material and is well-maintained to ensure safety and performance.
          </p>
          <h3 className="text-2xl font-semibold mb-2">Features:</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Indoor court with proper lighting</li>
            <li>Non-slip flooring</li>
            <li>Available for booking 7 days a week</li>
            <li>Air-conditioned environment</li>
          </ul>
        </div>
      </div>

      {/* Additional Court Details */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Court Details</h3>
        <p className="text-lg text-gray-600 mb-1">
          Location: 123 Sports Complex, City Centre
        </p>
        <p className="text-lg text-gray-600 mb-1">
          Price: $20 per hour
        </p>
        <p className="text-lg text-gray-600 mb-1">
          Available Times: 9:00 AM - 9:00 PM in Every Day 
        </p>
      </div>

      <Feedback/>
      <button className='btn mt-1'>Book Now</button>
    </section>
  );
};

export default CourtDetails;
