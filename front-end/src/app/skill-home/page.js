

// "use client"
// import React, { useState, useEffect } from 'react';
// import Chart from 'react-apexcharts';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faUser, faAngleDown, faUsers, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';

// const useChartData = () => {
//   const [category, setCategory] = useState([]);
//   const [data, setData] = useState([]);
//   const [options, setOptions] = useState({});
//   const [series, setSeries] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://dummy.restapiexample.com/api/v1/employees");
//         const age = response.data.data.map(item => item.employee_age);
//         const salary = response.data.data.map(item => item.employee_salary);
//         setCategory(salary);
//         setData(age);
//         setOptions({
//           chart: { id: 'apexchart-example' },
//           xaxis: { categories: age }
//         });
//         setSeries([{ name: 'Salary', data: salary }]);
//       } catch (error) {
//         console.error(error);
//         alert('Error fetching data');
//       }
//     };

//     fetchData();
//   }, []);

//   return { category, data, options, series };
// };

// const ChartComponent = () => {
//   const { options, series } = useChartData();
  
//   return (
//     <Chart
//       options={options}
//       series={series}
//       type="line"
//       width="100%"
//       height={300}
//     />
//   );
// };

// const Home = () => {
//   const [dropdownOpen, setDropdownOpen] = useState({
//     leads: false,
//     opportunities: false,
//     analytics: false,
//     learners: false,
//     courses: false,
//     activities: false,
//   });

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('');
//   const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
//   const [userDialogOpen, setUserDialogOpen] = useState(false);

//   const handleDropdownToggle = (menu) => {
//     setDropdownOpen(prev => ({
//       ...prev,
//       [menu]: !prev[menu],
//     }));
//     setActiveMenu(menu);
//   };

//   const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

//   const closeNotificationDialog = () => setNotificationDialogOpen(false);
//   const closeUserDialog = () => setUserDialogOpen(false);

//   return (
//     <main className="min-h-screen bg-gray-100">
//       <div className="relative flex flex-col lg:flex-row bg-white shadow-md lg:p-2 shadow-gray-400">
//         <div className="lg:hidden absolute left-4 flex items-end z-4">
//           <button onClick={handleMobileMenuToggle} aria-label="Toggle mobile menu" className="text-gray-700">
//             <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="2x" />
//           </button>
//         </div>

