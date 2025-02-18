import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
const Updatecourt = () => {
  const { id } = useParams()
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { user, token } = useContext(authContext);
  const navigate = useNavigate()
  const [courtData, setCourtData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    googlemaplink: '',
    images: [],
    availableDates: [],
  });

  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
      const fetchCourtData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${baseUrl}/api/court/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          setCourtData(data);
        } catch (error) {
          console.error('Error fetching court data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      console.log('this is the court data',courtData)
      fetchCourtData();
    }, [baseUrl, id]);
    
  if(isloading) {
    return <div>Loading...</div>
  }

  const handleChange = (e) => {
    setCourtData({
      ...courtData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/court/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(courtData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      alert('Court updated successfully!');
      navigate('/courts'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating court:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-2 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Your  Court</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium">Court Name :</label>
        <input
          type="text"
          name="name"
          value={courtData.name}
          onChange={handleChange}
          placeholder="Court Name"
          className="w-full p-2 border rounded"
          required
        />
        <label className="block text-sm font-medium">Location:</label>
        <input
          type="text"
          name="location"
          value={courtData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />
        <label className="block text-sm font-medium">Price:</label>
        <input
          type="number"
          name="price"
          value={courtData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <label className="block text-sm font-medium">Description:</label>
        <textarea
          name="description"
          value={courtData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-[100px] p-2 border rounded"
          required
        ></textarea>
        <label className="block text-sm font-medium">Google Map Link:</label>
        <input
          type="text"
          name="googlemaplink"
          value={courtData.googlemaplink}
          onChange={handleChange}
          placeholder="Google Map Link"
          className="w-full p-2 border rounded"
        />
        <label className='block text-sm font-medium'>Images:</label>
        <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="mt-4 flex gap-2 flex-wrap">
              {/* Changed from images to courtDetails.images */}
              {courtData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
        <button
          type="submit"
          className="w-full bg-primaryColor text-white p-2 rounded hover:bg-blue-700"
        >
          Update Court
        </button>
      </form>
    </div>
    
  )
}

export default Updatecourt