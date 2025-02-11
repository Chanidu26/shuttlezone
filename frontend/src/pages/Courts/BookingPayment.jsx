import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { authContext } from '../../context/AuthContext'
const BookingPayment = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL
  const location = useLocation();
  const { price, courtId, date, slots, courtName, image } = location.state || {};
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { user } = useContext(authContext);

  const bookCourt = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/booking`, {
        courtId,
        userId: user._id,
        date,
        slots,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToken = async (token) => {
    try {
      const stripeToken = {
        token,
        amount: price * 100,
        description: `Payment for Court Booking ID: ${courtId}`,
      };
      const response = await axios.post(`${baseUrl}/api/user/payment`, stripeToken);
      setPaymentSuccess(true);
      Swal.fire({
        title: 'Payment Successful',
        text: 'Your booking payment was successful.',
        icon: 'success',
      });
      bookCourt();
    } catch (error) {
      Swal.fire({
        title: 'Payment Failed',
        text: 'There was an issue processing your payment. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-0 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Make a Payment</h2>
        {paymentSuccess ? (
          <div>
            <p className="text-green-600 text-center font-semibold">Your Booking is Successful!</p>
             <a href='/users/profile/me'> <button className="w-full bg-primaryColor text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition duration-200 mt-2">Go to Profile</button> </a>

          </div>
        ) : (
          <>
            <div className="text-gray-700 mb-4">
              <img className='w-full mb-3' src={image} alt="Court" />
              <p><strong>Court ID:</strong> {courtId}</p>
              <p><strong>Court Name:</strong> {courtName}</p>
              <p><strong>Total Amount:</strong> LKR {price}</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              <p><strong>Slots:</strong> {slots?.join(', ')}</p>
             
            </div>
            <StripeCheckout
              amount={price * 100}
              currency="LKR"
              token={handleToken}
              stripeKey="pk_test_51Q7ymXRrLNtV0o2Mvz4a2uUjm6WMDsro1DAhOMt7gc7UrB5x3JCU5PBlMBIjA1O9eFdvBXyAeNR6pwlkgaIHqaQ1005oAoYyJS"
            >
              <button
                className="w-full bg-primaryColor text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition duration-200 mt-2"
              >
                Pay Now
              </button>
            </StripeCheckout>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPayment;
