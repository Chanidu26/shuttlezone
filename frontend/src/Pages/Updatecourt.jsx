import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import uploadImageToCloudinary from '../utils/uploadCloudinary';

const UpdateCourt = () => {
  const { id } = useParams();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { user, token } = useContext(authContext);
  const navigate = useNavigate();
  
  const [courtData, setCourtData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    googlemaplink: '',
    images: [],
    availableDates: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeRange, setTimeRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchCourtData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/court/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCourtData(data);
      } catch (error) {
        console.error('Error fetching court data:', error);
        toast.error('Failed to fetch court data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourtData();
  }, [baseUrl, id, token]);

  console.log(courtData)
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourtData({
      ...courtData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
  
    const uploadPromises = files.map(async (file) => {
      try {
        const response = await uploadImageToCloudinary(file);
        return response.secure_url;
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        return null;
      }
    });
  
    const uploadedUrls = await Promise.all(uploadPromises);
  
    setCourtData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls.filter((url) => url)],
    }));
  };

  const addDate = () => {
    if (selectedDate && !courtData.availableDates.find((d) => d.date === selectedDate)) {
      setCourtData((prev) => ({
        ...prev,
        availableDates: [...prev.availableDates, { date: selectedDate, times: [] }],
      }));
      setSelectedDate('');
      setShowDateModal(false);
    }
  };

  const addTimeSlots = () => {
    const { start, end } = timeRange;
    if (!start || !end) return;

    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
    const slots = [];

    while (startTime < endTime) {
      const nextSlot = new Date(startTime);
      nextSlot.setMinutes(startTime.getMinutes() + 30);
      if (nextSlot > endTime) break;
      slots.push(`${startTime.toTimeString().slice(0, 5)} - ${nextSlot.toTimeString().slice(0, 5)}`);
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    setCourtData((prev) => {
      const updatedDates = prev.availableDates.map((date) =>
        date.date === selectedDate
          ? { ...date, times: [...new Set([...date.times, ...slots])] }
          : date
      );
      return { ...prev, availableDates: updatedDates };
    });

    setTimeRange({ start: '', end: '' });
    setShowTimeModal(false);
  };

  const removeImage = (indexToRemove) => {
    setCourtData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeTimeSlot = (dateIndex, timeIndex) => {
    setCourtData((prev) => {
      const updatedDates = [...prev.availableDates];
      updatedDates[dateIndex].times = updatedDates[dateIndex].times.filter((_, idx) => idx !== timeIndex);
      return { ...prev, availableDates: updatedDates };
    });
  };

  const removeDate = (dateIndex) => {
    setCourtData((prev) => ({
      ...prev,
      availableDates: prev.availableDates.filter((_, idx) => idx !== dateIndex),
    }));
  };

  const handleSubmit = async (e) => {
    console.log(courtData);
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/court/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courtData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to update court');
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Swal.fire({
        title: 'Success!',
        text: 'Court updated successfully',
        icon: 'success',
      });
      
      navigate('/courts'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating court:', error);
      toast.error('Failed to update court');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">Update Your Court</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Court Name</label>
              <input
                type="text"
                name="name"
                value={courtData.name}
                onChange={handleChange}
                placeholder="Enter court name"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={courtData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={courtData.price}
                onChange={handleChange}
                placeholder="Enter price per hour"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={courtData.description}
                onChange={handleChange}
                placeholder="Enter court description"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
                rows="4"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Google Map Link</label>
              <input
                type="text"
                name="googlemaplink"
                value={courtData.googlemaplink}
                onChange={handleChange}
                placeholder="Enter Google map Link"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Upload Images */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Court Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div className="mt-4 flex gap-2 flex-wrap">
                {courtData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Dates */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Available Dates</label>
              <button
                type="button"
                onClick={() => setShowDateModal(true)}
                className="mt-2 px-4 py-2 bg-primaryColor text-white rounded-lg"
              >
                Add Date
              </button>
              <div className="mt-4 space-y-4">
                {courtData.availableDates.map((date, index) => {
                  const formattedDate = new Date(date.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                  return ( 
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="font-bold">{formattedDate}</div>
                      <button
                        type="button"
                        onClick={() => removeDate(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove Date
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {date.times.map((time, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-200 text-sm rounded-lg flex items-center">
                          {time}
                          <button
                            type="button"
                            onClick={() => removeTimeSlot(index, idx)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDate(date.date);
                        setShowTimeModal(true);
                      }}
                      className="mt-2 px-4 py-2 bg-primaryColor text-white rounded-lg"
                    >
                      Add Time Slots
                    </button>
                  </div>
                  )
               })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-primaryColor text-white rounded-lg font-semibold hover:bg-green-700"
            >
              Update Court
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-500">Please log in to update this court.</h2>
        </div>
      )}

      {/* Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add Available Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-2"
            />
            <div className="mt-4 flex gap-2">
              <button 
                type="button"
                onClick={addDate} 
                className="px-4 py-2 bg-primaryColor text-white rounded-lg"
              >
                Add Date
              </button>
              <button
                type="button"
                onClick={() => setShowDateModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add Time Slots for {selectedDate}</h3>
            <input
              type="time"
              value={timeRange.start}
              onChange={(e) => setTimeRange({ ...timeRange, start: e.target.value })}
              className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <input
              type="time"
              value={timeRange.end}
              onChange={(e) => setTimeRange({ ...timeRange, end: e.target.value })}
              className="block w-full border border-gray-300 rounded-lg p-2"
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={addTimeSlots}
                className="px-4 py-2 bg-primaryColor text-white rounded-lg"
              >
                Add Time Slots
              </button>
              <button
                type="button"
                onClick={() => setShowTimeModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCourt;
