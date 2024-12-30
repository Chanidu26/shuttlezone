import React, { useState } from 'react';
import axios from 'axios';
import { token } from '../../config';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';

const Profile = ({ user }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.photo || ""); // Initialize with user's existing photo
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    photo: user?.photo || null, // Initialize with user's existing photo
  });
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Create a temporary preview URL
      const localPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(localPreviewUrl);

      // Upload to Cloudinary
      const uploadedData = await uploadImageToCloudinary(file);
      
      if (!uploadedData?.url) {
        throw new Error('Failed to get upload URL');
      }

      setSelectedFile(file);
      setFormData(prev => ({ ...prev, photo: uploadedData.url }));
      setError('');
    } catch (err) {
      console.error('Image upload error:', err);
      setError('Failed to upload image. Please try again.');
      // Revert preview if upload failed
      setPreviewUrl(formData.photo || '');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.name || !formData.email) {
        throw new Error('Name and email are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const updateData = {
        name: formData.name,
        email: formData.email,
      };
  
      // Include optional fields
      if (formData.password) {
        updateData.password = formData.password;
      }
      if (formData.photo && formData.photo !== user?.photo) {
        updateData.photo = formData.photo;
      }
      console.log(updateData);

      const response = await axios.put(
        `${baseUrl}/api/user/profile`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      setSuccess('Profile updated successfully!');
      // Optional: Update user context/state here if needed
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Profile Picture Upload */}
        <div className="text-center">
          <div className="mb-4">
            <img
              src={previewUrl || '/default-profile.png'}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full mx-auto object-cover border border-gray-300"
            />
          </div>
          <label
            htmlFor="profilePicture"
            className="text-primaryColor font-medium cursor-pointer hover:underline"
          >
            {loading ? 'Uploading...' : 'Change Profile Picture'}
          </label>
          <input
            type="file"
            name="photo"
            id="profilePicture"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            className="hidden"
            disabled={loading}
          />
        </div>

        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
            placeholder="Enter a new password (optional)"
            minLength={6}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md">{error}</p>
        )}
        
        {/* Success Message */}
        {success && (
          <p className="text-green-500 text-sm bg-green-50 p-2 rounded-md">{success}</p>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full bg-primaryColor text-white py-3 rounded-lg font-medium transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryColor-dark'
            }`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;