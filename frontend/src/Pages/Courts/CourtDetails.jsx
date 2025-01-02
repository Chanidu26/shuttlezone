import React, { useState, useEffect } from 'react';
import star from '../../assets/images/Star.png';
import { useParams } from 'react-router-dom';
import Feedback from './Feedback';

const CourtDetails = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [courtData, setCourtData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Handle date change
  const handleDateChange = (event) => {
    const selectedDateData = courtData.availableDates.find(
      (dateObj) => dateObj.date === event.target.value
    );
    setSelectedDate(event.target.value);
    setAvailableTimes(selectedDateData ? selectedDateData.times : []);
    setSelectedSlots([]); // Reset selected slots when date changes
  };

  // Handle slot selection
  const handleSlotSelection = (slot) => {
    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((s) => s !== slot)
        : [...prevSlots, slot]
    );
  };

  // Calculate total price
  const calculateTotalPrice = () => selectedSlots.length * courtData.price;

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch court data
  useEffect(() => {
    const fetchCourtData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/court/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCourtData(data);
      } catch (error) {
        console.error('Error fetching court data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourtData();
  }, [baseUrl, id]);

  // Auto slide for images
  const courtImages = courtData?.images || [];
  useEffect(() => {
    if (courtImages.length === 0 || isLoading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % courtImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, courtImages.length, isLoading]);

  const goToNextSlide = () => {
    if (courtImages.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courtImages.length);
  };

  const goToPreviousSlide = () => {
    if (courtImages.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + courtImages.length) % courtImages.length);
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] px-5 pt-10 mx-auto">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!courtData) {
    return <div className="max-w-[1200px] px-5 pt-10 mx-auto">Error loading court data</div>;
  }

  return (
    <section className="max-w-[1200px] px-5 pt-10 mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Court Image Slider */}
        <div className="relative w-full">
          <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
            {courtImages.length > 0 ? (
              <img
                src={courtImages[currentIndex]}
                alt={`Court image ${currentIndex + 1}`}
                className="absolute w-full h-full object-cover transition-all duration-500 ease-in-out"
                onError={(e) => {
                  e.target.src = '/fallback-image.jpg'; // Add a fallback image
                  console.error('Error loading image:', courtImages[currentIndex]);
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p>No images available</p>
              </div>
            )}
          </div>

          {courtImages.length > 1 && (
            <>
              <button
                onClick={goToPreviousSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 text-black px-3 py-1 rounded-full focus:outline-none"
              >
                Prev
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 text-black px-3 py-1 rounded-full focus:outline-none"
              >
                Next
              </button>
            </>
          )}
        </div>

        {/* Court Description */}
        <div className="court-description">
          <h2 className="text-2xl lg:text-3xl font-bold mb-5">{courtData.name}</h2>
          
          <p className="text-md lg:text-lg text-gray-600 mb-4">
            {courtData.description}
          </p>
          
          <p className="text-lg text-gray-600 mb-1">
           Location: {courtData.location}
          </p>
          <p className="text-lg text-gray-600 mb-1">
            Price: Rs {courtData.price} per 30 mins
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Book the Court</h3>

        {/* Date Selection Dropdown */}
        <div className="mb-4">
          <label htmlFor="date-select" className="block text-lg font-medium text-gray-700 mb-2">
            Select a Date:
          </label>
          <select
            id="date-select"
            className="block w-full lg:w-1/2 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleDateChange}
          >
            <option value="">-- Select Date --</option>
            {courtData.availableDates.map((dateObj) => (
              <option key={dateObj.date} value={dateObj.date}>
                {new Date(dateObj.date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {/* Available Times */}
        {selectedDate && availableTimes.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Available Times:</h4>
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
              {availableTimes.map((time, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg ${
                    selectedSlots.includes(time)
                      ? 'bg-primaryColor text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-300'
                  }`}
                  onClick={() => handleSlotSelection(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDate && availableTimes.length === 0 && (
          <p className="text-lg text-red-500">No available times for the selected date.</p>
        )}

        {/* Payment Details */}
        {selectedSlots.length > 0 && (
          <div className="mt-10">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Payment Details</h4>
            <p className="text-lg mb-2">Total Slots: {selectedSlots.length}</p>
            <p className="text-lg mb-2">Total Price: Rs {calculateTotalPrice()}</p>
            <button className="btn mt-5 px-4 py-3">Proceed to Pay</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourtDetails;
