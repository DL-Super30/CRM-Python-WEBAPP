
// "use client";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Navbar from '@/app/components/navbar';
// import { 
//   faTasks, 
//   faCalendar, 
//   faEnvelope, 
//   faPhone, 
//   faMessage, 
//   faSlack,
//   faPlus,
//   faAngleLeft,
//   faIdCard
// } from '@fortawesome/free-solid-svg-icons';
// import { faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons'; 
// import { useRouter } from 'next/navigation';

// const activities = [
//   { name: 'New Task', icon: faTasks, color: 'text-pink-500' },
//   { name: 'Meeting', icon: faCalendar, color: 'text-yellow-500' }, 
//   { name: 'Email', icon: faEnvelope, color: 'text-green-500' }, 
//   { name: 'Log Call', icon: faPhone, color: 'text-blue-500' },
//   { name: 'WhatsApp', icon: faSquareWhatsapp, color: 'text-green-600' }, 
//   { name: 'Message', icon: faMessage, color: 'text-blue-300' }, 
//   { name: 'Slack', icon: faSlack, color: 'text-indigo-500' }, 
// ];

// export default function ActivityPanel() {
//   const router = useRouter();
  
//   const handleBackClick = () => {
//     router.back(); 
//   };
  
//   const details = {
//     name: "John Doe",
//     leadSource: "Website",
//     phone: "+1234567890",
//     email: "johndoe@example.com",
//     leadStatus: "Attempted"
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//      <header className="sticky top-0 left-0 w-full"> 
//          <div className="pb-4">
//          <Navbar />
//       </div>
//         </header>
//       <div className="w-full bg-white shadow-xl rounded-lg">
//         {/* Header */}
//         <div className="p-4 border-b flex items-center justify-between">
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
//         </div>

//         {/* Contact Details */}
//         <div className="p-4">
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
//         <div className="p-6">
//           <button className="mr-6 flex items-center justify-center bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition">
//             <FontAwesomeIcon icon={faPlus} />
//             New Task
//           </button>
//         </div>
//         <div className="bg-gray-200 border border-black rounded-md p-2">
//           <div className="grid grid-cols-4 gap-4 mt-2 text-sm font-medium text-gray-700">
//             <div>Subject</div>
//             <div>Due Date</div>
//             <div>Priority</div>
//             <div>Owner</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '@/app/components/navbar';
import { 
  faTasks, 
  faCalendar, 
  faEnvelope, 
  faPhone, 
  faMessage, 
  faPlus,
  faAngleLeft,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';
import { faSlack, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons'; 
import { useRouter } from 'next/navigation';

const activities = [
  { name: 'New Task', icon: faTasks, color: 'text-pink-500' },
  { name: 'Meeting', icon: faCalendar, color: 'text-yellow-500' }, 
  { name: 'Email', icon: faEnvelope, color: 'text-green-500' }, 
  { name: 'Log Call', icon: faPhone, color: 'text-blue-500' },
  { name: 'WhatsApp', icon: faSquareWhatsapp, color: 'text-green-600' }, 
  { name: 'Message', icon: faMessage, color: 'text-blue-300' }, 
  { name: 'Slack', icon: faSlack, color: 'text-indigo-500' }, 
];

export default function ActivityPanel() {
  const router = useRouter();
  
  const handleBackClick = () => {
    router.back(); 
  };
  
  const details = {
    name: "John Doe",
    leadSource: "Website",
    phone: "+1234567890",
    email: "johndoe@example.com",
    leadStatus: "Attempted"
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
     <header className="sticky top-0 left-0 w-full"> 
         <div className="pb-4">
         <Navbar />
      </div>
        </header>
      <div className="w-full bg-white shadow-xl rounded-lg">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handleBackClick} className="text-sm text-gray-600 hover:underline flex items-center space-x-2">
              <FontAwesomeIcon icon={faAngleLeft} />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faIdCard} className='text-white text-2xl bg-blue-500' />
              <h2 className="text-lg font-semibold">{details.name}</h2>
            </div>
          </div>
          <button className="flex justify-end bg-blue-700 text-white p-1 border rounded">Convert</button>
        </div>

        {/* Contact Details */}
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
            <div className="text-sm">
              <p className="text-gray-500 font-bold">Lead Source</p>
              <p className="flex items-center space-x-2 text-blue-500 hover:underline">{details.leadSource}</p>
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
      </div>
      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          {activities.map((activity, index) => (
            <button
              key={index}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition"
            >
              <FontAwesomeIcon icon={activity.icon} className={activity.color} />
              <span className="text-gray-700">{activity.name}</span>
            </button>
          ))}
        </div>
        <div className="p-6">
          <button className="mr-6 flex items-center justify-center bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition">
            <FontAwesomeIcon icon={faPlus} />
            New Task
          </button>
        </div>
        <div className="bg-gray-200 border border-black rounded-md p-2">
          <div className="grid grid-cols-4 gap-4 mt-2 text-sm font-medium text-gray-700">
            <div>Subject</div>
            <div>Due Date</div>
            <div>Priority</div>
            <div>Owner</div>
          </div>
        </div>
      </div>
    </div>
  );
}

