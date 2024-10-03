import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import './Home.css'; // Importing the CSS file
import { FaSearch, FaStar } from 'react-icons/fa'; // Importing icons
import court1 from '../img/court1.jpg';
import court2 from '../img/court2.jpg';
import court3 from '../img/court3.jpg';
import court4 from '../img/court4.jpg'; // Add additional court images

// Array of courts (total of 16 for 4 rows and 4 columns)
const courts = [
  {
    id: 1,
    image: court1,
    name: 'KS Badminton Court',
    location: 'Maradana, Colombo',
    rating: 4,
  },
  {
    id: 2,
    image: court2,
    name: 'KS Badminton Court',
    location: 'Maradana, Colombo',
    rating: 4,
  },
  {
    id: 3,
    image: court3,
    name: 'DS Sports Center',
    location: 'Nugegoda, Colombo',
    rating: 5,
  },
  {
    id: 4,
    image: court2,
    name: 'DS Sports Center',
    location: 'Nugegoda, Colombo',
    rating: 5,
  },
  {
    id: 5,
    image: court1,
    name: 'Ace Sports Arena',
    location: 'Kandy, Sri Lanka',
    rating: 3,
  },
  {
    id: 6,
    image: court3,
    name: 'Ace Sports Arena',
    location: 'Kandy, Sri Lanka',
    rating: 3,
  },
  {
    id: 7,
    image: court4,
    name: 'Champions Court',
    location: 'Colombo 7, Sri Lanka',
    rating: 4,
  },
  {
    id: 8,
    image: court4,
    name: 'Champions Court',
    location: 'Colombo 7, Sri Lanka',
    rating: 4,
  },
  {
    id: 9,
    image: court1,
    name: 'Victory Badminton Court',
    location: 'Colombo, Sri Lanka',
    rating: 4,
  },
  {
    id: 10,
    image: court2,
    name: 'Legends Badminton Hall',
    location: 'Galle, Sri Lanka',
    rating: 5,
  },
  {
    id: 11,
    image: court3,
    name: 'Super Sports Court',
    location: 'Negombo, Sri Lanka',
    rating: 3,
  },
  {
    id: 12,
    image: court4,
    name: 'Royal Court',
    location: 'Colombo, Sri Lanka',
    rating: 4,
  },
  {
    id: 13,
    image: court1,
    name: 'Elite Badminton Center',
    location: 'Kandy, Sri Lanka',
    rating: 4,
  },
  {
    id: 14,
    image: court2,
    name: 'Infinity Sports',
    location: 'Colombo, Sri Lanka',
    rating: 5,
  },
  {
    id: 15,
    image: court3,
    name: 'Pinnacle Sports Arena',
    location: 'Matara, Sri Lanka',
    rating: 3,
  },
  {
    id: 16,
    image: court4,
    name: 'Starlight Badminton Hall',
    location: 'Colombo, Sri Lanka',
    rating: 4,
  },
];

// CourtCard component
const CourtCard = ({ image, name, location, rating }) => {
  const totalStars = 5;

  return (
    <div className="court-card">
      <img src={image} alt={name} className="court-image" />
      <div className="court-info">
        <h3 className="court-title">{name}</h3>
        <p className="court-location">{location}</p>
        <div className="court-stars">
          {Array.from({ length: totalStars }, (v, i) => (
            <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Home component
const Home = () => {
  
  return (
    <div className='fullcontainer'>
      <Navigation />
      <div className='home-container'>
        <div className='search-container'>
          
          <div className='search-content'><input type='Search here your court' placeholder='Search here your court' className='search-box'/></div>
          <div className='search-icon'>
            <FaSearch />
          </div>
        </div>
      </div>

      {/* Render the Court Cards in a grid layout */}
      <div className='court-grid'>
        {courts.map(court => (
          <CourtCard 
            key={court.id}
            image={court.image}
            name={court.name}
            location={court.location}
            rating={court.rating}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
