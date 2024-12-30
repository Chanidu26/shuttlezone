import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { token } from '../../config';
import {toast} from 'react-toastify'

const MyCourts = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [mycourts, setMycourts] = useState([]);
  const [error, setError] = useState(null);
  console.log(token)
  useEffect(() => {
    const fetchMyCourts = async () => {
      try {
        
        const response = await axios.get(`${baseUrl}/api/court/mycourts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMycourts(response.data);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch courts');
        console.error('Error fetching courts:', error);
      }
    };

    fetchMyCourts();
    
  }, []); // Empty
  console.log(mycourts)

  const handleDelete = async (courtId) => {
    try {
      await axios.delete(`${baseUrl}/api/court/${courtId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state to remove deleted court
      setMycourts((prevCourts) => prevCourts.filter((court) => court._id !== courtId));
      toast.success('Court deleted successfully');
    } catch (error) {
      console.error('Error deleting court:', error);
      alert(error.response?.data?.message || 'Failed to delete court');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {mycourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-full h-48 overflow-hidden rounded-md">
                <img
                  src={court.images[0]}
                  alt={court.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-bold text-gray-700 mt-4">{court.name}</h2>
              <p className="text-gray-500 mt-1">{court.location}</p>
              <p className="text-gray-800 font-bold mt-2">{court.price} per 30 mins</p>

              <div className='buttons flex flex-row gap-3'>
                  <button
                    className="bg-primaryColor text-white py-2 px-4 rounded-lg mt-4 transition-colors duration-300"
                    onClick={() => alert(`Update ${court.name}`)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 transition-colors duration-300"
                    onClick={() => handleDelete(court._id)}
                  >
                    Delete
                  </button>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourts;
