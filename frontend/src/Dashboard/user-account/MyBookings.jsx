import React from 'react';

const MyBookings = ({ user }) => {
  // Check if the user or bookings array exists
  const bookings = user?.bookings || [];

  return (
    <div className="p-3">
      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg shadow-sm bg-gray-100"
            >
              <p className="font-bold">Booking #{index + 1}</p>
              <p>
                <span className="font-semibold">Court Name:</span>{' '}
                {booking.courtName}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {booking.date}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {booking.time}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${booking.price}
              </p>
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
