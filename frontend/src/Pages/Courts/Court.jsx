import React, { useState } from "react";
import CourtCard from "./CourtCard";
import { useEffect } from "react";
const Court = () => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/court`);
        const data = await response.json();
        setCourts(data); // Store data in state
      } catch (error) {
        console.error("Error fetching courts:", error);
      }
    };

    fetchCourts();
  }, [baseUrl]); // Run once when component mounts
  console.log(courts);

  const filteredCourts = courts.filter((court) => {
    const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? court.location === locationFilter : true;
    const matchesDate = selectedDate
      ? court.availableDates.some((availableDate) => availableDate.date.startsWith(selectedDate))
      : true;
    const matchesTimeSlot = selectedDate && startTime
      ? court.availableDates.some(
          (availableDate) =>
            availableDate.date.startsWith(selectedDate) &&
            availableDate.times.includes(startTime)
        )
      : true;
  
    return matchesSearch && matchesLocation && matchesDate && matchesTimeSlot;
  });
  
  

  const availableTimes = selectedDate
  ? [
      ...new Set(
        courts.flatMap((court) =>
          court.availableDates
            .filter((availableDate) => availableDate.date.startsWith(selectedDate))
            .flatMap((availableDate) => availableDate.times)
        )
      ),
    ]
  : [];


  const handleBooking = (courtId) => {
    if (!selectedDate || !startTime || !endTime) {
      alert("Please select a date and time range before booking.");
      return;
    }
  };

  return (
    <>
      <section className="py-5 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-center text-2xl font-bold mb-5">Explore Courts </h2>
          <div className="bg-white shadow-md rounded-md p-6 flex flex-wrap gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Search courts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Location</option>
              {[...new Set(courts.map((court) => court.location))].map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Time Slot</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            
            <button className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredCourts.length > 0 ? (
              filteredCourts.map((court) => (
                <CourtCard
                  key={court._id}
                  court={court}
                  onBook={() => handleBooking(court._id)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No courts found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Court;
