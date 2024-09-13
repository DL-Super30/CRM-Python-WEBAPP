"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image'; // Importing Image component
import { useRouter } from 'next/navigation';//importing navigation

const Navbar = ({ onNotificationClick, onUserClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState({
    leads: false,
    opportunities: false,
    analytics: false,
    learners: false,
    courses: false,
    activities: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const handleDropdownToggle = (menu) => {
    setDropdownOpen(prev => ({
      ...prev,
      [menu]: !prev[menu],
    }));
    setActiveMenu(menu);
  };
  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  return (
    <header>
      {/* Desktop Navbar */}
      <div className="relative flex flex-col lg:flex-row bg-white shadow-md lg:p-2 shadow-gray-200">
        <div className="lg:hidden absolute left-4 flex items-end z-4">
          <button onClick={handleMobileMenuToggle} aria-label="Toggle mobile menu" className="text-gray-700">
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="2x" />
          </button>
        </div>
        <Image src="/menu.59f55fe5 (1).svg" alt="Menu Icon" width={32} height={32} className="w-8 hidden lg:block" />
        <div className="flex-1 flex justify-center lg:justify-start items-center my-2 sm:my-0">
          <Image src="/skillcapital.png" alt="Skill Capital" width={160} height={40} className="w-48 sm:w-60 md:w-80 lg:w-40" />
        </div>
        <div className="hidden lg:flex justify-items-end align-end sm:space-x-2 text-sm">
          {['Home', 'leads', 'opportunities', 'learners', 'courses', 'activities', 'analytics'].map(menu => (
            <div className="relative" key={menu}>
              <button
                onClick={() => handleDropdownToggle(menu)}
                className={`text-gray-700 hover:bg-red-100 rounded px-2 py-2 sm:px-3 sm:py-2 flex items-end text-sm sm:text-base ${activeMenu === menu ? 'bg-red-100 border-b-2 border-red-500' : ''}`}
                aria-label={`Toggle ${menu} menu`}
              >
                <span className='capitalize text-sm ml-2'>{menu}</span>
                <FontAwesomeIcon icon={faAngleDown} className="ml-4 sm:ml-2 space-y-4" />
              </button>
              {dropdownOpen[menu] && (
                <div className="absolute left-0 mt-2 w-36 sm:w-40 bg-white shadow-lg rounded-md z-10" >
                   {menu === 'Home' && (
                    <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-2">Home screen</Link>
                  )}
                  {menu === 'leads' && (
                    <Link href="/leaddetails" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-2">lead details</Link>
                  )}
                  {menu === 'opportunities' && (
                    <Link href="/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-2">Opportunities details</Link>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="flex space-x-2 sm:space-x-4 ml-2 sm:ml-4">
            <Link href="/star">
              <Image src="/Stars.png" width={24} height={24} className='w-6 sm:w-8' alt="Stars" />
            </Link>
            <button onClick={onNotificationClick} aria-label="Open notifications">
              <FontAwesomeIcon icon={faBell} size="lg" />
            </button>
            <button onClick={onUserClick} aria-label="Open user menu">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white shadow-lg z-50">
          <div className="p-4 flex flex-col">
            <div className="flex justify-end mb-4">
              <button onClick={handleMobileMenuToggle} aria-label="Close mobile menu" className="text-gray-700">
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </button>
            </div>
            {['learners', 'courses', 'activities', 'leads', 'opportunities', 'analytics'].map(menu => (
              <div className="relative mb-4" key={menu}>
                <button
                  onClick={() => handleDropdownToggle(menu)}
                  className={`text-gray-700 hover:bg-red-100 rounded px-3 py-2 flex items-center w-full justify-between text-lg ${activeMenu === menu ? 'bg-red-100 border-b-2 border-red-500' : ''}`}
                  aria-label={`Toggle ${menu} menu`}
                >
                  <span className='capitalize'>{menu}</span>
                  <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                </button>
                {dropdownOpen[menu] && (
                  <div className="mt-2 w-full bg-gray-100 shadow-lg rounded-md">
                    {menu === 'leads' && (
                      <Link href="/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Leads Page</Link>
                    )}
                    {menu === 'opportunities' && (
                      <Link href="/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">opportunities</Link>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="flex space-x-4 mt-4">
              <Link href="/star">
                <Image src="/Starspng" width={32} height={32} className='w-8' alt="Stars" />
              </Link>
              <button onClick={onNotificationClick} aria-label="Open notifications">
                <FontAwesomeIcon icon={faBell} size="2x" />
              </button>
              <button onClick={onUserClick} aria-label="Open user menu">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