//         <img src="/menu.59f55fe5 (1).svg" alt="Menu Icon" className="w-8 hidden lg:block" />
//         <div className="flex-1 flex justify-center lg:justify-start items-center my-2 sm:my-0">
//           <img
//             src="/skillcapital.png"
//             alt="Skill Capital"
//             className="w-48 sm:w-60 md:w-80 lg:w-40"
//           />
//         </div>
//         <div className="hidden lg:flex justify-items-end align-end sm:space-x-2 text-sm">
//           {['Home', 'leads', 'opportunities', 'learners', 'courses', 'activities', 'analytics'].map(menu => (
//             <div className="relative" key={menu}>
//               <button
//                 onClick={() => handleDropdownToggle(menu)}
//                 className={`text-gray-700 hover:bg-red-100 rounded px-2 py-2 sm:px-3 sm:py-2 flex items-end text-sm sm:text-base ${activeMenu === menu ? 'bg-red-100 border-b-2 border-red-500' : ''}`}
//                 aria-label={`Toggle ${menu} menu`}
//               >
//                 <span className='capitalize text-sm ml-2'>{menu}</span>
//                 <FontAwesomeIcon icon={faAngleDown} className="ml-4 sm:ml-2 space-y-4" />
//               </button>
//               {dropdownOpen[menu] && (
//                 <div className="absolute left-0 mt-2 w-36 sm:w-40 bg-white shadow-lg rounded-md z-10">
//                   {menu === 'leads' && (
//                     <>
//                       <Link href="../leads/lead-home">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Leads Home</div>
//                       </Link>
//                       <Link href="../leads/create-lead">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Create Leads</div>
//                       </Link>
//                     </>
//                   )}
//                   {menu === 'opportunities' && (
//                     <>
//                       <Link href="/opportunities">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Opportunities Page</div>
//                       </Link>
//                       <Link href="/opportunities/new">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">New Opportunity</div>
//                       </Link>
//                     </>
//                   )}
//                   {menu === 'learners' && (
//                     <>
//                       <Link href="/learners">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">All Learners</div>
//                       </Link>
//                       <Link href="/learners/add">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Add Learner</div>
//                       </Link>
//                     </>
//                   )}
//                   {menu === 'courses' && (
//                     <>
//                       <Link href="/courses">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Course List</div>
//                       </Link>
//                       <Link href="/courses/new">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Add New Course</div>
//                       </Link>
//                     </>
//                   )}
//                   {menu === 'activities' && (
//                     <>
//                       <Link href="/activities">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">All Activities</div>
//                       </Link>
//                       <Link href="/activities/new">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">New Activity</div>
//                       </Link>
//                     </>
//                   )}
//                   {menu === 'analytics' && (
//                     <>
//                       <Link href="/analytics/reports">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Reports</div>
//                       </Link>
//                       <Link href="/analytics/overview">
//                         <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Overview</div>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//           <div className="flex space-x-2 sm:space-x-4 ml-2 sm:ml-4">
//             <Link href="/star">
//               <img src="/Stars.png" className='w-6 sm:w-8' alt="Stars" />
//             </Link>
//             <button onClick={() => setNotificationDialogOpen(true)} aria-label="Open notifications">
//               <FontAwesomeIcon icon={faBell} size="lg" />
//             </button>
//             <button onClick={() => setUserDialogOpen(true)} aria-label="Open user menu">
//               <FontAwesomeIcon icon={faUser} size="lg" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {mobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 bg-white shadow-lg z-50">
//           <div className="p-4 flex flex-col">
//             <div className="flex justify-end mb-4">
//               <button onClick={handleMobileMenuToggle} aria-label="Close mobile menu" className="text-gray-700">
//                 <FontAwesomeIcon icon={faTimes} size="2x" />
//               </button>
//             </div>
//             {['learners', 'courses', 'activities', 'leads', 'opportunities', 'analytics'].map(menu => (
//               <div className="relative mb-4" key={menu}>
//                 <button
//                   onClick={() => handleDropdownToggle(menu)}
//                   className={`text-gray-700 hover:bg-red-100 rounded px-2 py-2 flex items-center text-sm ${activeMenu === menu ? 'bg-red-100 border-b-2 border-red-500' : ''}`}
//                   aria-label={`Toggle ${menu} menu`}
//                 >
//                   {menu.charAt(0).toUpperCase() + menu.slice(1)}
//                   <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
//                 </button>
//                 {dropdownOpen[menu] && (
//                   <div className="mt-2 w-full bg-gray-100 shadow-lg rounded-md">
//                     {menu === 'leads' && (
//                       <>
//                         <Link href="/leads/new">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">New Lead</div>
//                         </Link>
//                         <Link href="/leads/manage">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Manage Leads</div>
//                         </Link>
//                       </>
//                     )}
//                     {menu === 'opportunities' && (
//                       <>
//                         <Link href="/opportunities">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Opportunities Page</div>
//                         </Link>
//                         <Link href="/opportunities/new">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">New Opportunity</div>
//                         </Link>
//                       </>
//                     )}
//                     {menu === 'learners' && (
//                       <>
//                         <Link href="/learners">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">All Learners</div>
//                         </Link>
//                         <Link href="/learners/add">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Add Learner</div>
//                         </Link>
//                       </>
//                     )}
//                     {menu === 'courses' && (
//                       <>
//                         <Link href="/courses">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Course List</div>
//                         </Link>
//                         <Link href="/courses/new">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Add New Course</div>
//                         </Link>
//                       </>
//                     )}
//                     {menu === 'activities' && (
//                       <>
//                         <Link href="/activities">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">All Activities</div>
//                         </Link>
//                         <Link href="/activities/new">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">New Activity</div>
//                         </Link>
//                       </>
//                     )}
//                     {menu === 'analytics' && (
//                       <>
//                         <Link href="/analytics/reports">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Reports</div>
//                         </Link>
//                         <Link href="/analytics/overview">
//                           <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Overview</div>
//                         </Link>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//             <div className="flex space-x-4 mt-4">
//               <Link href="/star">
//                 <img src="/Stars.png" className='w-8' alt="Stars" />
//               </Link>
//               <button onClick={() => setNotificationDialogOpen(true)} aria-label="Open notifications">
//                 <FontAwesomeIcon icon={faBell} size="2x" />
//               </button>
//               <button onClick={() => setUserDialogOpen(true)} aria-label="Open user menu">
//                 <FontAwesomeIcon icon={faUser} size="2x" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 p-4 sm:p-8 font-bold text-base sm:text-lg">
//         {[
//           { label: 'Not Contacted', count: 1 },
//           { label: 'Warm Lead', count: 25 },
//           { label: 'Attempted', count: 21 },
//           { label: 'Registered', count: 1 },
//           { label: 'Opportunity', count: 1 },
//           { label: 'Cold Lead', count: 36 },
//         ].map((item, index) => (
//           <div key={index} className="bg-white shadow-md sm:p-6 rounded-xl flex items-center space-x-4 sm:space-x-6">
//             <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
//               <FontAwesomeIcon icon={faUsers} className="text-blue-500" size="lg" />
//             </div>
//             <div className="flex-grow">
//               <h2 className="text-gray-500 text-sm sm:text-base">{item.label}</h2>
//               <p className="text-xl sm:text-2xl">{item.count}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="flex-grow bg-white shadow-md p-4 sm:p-6 rounded-md">
//           <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Today Leads</h2>
//           <ChartComponent />
//         </div>
//         <div className="w-full sm:w-1/4 bg-white shadow-md p-4 sm:p-6 rounded-md flex flex-col items-center">
//           <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Analytics</h2>
//           <div className="p-4 sm:p-6">
//             <h1 className="border rounded-full border-2 border-black text-center p-14 sm:p-12 text-sm sm:text-3xl">
//               <p className="text-2xl">0</p>
//               <span className='text-xl'> Leads</span>
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Notification Dialog */}
//       {notificationDialogOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold">Notifications</h3>
//             <p className="mt-2">You have no new notifications.</p>
//             <button onClick={closeNotificationDialog} className="mt-4 text-blue-500">Close</button>
//           </div>
//         </div>
//       )}

