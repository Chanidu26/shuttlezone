import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm = ({ price, courtId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment('your_client_secret_here', {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setPaymentStatus('Payment Failed');
        console.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment Successful');
        console.log('Payment succeeded!');
      }
    } catch (error) {
      setPaymentStatus('Payment Error');
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <CardElement className="border p-2 mb-4" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`btn px-4 py-2 ${isProcessing ? 'opacity-50' : ''}`}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
      {paymentStatus && <p className="mt-4 text-center">{paymentStatus}</p>}
    </form>
  );
};

export default CheckoutForm;
