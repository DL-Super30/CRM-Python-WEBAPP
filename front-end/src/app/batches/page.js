// "use client"
// import { useState } from 'react';

// export default function TrainerDashboard() {
//   const [activeTab, setActiveTab] = useState('details');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'details':
//         return <div className="p-4">This is the details section content.</div>;
//       case 'learners':
//         return (
//          <div>
//       <div className="p-4">
//         <div className="flex space-x-2 mb-4">
//           {activities.map((activity, index) => (
//             <button
//               key={index}
//               className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition"
//             >
//               <FontAwesomeIcon icon={activity.icon} className={activity.color} />
//               <span className="text-gray-700">{activity.name}</span>
//             </button>
//           ))}
//         </div>
//         </div>
//             <div>
//             <table className="min-w-full border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border-b">Learner Name</th>
//                   <th className="px-4 py-2 border-b">Email</th>
//                   <th className="px-4 py-2 border-b">Progress</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border-b">John Doe</td>
//                   <td className="px-4 py-2 border-b">john@example.com</td>
//                   <td className="px-4 py-2 border-b">80%</td>
//                 </tr>
//                 <tr>
//                   <td className="px-4 py-2 border-b">Jane Smith</td>
//                   <td className="px-4 py-2 border-b">jane@example.com</td>
//                   <td className="px-4 py-2 border-b">95%</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           </div>
//         );
//       case 'activity':
//         return (
//           <div className="p-4">
//             <table className="min-w-full border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border-b">Activity</th>
//                   <th className="px-4 py-2 border-b">Timestamp</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border-b">Logged In</td>
//                   <td className="px-4 py-2 border-b">2024-09-01 10:00 AM</td>
//                 </tr>
//                 <tr>
//                   <td className="px-4 py-2 border-b">Completed Quiz</td>
//                   <td className="px-4 py-2 border-b">2024-09-01 10:30 AM</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );
//       case 'notes':
//         return (
//           <div className="p-4">
//             <table className="min-w-full border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border-b">Note</th>
//                   <th className="px-4 py-2 border-b">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border-b">Note 1</td>
//                   <td className="px-4 py-2 border-b">2024-09-01</td>
//                 </tr>
//                 <tr>
//                   <td className="px-4 py-2 border-b">Note 2</td>
//                   <td className="px-4 py-2 border-b">2024-09-02</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );
//       case 'askAi':
//         return <div className="p-4">This is the Ask AI section content.</div>;
//       default:
//         return <div className="p-4">Select a tab to view content.</div>;
//     }
//   };

//   return (
//     <div className="max-w-full  mx-auto">
//        <div className="p-4">
//              <div className="p-4 border-b flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button onClick={handleBackClick} className="text-sm text-gray-600 hover:underline flex items-center space-x-2">
//               <FontAwesomeIcon icon={faAngleLeft} />
//               <span>Back</span>
//             </button>
//             <div className="flex items-center space-x-2">
//               <FontAwesomeIcon icon={faIdCard} className='text-white text-2xl bg-blue-500' />
//               <h2 className="text-lg font-semibold">{details.name}</h2>
//             </div>
//           </div>
//           <button className="flex justify-end bg-blue-700 text-white p-1 border rounded">Convert</button>
//           <div className="p-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
//             <div className="text-sm">
//               <p className="text-gray-500 font-bold">Lead Source</p>
//               <p className="flex items-center space-x-2 text-blue-500 hover:underline">{details.leadSource}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-bold">Phone</p>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faPhone} className="text-blue-500" />
//                 <a href={`tel:${details.phone}`} className="text-blue-500 hover:underline">
//                   {details.phone}
//                 </a>
//               </div>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-bold">Email</p>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
//                 <a href={`mailto:${details.email}`} className="text-blue-500 hover:underline">
//                   {details.email}
//                 </a>
//               </div>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-bold ml-20">Lead Status</p>
//               <p className="text-green-400 ml-20 border-b border-gray-300 pb-2">{details.leadStatus}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>
//       <div className="bg-white shadow-md rounded-md">
//         <div className="flex space-x-4 p-4 border-b">
//           <button
//             className={`px-4 py-2 ${
//               activeTab === 'details' ? 'border-b-2 border-blue-500' : ''
//             }`}
//             onClick={() => setActiveTab('details')}
//           >
//             Details
//           </button>
//           <button
//             className={`px-4 py-2 ${
//               activeTab === 'learners' ? 'border-b-2 border-blue-500' : ''
//             }`}
//             onClick={() => setActiveTab('learners')}
//           >
//             Learners
//           </button>
//           <button
//             className={`px-4 py-2 ${
//               activeTab === 'activity' ? 'border-b-2 border-blue-500' : ''
//             }`}
//             onClick={() => setActiveTab('activity')}
//           >
//             Activity
//           </button>
//           <button
//             className={`px-4 py-2 ${
//               activeTab === 'notes' ? 'border-b-2 border-blue-500' : ''
//             }`}
//             onClick={() => setActiveTab('notes')}
//           >
//             Notes
//           </button>
//           <button
//             className={`px-4 py-2 ${
//               activeTab === 'askAi' ? 'border-b-2 border-blue-500' : ''
//             }`}
//             onClick={() => setActiveTab('askAi')}
//           >
//             Ask AI
//           </button>
//         </div>

