import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillYoutube, AiFillFacebook, AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
  const socialLinks = [
    {
      path: "https://www.youtube.com/watch?v=3s3tZnjRWUY",
      icon: <AiFillYoutube className="group-hover:text-white w-5 h-5" />
    },
    {
      path: "https://www.facebook.com/",
      icon: <AiFillFacebook className="group-hover:text-white w-5 h-5" />
    },
    {
      path: "https://www.instagram.com/",
      icon: <AiFillInstagram className="group-hover:text-white w-5 h-5" />
    },
    {
      path: "https://www.linkedin.com/",
      icon: <RiLinkedinFill className="group-hover:text-white w-5 h-5" />
    }
  ];

  const quickLinks = [
    {
      path: "/",
      title: "Home"
    },
    {
      path: "/courts",
      title: "Find Courts"
    },
    {
      path: "/services",
      title: "Services"
    },
    {
      path: "/court/create",
      title: "Create Court"
    }
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-6">
            <img src={logo} alt="Shuttlezone Logo" className="h-10 w-auto" />
            <div className="space-y-4">
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <Link
                    to={link.path}
                    key={index}
                    className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center 
                             text-slate-600 transition-all duration-300 hover:bg-primaryColor hover:border-blue-600 
                             hover:text-white group"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-3 text-slate-600">
              <p>Email: info@shuttlezone.com</p>
              <p>Phone: +1 234 567 890</p>
              <p>Address: 123 Shuttle Street</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
            <div className="space-y-4">
              <p className="text-slate-600">Subscribe to our newsletter for updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-slate-300 rounded-l-md flex-1 focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-primaryColor text-white rounded-r-md hover:bg-blue-700 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-center text-slate-600">
            Copyright © {year} Shuttlezone. Developed by Chanidu Karunarathna. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;