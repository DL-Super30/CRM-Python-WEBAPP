
// "use client"
// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/navbar';
// import Chart from 'react-apexcharts';
// import axios from 'axios'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';

// const Home = () => {
//   const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
//   const [userDialogOpen, setUserDialogOpen] = useState(false);
//   const [chartOptions, setChartOptions] = useState({});
//   const [chartSeries, setChartSeries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchChartData = async () => {
//     try {
//       const response = await axios.get('/api/chart-data'); // Replace with your API endpoint
//       const data = response.data;

//       // Format the data to match the chart library's requirements
//       const options = {
//         chart: {
//           type: 'line',
//         },
//         xaxis: {
//           categories: data.categories,
//         },
//       };

//       const series = [
//         {
//           name: 'Sales',
//           data: data.values,
//         },
//       ];

//       setChartOptions(options);
//       setChartSeries(series);
//     } catch (err) {
//       setError('Failed to fetch chart data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChartData();
//   }, []);

//   const closeNotificationDialog = () => setNotificationDialogOpen(false);
//   const closeUserDialog = () => setUserDialogOpen(false);

//   return (
//     <main className="min-h-screen bg-gray-100">
//       <Navbar
//         onNotificationClick={() => setNotificationDialogOpen(true)}
//         onUserClick={() => setUserDialogOpen(true)}
//       />

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
//           {loading ? (
//             <p>Loading chart data...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : (
//             <Chart
//               options={chartOptions}
//               series={chartSeries}
//               type="line"
//               width="100%"
//               height="300"
//             />
//           )}
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

"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import Navbar from '../components/navbar';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

// Dynamically import Chart component only on the client side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

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

