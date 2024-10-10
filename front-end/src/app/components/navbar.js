
"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use useRouter from next/router

const Navbar = ({ onNotificationClick, onUserClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter(); // Get the router object
  const [activeLink, setActiveLink] = useState(router.pathname); // Initialize with current pathname

  useEffect(() => {
    setActiveLink(router.pathname); // Update activeLink based on router pathname
  }, [router.pathname]);

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLinkClick = (path) => {
    setActiveLink(path); // Update activeLink state
    if (mobileMenuOpen) {
      setMobileMenuOpen(false); // Close mobile menu on link click
    }
    router.push(path); // Navigate to the clicked path
  };

  const links = [
    { name: 'Home', path: '/skill-home' },
    { name: 'Leads', path: '/leads/lead-home' },
    { name: 'Opportunity', path: '/opportunity/home-page' },
    { name: 'Learners', path: '/learners/learner-home' },
    { name: 'Batches', path: '/batches' },
    { name: 'Courses', path: '/courses' },
    { name: 'Activities', path: '/activities/activity-home' },
    { name: 'Analytics', path: '/analytics/overview' }
  ];
  return (
    <header>
      <div className="relative flex flex-col lg:flex-row bg-white shadow-md lg:p-2 shadow-gray-400">
        <div className="lg:hidden absolute left-4 flex items-end z-4">
          <button onClick={handleMobileMenuToggle} aria-label="Toggle mobile menu" className="text-gray-700">
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="2x" />
          </button>
        </div>

        <div className="w-8 hidden lg:block">
          <Image
            src="/menu.59f55fe5 (1).svg"
            alt="Menu Icon"
            width={32}
            height={32}
          />
        </div>

        <div className="flex-1 flex justify-center lg:justify-start items-center my-2 sm:my-0">
          <Image

            src="/skillcapital.png"
            alt="Skill Capital"
            width={192}
            height={48}
            layout="intrinsic"
          />
        </div>



        <div className="hidden lg:flex flex-wrap justify-end space-x-2 sm:space-x-4 ml-2 sm:ml-4 text-sm">
          {links.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`text-gray-700 hover:bg-red-10 rounded px-2 py-2 sm:px-3 sm:py-2 flex items-center text-sm sm:text-base ${activeLink === path ? 'bg-red-200 text-black font-bold border-b-2 border-red-500' : ''}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleLinkClick(path); // Handle click
              }}
            >
              <span className='capitalize text-sm ml-2'>{name}</span>
              <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
            </Link>
          ))}
          <div className="flex space-x-2 sm:space-x-4 ml-2 sm:ml-4">
            <Link href="/star">
              <Image
                src="/Stars.png"
                alt="Stars"
                width={24}
                height={24}
              />
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
            {links.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center ${activeLink === path ? 'bg-red-500 text-white font-bold border-b-2 border-red-500' : ''}`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  handleLinkClick(path); // Handle click
                }}
              >
                {name}
                <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
              </Link>
            ))}
            <div className="flex space-x-4 mt-4">
              <Link href="/star">
                <Image
                  src="/Stars.png"
                  alt="Stars"
                  width={32}
                  height={32}
                />
              </Link>
              <button onClick={onNotificationClick} aria-label="Open notifications">
                <FontAwesomeIcon icon={faBell} size="2x" />
              </button>
              <button onClick={onUserClick} aria-label="log out">
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
