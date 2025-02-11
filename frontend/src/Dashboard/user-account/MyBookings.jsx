import React, { useEffect, useState } from 'react';
import { token } from '../../config';
import axios from 'axios';
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

  return (
    <div className="p-3">
      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg shadow-sm space-y-2 bg-gray-100"
            >
              <p className="font-bold">Booking {index + 1}</p>
              <p>
                <span className="font-semibold">Court Name:</span>{' '}
                {booking.court.name}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {booking.date}
              </p>
              <p>
                <span className="font-semibold">Times:</span> {booking.times}
              </p>
              <button className='bg-red-500 mt-3 text-white py-2 px-4 rounded'>Cancel Booking</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
