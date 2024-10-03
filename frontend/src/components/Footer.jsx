import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
      <footer className="app-footer">
        <div className="footer-content">
          <div className='name'>SHUTTLE ZONE</div>
          <div>
          <p>Phone: 071-4546789</p>
          <p>Email: shuttlezone@gmail.com</p>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">FAQs</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  