//       {/* User Dialog */}
//       {userDialogOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold">User Menu</h3>
//             <Link href="/user">
//               <div className="block mt-2 text-blue-500 cursor-pointer">User Profile</div>
//             </Link>
//             <Link href="/logout">
//               <div className="block mt-2 text-blue-500 cursor-pointer">Log Out</div>
//             </Link>
//             <button onClick={closeUserDialog} className="block mt-4 text-blue-500">Close</button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default Home;
"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Chart from 'react-apexcharts'; // Ensure ApexCharts is installed and imported
import axios from 'axios'; // For API calls
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Home = () => {
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChartData = async () => {
    try {
      const response = await axios.get('/api/chart-data'); // Replace with your API endpoint
      const data = response.data;

      // Format the data to match the chart library's requirements
      const options = {
        chart: {
          type: 'line',
        },
        xaxis: {
          categories: data.categories,
        },
      };

      const series = [
        {
          name: 'Sales',
          data: data.values,
        },
      ];

      setChartOptions(options);
      setChartSeries(series);
    } catch (err) {
      setError('Failed to fetch chart data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const closeNotificationDialog = () => setNotificationDialogOpen(false);
  const closeUserDialog = () => setUserDialogOpen(false);

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar
        onNotificationClick={() => setNotificationDialogOpen(true)}
        onUserClick={() => setUserDialogOpen(true)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 p-4 sm:p-8 font-bold text-base sm:text-lg">
        {[
          { label: 'Not Contacted', count: 1 },
          { label: 'Warm Lead', count: 25 },
          { label: 'Attempted', count: 21 },
          { label: 'Registered', count: 1 },
          { label: 'Opportunity', count: 1 },
          { label: 'Cold Lead', count: 36 },
        ].map((item, index) => (
          <div key={index} className="bg-white shadow-md sm:p-6 rounded-xl flex items-center space-x-4 sm:space-x-6">
            <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-blue-500" size="lg" />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-500 text-sm sm:text-base">{item.label}</h2>
              <p className="text-xl sm:text-2xl">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow bg-white shadow-md p-4 sm:p-6 rounded-md">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Today Leads</h2>
          {loading ? (
            <p>Loading chart data...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="line"
              width="100%"
              height="300"
            />
          )}
        </div>
        <div className="w-full sm:w-1/4 bg-white shadow-md p-4 sm:p-6 rounded-md flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Analytics</h2>
          <div className="p-4 sm:p-6">
            <h1 className="border rounded-full border-2 border-black text-center p-14 sm:p-12 text-sm sm:text-3xl">
              <p className="text-2xl">0</p>
              <span className='text-xl'> Leads</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Notification Dialog */}
      {notificationDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="mt-2">You have no new notifications.</p>
            <button onClick={closeNotificationDialog} className="mt-4 text-blue-500">Close</button>
          </div>
        </div>
      )}

      {/* User Dialog */}
      {userDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">User Menu</h3>
            <Link href="/user">
              <div className="block mt-2 text-blue-500 cursor-pointer">User Profile</div>
            </Link>
            <Link href="/logout">
              <div className="block mt-2 text-blue-500 cursor-pointer">Log Out</div>
            </Link>
            <button onClick={closeUserDialog} className="block mt-4 text-blue-500">Close</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
