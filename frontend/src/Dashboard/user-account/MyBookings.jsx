import React, { useEffect, useState } from 'react';
import { token } from '../../config';
import axios from 'axios';
import Swal from 'sweetalert2';
const MyBookings = ({ user }) => {
  // Check if the user or bookings array exists
  //const bookings = user?.bookings || [];
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/booking`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const isConfirmed = window.confirm("are you want to delete this ")
    if(!isConfirmed){
      return;
    }
    try {
      const response = await axios.delete(`${baseUrl}/api/booking/${bookingId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data)
      Swal.fire({
              title: 'booking canceled!',
              text: 'Booking has been canceled successfully.',
              icon:'success',
            })
    }
    catch(error){
      console.error('Error of delete booking:', error);
    }
  }

  return (
    <div className="p-3">
      {bookings.length > 0 ? (
        <ul className="space-y-6">
          {bookings.map((booking, index) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
                <p className="font-bold text-gray-800 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  Booking {index + 1}
                </p>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <div>
                    <span className="text-sm text-gray-500">Court Name</span>
                    <p className="font-medium text-gray-800">{booking.court.name}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <span className="text-sm text-gray-500">Date</span>
                    <p className="font-medium text-gray-800">
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <span className="text-sm text-gray-500">Price</span>
                    <p className="font-medium text-gray-800">{booking.price}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <span className="text-sm text-gray-500">Time Slots</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {booking.times.map((time, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-md">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-100">
                  <button onClick={() => handleCancelBooking(booking._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center shadow-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Cancel Booking
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-gray-500 text-lg">No bookings found.</p>
            <p className="text-gray-400 mt-1">Your bookings will appear here once you make them.</p>
          </div>
        )}
    </div>
  );
};

export default MyBookings;
