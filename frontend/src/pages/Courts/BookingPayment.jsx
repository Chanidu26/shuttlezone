import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
        price,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
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
    <div className="flex max-w-[1200px] shadow-md justify-center items-center p-10 mx-auto">
    <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden transform transition-all hover:scale-[1.01] mt-0 duration-300">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {paymentSuccess ? "Your Booking is Confirmed" : "Make Your Payment"}
        </h2>

        {paymentSuccess ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-green-600 text-center font-semibold text-xl">
                Your Booking is Successful!
              </p>
              <a href="/users/profile/me">
                <button className="btn w-full mt-6">Go to profile</button>
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Image */}
            <div className="md:w-2/5">
              <div className="relative rounded-2xl overflow-hidden shadow-md h-full">
                <img 
                  className="w-full h-64 md:h-full object-cover" 
                  src={image} 
                  alt={courtName}
                />
              </div>
            </div>

            {/* Right side - Details */}
            <div className="md:w-3/5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Court ID</p>
                  <p className="font-semibold text-gray-800">{courtId}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Court Name</p>
                  <p className="font-semibold text-gray-800">{courtName}</p>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl">
                <p className="text-sm text-green-600">Total Amount</p>
                <p className="text-2xl font-bold text-green-700">LKR {price}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Booking Date</p>
                <p className="font-semibold text-gray-800">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Time Slots</p>
                <p className="font-semibold text-gray-800">{slots?.join(', ')}</p>
              </div>

              <div className="pt-4">
                <StripeCheckout
                  amount={price * 100}
                  currency="LKR"
                  token={handleToken}
                  stripeKey="pk_test_51Q7ymXRrLNtV0o2Mvz4a2uUjm6WMDsro1DAhOMt7gc7UrB5x3JCU5PBlMBIjA1O9eFdvBXyAeNR6pwlkgaIHqaQ1005oAoYyJS"
                >
                  <button className="w-full bg-primaryColor text-white py-4 px-6 rounded-xl transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md text-lg font-semibold">
                    Pay Now
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default BookingPayment;
