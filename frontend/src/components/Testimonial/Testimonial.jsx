import React, { useEffect, useState } from 'react';
import { Star, Quote, X } from 'lucide-react';
import axios from 'axios';
import {token} from '../../config';
import swal from 'sweetalert2'
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const ReviewForm = ({ onClose, onReviewAdded }) => {
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/platformreview`, {
        reviewText: review,
        date: new Date(),
        // The user ID will be handled by the backend through the token
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      onReviewAdded(response.data);
      swal.fire({
        title: 'Review Submitted',
        text: 'Thank you for your review!',
        icon:'success',
        confirmButtonText: 'Okay'
      })
      onClose();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit review');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded-md h-32"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

const TestimonialCard = ({ review, isActive }) => {
  return (
    <div className={`transform transition-all duration-300 ${isActive ? 'scale-105' : 'scale-95 opacity-70'}`}>
      <div className="p-20  hover:shadow-2xl transition-all duration-300 relative">
        {/* Large decorative quote mark */}
        
        <div className="absolute -top-4 -left-2 text-8xl text-gray-200 font-serif leading-none">"</div>
        
        {/* Content container with proper z-index */}
        <div className="relative z-10 px-40">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden">
              {review.user?.photo ? (
                <img src={review.user.photo} alt="User" className="w-full h-full object-cover" />
              ) : (
                'U'
              )}
            </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">
                  {review.user?.name || 'User'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <Quote className="w-10 h-10 text-blue-500 opacity-50 z-10" />
          </div>
          
          {/* Review text with styled quotes */}
          <div className="relative pl-2">
            <p className="text-gray-700 text-lg leading-relaxed italic">
              "{review.reviewText}"
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-1 text-8xl text-gray-200 font-serif leading-none rotate-180">"</div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-xl"></div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/platformreview`);
        setReviews(response.data);
      } catch (err) {
        setError('Failed to load reviews');
      }
    };

    fetchReviews();
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleReviewAdded = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }
  console.log(reviews)

  return (
    <div className="max-w-4xl mx-auto px-4 py-3">
      <div className="mb-12 text-center">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primaryColor text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Add Your Review
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ReviewForm 
            onClose={() => setIsModalOpen(false)} 
            onReviewAdded={handleReviewAdded}
          />
        </Modal>
      </div>

      {reviews.length > 0 ? (
        <div className="relative">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-300" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={review._id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard 
                    review={review} 
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {reviews.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 bottom-0 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 bottom-0 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              >
                →
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews yet. Be the first to add one!</p>
      )}
    </div>
  );
};

export default Testimonial;