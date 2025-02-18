import React, { useState, useContext } from 'react';
import { authContext } from '../../src/context/AuthContext';
import {toast} from 'react-toastify'
import Swal from 'sweetalert2';
import uploadImageToCloudinary from '../utils/uploadCloudinary';
const CreateCourt = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const { user, token } = useContext(authContext);
  const [courtDetails, setCourtDetails] = useState({
    name: '',
    location: '',
    owner: '',
    price: '',
    description: '',
    googlemaplink: '',
    images: [],
    availableDates: [],
  });

  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeRange, setTimeRange] = useState({ start: '', end: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourtDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
  
    const uploadPromises = files.map(async (file) => {
      try {
        const response = await uploadImageToCloudinary(file);
        return response.secure_url; // Use the secure URL from Cloudinary
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        return null;
      }
    });
  
    const uploadedUrls = await Promise.all(uploadPromises);
  
    setCourtDetails((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls.filter((url) => url)], // Add non-null URLs
    }));
  };
  
  const addDate = () => {
    if (selectedDate && !courtDetails.availableDates.find((d) => d.date === selectedDate)) {
      setCourtDetails((prev) => ({
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

    setCourtDetails((prev) => {
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
  

  const handleSubmit = async () => {
    try {
      // Prepare form data
      const courtData = {
        name: courtDetails.name,
        location: courtDetails.location,
        owner: user._id, 
        price: courtDetails.price,
        description: courtDetails.description,
        googlemaplink: courtDetails.googlemaplink,
        images: courtDetails.images,
        availableDates: courtDetails.availableDates,
      };
      //formData.append('owner', user.id); // Assuming the user ID should be included
      //formData.append('price', courtDetails.price);
      //formData.append('description', courtDetails.description);
      //formData.append('availableDates', JSON.stringify(courtDetails.availableDates));
  
      // Append each image file to the form data
      //courtDetails.images.forEach((image, index) => {
        //formData.append(`images`, image.file);
      //});
  
      // Make the API request
      const response = await fetch(`${baseURL}/api/court`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add token for authentication
        },
        body: JSON.stringify(courtData),
      });
      console.log(courtData)
  
      // Handle response
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.message || 'Something went wrong');
        alert('Failed to create court. Please try again.');
        return;
      }
  
      const data = await response.json();
      Swal.fire({
        title: 'Court Created!',
        text: 'Your court has been created successfully.',
        icon:'success',
      })
      console.log('Court created:', data);
  
      // Optionally, reset form or navigate to another page
      setCourtDetails({
        name: '',
        location: '',
        owner: '',
        price: '',
        description: '',
        images: [],
        googlemaplink: '',
        availableDates: [],
      });
    } catch (error) {
      console.error('Error creating court:', error);
      toast.error('Failed to create court. Please try again.');

    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Create Your Own Court</h1>

          {/* Court Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Court Name</label>
              <input
                type="text"
                name="name"
                value={courtDetails.name}
                onChange={handleInputChange}
                placeholder="Enter court name"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={courtDetails.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={courtDetails.price}
                onChange={handleInputChange}
                placeholder="Enter price per hour"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={courtDetails.description}
                onChange={handleInputChange}
                placeholder="Enter court description"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Google Map Link</label>
              <input
                type="text"
                name="googlemaplink"
                value={courtDetails.googlemaplink}
                onChange={handleInputChange}
                placeholder="Enter Google map Link"
                className="block w-full mt-2 border border-gray-300 rounded-lg p-2"
              />
            </div>
            
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
              {/* Changed from images to courtDetails.images */}
              {courtDetails.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>

          {/* Available Dates */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Available Dates</label>
            <button
              onClick={() => setShowDateModal(true)}
              className="mt-2 px-4 py-2 bg-primaryColor text-white rounded-lg"
            >
              Add Date
            </button>
            <div className="mt-4 space-y-4">
              {courtDetails.availableDates.map((date, index) => (
                <div key={index} className="mb-4">
                  <div className="font-bold">{date.date}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {date.times.map((time, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-200 text-sm rounded-lg">
                        {time}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDate(date.date);
                      setShowTimeModal(true);
                    }}
                    className="mt-2 px-4 py-2 bg-primaryColor text-white rounded-lg"
                  >
                    Add Time Slots
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 px-4 py-2 bg-primaryColor text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Save Court
          </button>
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-500">Please log in to add a court.</h2>
        </div>
      )}

      {/* Modals */}
      {showDateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add Available Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-2"
            />
            <div className="mt-4 flex gap-2">
              <button onClick={addDate} className="px-4 py-2 bg-primaryColor text-white rounded-lg">
                Add Date
              </button>
              <button
                onClick={() => setShowDateModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showTimeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                onClick={addTimeSlots}
                className="px-4 py-2 bg-primaryColor text-white rounded-lg"
              >
                Add Time Slots
              </button>
              <button
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

export default CreateCourt;