//         <div className="p-4">{renderContent()}</div>
//       </div>
//     </div>
//   );
// }
"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faIdCard, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function TrainerDashboard() {
  const [activeTab, setActiveTab] = useState('details');

  // Define the `details` object with sample data
  const [details, setDetails] = useState({
    name: 'Trainer Name',
    leadSource: 'Website',
    phone: '123-456-7890',
    email: 'trainer@example.com',
    leadStatus: 'Active'
  });

  const handleBackClick = () => {
    window.history.back(); // This will navigate back to the previous page
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return <div className="p-4">This is the details section content.</div>;
      case 'learners':
        return (
          <div>
            <div className="p-4">
              <div className="flex space-x-2 mb-4">
                {/* Example learners */}
                <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition">
                  <FontAwesomeIcon icon={faIdCard} className="text-blue-500" />
                  <span className="text-gray-700">Activity 1</span>
                </button>
              </div>
            </div>
            <div>
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Learner Name</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b">John Doe</td>
                    <td className="px-4 py-2 border-b">john@example.com</td>
                    <td className="px-4 py-2 border-b">80%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Jane Smith</td>
                    <td className="px-4 py-2 border-b">jane@example.com</td>
                    <td className="px-4 py-2 border-b">95%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="p-4">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Activity</th>
                  <th className="px-4 py-2 border-b">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">Logged In</td>
                  <td className="px-4 py-2 border-b">2024-09-01 10:00 AM</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Completed Quiz</td>
                  <td className="px-4 py-2 border-b">2024-09-01 10:30 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'notes':
        return (
          <div className="p-4">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Note</th>
                  <th className="px-4 py-2 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">Note 1</td>
                  <td className="px-4 py-2 border-b">2024-09-01</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Note 2</td>
                  <td className="px-4 py-2 border-b">2024-09-02</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'askAi':
        return <div className="p-4">This is the Ask AI section content.</div>;
      default:
        return <div className="p-4">Select a tab to view content.</div>;
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="p-4">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackClick}
              className="text-sm text-gray-600 hover:underline flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faIdCard} className="text-white text-2xl bg-blue-500" />
              <h2 className="text-lg font-semibold">{details.name}</h2> {/* Using `details.name` */}
            </div>
          </div>
          <button className="flex justify-end bg-blue-700 text-white p-1 border rounded">Convert</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 p-4">
          <div className="text-sm">
            <p className="text-gray-500 font-bold">Lead Source</p>
            <p className="text-blue-500 hover:underline">{details.leadSource}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold">Phone</p>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} className="text-blue-500" />
              <a href={`tel:${details.phone}`} className="text-blue-500 hover:underline">
                {details.phone}
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold">Email</p>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
              <a href={`mailto:${details.email}`} className="text-blue-500 hover:underline">
                {details.email}
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold ml-20">Lead Status</p>
            <p className="text-green-400 ml-20 border-b border-gray-300 pb-2">{details.leadStatus}</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md">
        <div className="flex space-x-4 p-4 border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'learners' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('learners')}
          >
            Learners
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'activity' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'notes' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'askAi' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('askAi')}
          >
            Ask AI
          </button>
        </div>
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
}

