

// // "use client";
// // import React, { useState } from 'react';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faStar, faBell, faUser } from '@fortawesome/free-regular-svg-icons';
// // import { faAngleDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// // import Link from 'next/link';
// // import Image from 'next/image'; // Import the Image component

// // const Navbar = ({ onNotificationClick, onUserClick }) => {
// //   const [dropdownOpen, setDropdownOpen] = useState({
// //     leads: false,
// //     opportunities: false,
// //     analytics: false,
// //     learners: false,
// //     Batches:false,
// //     courses: false,
// //     activities: false,
// //   });

// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [activeMenu, setActiveMenu] = useState('');

// //   const handleDropdownToggle = (menu) => {

// //     setDropdownOpen(prev => {
// //       const newDropdownOpen = Object.keys(prev).reduce((acc, key) => {
// //         acc[key] = key === menu ? !prev[key] : false;
// //         return acc;
// //       }, {});
// //       return newDropdownOpen;
// //     });
// //     setActiveMenu(menu);
// //   };

// //   const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

// //   return (
// //     <header>
// //       <div className="relative flex flex-col lg:flex-row bg-white shadow-md lg:p-2 shadow-gray-400">
// //         <div className="lg:hidden absolute left-4 flex items-end z-4">
// //           <button onClick={handleMobileMenuToggle} aria-label="Toggle mobile menu" className="text-gray-700">
// //             <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="2x" />
// //           </button>
// //         </div>

// //         <div className="w-8 hidden lg:block">
// //           <Image 
// //             src="/menu.59f55fe5 (1).svg" 
// //             alt="Menu Icon" 
// //             width={32}  
// //             height={32} 
// //           />
// //         </div>

// //         <div className="flex-1 flex justify-center lg:justify-start items-center my-2 sm:my-0">
// //           <Image 
// //             src="/skillcapital.png" 
// //             alt="Skill Capital" 
// //             width={192}  
// //             height={48}  
// //           />
// //         </div>

// //         <div className="hidden lg:flex justify-items-end align-end sm:space-x-2 text-sm">
// //           {['Home', 'leads', 'opportunities', 'learners','Batches', 'courses', 'activities', 'analytics'].map(menu => (
// //             <div className="relative" key={menu}>
// //               <button
// //                 onClick={() => handleDropdownToggle(menu)}
// //                 className={`text-gray-700 hover:bg-red-100 rounded px-2 py-2 sm:px-3 sm:py-2 flex items-end text-sm sm:text-base ${activeMenu === menu ? 'bg-red-100 border-b-2 border-red-500' : ''}`}
// //                 aria-label={`Toggle ${menu} menu`}
// //               >
// //                 <span className='capitalize text-sm ml-2'>{menu}</span>
// //                 <FontAwesomeIcon icon={faAngleDown} className="ml-4 sm:ml-2 space-y-4" />
// //               </button>
// //               {dropdownOpen[menu] && (
// //                 <div className="absolute left-0 mt-2 w-36 sm:w-40 bg-white shadow-lg rounded-md z-10">
// //                   {menu === 'Home' && (
// //                     <>
// //                       <Link href="./skill-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100"> </Link>

// //                     </>
// //                   )}
// //                   {menu === 'leads' && (
// //                     <>
// //                       <Link href="../leads/lead-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lead Home</Link>
// //                       <Link href="../leads/create-lead" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lead Details</Link>
// //                       <Link href="../leads/activity" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lead Reports</Link>
// //                     </>
// //                   )}
// //                   {menu === 'opportunities' && (
// //                     <>
// //                       <Link href="/opportunity" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Opportunity Home</Link>
// //                       <Link href="../opportunity/create-opportunity" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Create Opportunity</Link>
// //                     </>
// //                   )}
// //                   {menu === 'learners' && (
// //                     <>
// //                       <Link href="/learners/learner-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Learner Home</Link>
// //                       <Link href="/learners/learner-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Learner Profile</Link>
// //                       <Link href="/learners/learner-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Learner Reports</Link>
// //                     </>
// //                   )}
// //                      {menu === 'Batches' && (
// //                     <>
// //                       <Link href="/batches/batches-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">batches-home</Link>
// //                       <Link href="/batches/batches-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">batches-details</Link>
// //                       <Link href="/batches/batches-learners" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">batches-learners</Link>
// //                       <Link href="/batches/batches-activity" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">batches-activity</Link>
// //                       <Link href="/batches/batches-notes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">batches-notes</Link>
// //                       <Link href="/batches/batches-askai" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">batches-askai</Link>

