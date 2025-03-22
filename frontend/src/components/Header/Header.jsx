import React, { useEffect, useContext, useRef } from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink, Link } from 'react-router-dom';
import userImg from '../../assets/images/avatar-icon.jpg';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext';
import useGetProfile from '../../hooks/useFetchData';

// Navigation links
const navLinks = [
  {
    path: '/home',
    display: "Home",
  },
  {
    path: '/courts',
    display: "Find court",
  },
  {
    path: '/services',
    display: "Services",
  },
  {
    path: '/court/create',
    display: "Create court", // This will be conditionally shown
  },
  {
    path: '/contact',
    display: "Contact",
  },
];

const Header = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, token } = useContext(authContext);

  const { data: userData, loading, error } = useGetProfile(`${baseUrl}/api/user/myprofile`);
  console.log(userData, 'userdata');

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show_menu');
  };

  // Filter navigation links based on isCourtOwner
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.path === '/court/create') {
      return userData?.isCourtOwner; // Only include "Create Court" if isCourtOwner is true
    }
    return true;
  });

  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <div>
            <a href='/'>
              <img src={logo} className='w-[150px]' alt='Logo' />
            </a>
          </div>

          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {filteredNavLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                        : 'text-textColor text-[16px] leading-7 font-[500]'
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex items-center gap-4'>
            {token && user ? (
              <div className='flex items-center gap-2'>
                <Link to='/users/profile/me'>
                  <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                    <img src={userData?.photo || userImg} className='w-full rounded-full' alt='User Avatar' />
                  </figure>
                </Link>
                <h1 className='text-[16px] font-[600]'>{userData?.name}</h1>
              </div>
            ) : (
              <Link to='/login'>
                <button className='bg-primaryColor py-1 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                  Login
                </button>
              </Link>
            )}

            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
