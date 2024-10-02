import React from 'react';
import './Landing.css'; // Ensure you create this CSS file for styling

const Landing = () => {
  return (
    <div className="landing-page">
      <header className="header-landing">
        <div className="logo">ShuttleZone</div>
        <nav className="nav-links">
          <a href="/Login">Login</a>
          <a href="/Signup">Signup</a>
          
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Book Your Badminton Court Instantly</h1>
          <p>Find, book, and play on the best courts near you!</p>
          <a href="/Home" className="cta-button">Book Now</a>
        </div>
      </section>
    </div>
  );
};

export default Landing;