// //                     </>
// //                   )}
// //                   {menu === 'courses' && (
// //                     <>
// //                       <Link href="/courses/course-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Course Home</Link>
// //                       <Link href="/courses/course-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Course Details</Link>
// //                       <Link href="/courses/course-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Course Reports</Link>
// //                     </>
// //                   )}
// //                   {menu === 'activities' && (
// //                     <>
// //                       <Link href="/activities/activity-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Activity Home</Link>
// //                       <Link href="/activities/activity-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Activity Details</Link>
// //                       <Link href="/activities/activity-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Activity Reports</Link>
// //                     </>
// //                   )}
// //                   {menu === 'analytics' && (
// //                     <>
// //                       <Link href="/analytics/overview" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Overview</Link>
// //                       <Link href="/analytics/traffic" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Traffic</Link>
// //                       <Link href="/analytics/reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Reports</Link>
// //                     </>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //           <div className="flex space-x-2 sm:space-x-4 ml-2 sm:ml-4">
// //             <Link href="/star">
// //               <Image 
// //                 src="/Stars.png" 
// //                 alt="Stars" 
// //                 width={24}  
// //                 height={24} 
// //               />
// //             </Link>
// //             <button onClick={onNotificationClick} aria-label="Open notifications">
// //               <FontAwesomeIcon icon={faBell} size="lg" />
// //             </button>
// //             <button onClick={onUserClick} aria-label="Open user menu">
// //               <FontAwesomeIcon icon={faUser} size="lg" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //       {mobileMenuOpen && (
// //         <div className="lg:hidden fixed inset-0 bg-white shadow-lg z-50">
// //           <div className="p-4 flex flex-col">
// //             <div className="flex justify-end mb-4">
// //               <button onClick={handleMobileMenuToggle} aria-label="Close mobile menu" className="text-gray-700">
// //                 <FontAwesomeIcon icon={faTimes} size="2x" />
// //               </button>
// //             </div>
// //             {['learners', 'courses', 'activities', 'leads', 'opportunities', 'analytics'].map(menu => (
// //               <div className="relative mb-4" key={menu}>
// //                 <button
// //                   onClick={() => handleDropdownToggle(menu)}
// //                   className={`text-gray-700 hover:bg-red-100 rounded px-3 py-2 flex items-center w-full justify-between text-lg ${activeMenu === menu ? 'bg-red-100 border-b-2 border-red-500' : ''}`}
// //                   aria-label={`Toggle ${menu} menu`}
// //                 >
// //                   <span className='capitalize'>{menu}</span>
// //                   <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
// //                 </button>
// //                 {dropdownOpen[menu] && (
// //                   <div className="mt-2 w-full bg-gray-100 shadow-lg rounded-md">
// //                      {menu === 'Home' && (
// //                       <>
// //                         <Link href="/leads/lead-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Lead Home</Link>

// //                       </>
// //                     )}
// //                     {menu === 'leads' && (
// //                       <>
// //                         <Link href="/leads/lead-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Lead Home</Link>
// //                         <Link href="/leads/lead-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Lead Details</Link>
// //                         <Link href="/leads/lead-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Lead Reports</Link>
// //                       </>
// //                     )}
// //                     {menu === 'opportunities' && (
// //                       <>
// //                         <Link href="/opportunities/opportunity-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Opportunity Home</Link>
// //                         <Link href="/opportunities/opportunity-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Opportunity Details</Link>
// //                         <Link href="/opportunities/opportunity-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Opportunity Reports</Link>
// //                       </>
// //                     )}
// //                     {menu === 'learners' && (
// //                       <>
// //                         <Link href="/learners/learners-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Learner Home</Link>
// //                         <Link href="/learners/learner-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Learner Profile</Link>
// //                         <Link href="/learners/learner-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Learner Reports</Link>
// //                       </>
// //                     )}
// //                       {menu === 'Batches' && (
// //                       <>
// //                         <Link href="/courses/course-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Course Home</Link>
// //                         <Link href="/courses/course-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Course Details</Link>
// //                         <Link href="/courses/course-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Course Reports</Link>
// //                       </>
// //                     )}
// //                     {menu === 'courses' && (
// //                       <>
// //                         <Link href="/courses/course-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Course Home</Link>
// //                         <Link href="/courses/course-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Course Details</Link>
// //                         <Link href="/courses/course-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Course Reports</Link>
// //                       </>
// //                     )}
// //                     {menu === 'activities' && (
// //                       <>
// //                         <Link href="/activities/activity-home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Activity Home</Link>
// //                         <Link href="/activities/activity-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Activity Details</Link>
// //                         <Link href="/activities/activity-reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Activity Reports</Link>
// //                       </>
// //                     )}
// //                     {menu === 'analytics' && (
// //                       <>
// //                         <Link href="/analytics/overview" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Overview</Link>
// //                         <Link href="/analytics/traffic" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Traffic</Link>
// //                         <Link href="/analytics/reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Reports</Link>
// //                       </>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //             <div className="flex space-x-4 mt-4">
// //               <Link href="/star">
// //                 <Image 
// //                   src="/Stars.png" 
// //                   alt="Stars" 
// //                   width={32}  // Adjust width as needed
// //                   height={32} // Adjust height as needed
// //                 />
// //               </Link>
// //               <button onClick={onNotificationClick} aria-label="Open notifications">
// //                 <FontAwesomeIcon icon={faBell} size="2x" />
// //               </button>
// //               <button onClick={onUserClick} aria-label="Open user menu">
// //                 <FontAwesomeIcon icon={faUser} size="2x" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </header>
// //   );
// // };

// // export default Navbar;
"use client";
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
    { name: 'leads', path: '/leads/lead-home' },
    { name: 'Opportunity', path:'/opportunity/home-page' },
    { name: 'learners', path: '/learners/learner-home' },
    { name: 'Batches', path: '/batches' },
    { name: 'courses', path: '/courses' },
    { name: 'activities', path: '/activities/activity-home' },
    { name: 'analytics', path: '/analytics/overview' }
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
