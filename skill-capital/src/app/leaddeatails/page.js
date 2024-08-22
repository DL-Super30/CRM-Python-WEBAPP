// "use client"
// import React, { useState } from 'react';
// import Navbar from '../components/navabar';
// export default function Lead() {
//   const [showForm, setShowForm] = useState(false);
  
//   const data = [
//     {
//       createdOn: '16-08-24',
//       leadStatus: 'cold lead',
//       name: 'Anil Kumar',
//       phone: '95504515130',
//       stack: 'lifeSkills',
//       class: 'BLR Class Room'
//     },
//     {
//       createdOn: '17-08-24',
//       leadStatus: 'cold lead',
//       name: 'Anil Kumar',
//       phone: '9587451263',
//       stack: 'FullStack-Python',
//       class: 'Online'
//     },
//     {
//       createdOn: '18-08-24',
//       leadStatus: 'cold lead',
//       name: 'Anil Kumar',
//       phone: '95504515130',
//       stack: 'lifeSkills',
//       class: 'BLR Class Room'
//     },
//   ];
//   const handleCreateLeadClick = () => {
//     setShowForm(!showForm);
//   };
//   const handleCloseFormClick = () => {
//     setShowForm(false);
//   };
  
//   return (

//     <main>
//        <Navbar/>
          
//       <div className="container-lg border shadow-lg mt-5 p-5">
//         <div className="flex flex-col lg:flex-row lg:justify-between">
//           <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4 lg:mb-0">
//             <button className="text-2xl">456</button>
//             <select className="text-2xl text-blue-400 border rounded">
//               <option value="" className="text-lg text-black">All Leads</option>
//               <option value="hari" className="text-lg text-black">Hari</option>
//               <option value="Krishna" className="text-lg text-black">Krishna</option>
//               <option value="Jayanth" className="text-lg text-black">Jayanth</option>
//             </select>
//           </div>
//           <div className="flex flex-col lg:flex-row gap-2">
//             <button
//               className="hover:bg-blue-500 hover:text-white border rounded p-2"
//               onClick={handleCreateLeadClick}
//             >
//               Create Lead
//             </button>
           
//             <select className="lg:hover:bg-blue-500 lg:hover:text-white rounded p-1">
//               <option>Create Lead</option>
//               <option>Create Lead</option>
//             </select>
//           </div>
//         </div>
//         {/* Conditionally Render Form */}
//         {showForm && (
//           <div className="mt-5 p-5 border rounded bg-white shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">Create New Lead</h2>
//             <form className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Name</label>
//                   <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Lead Status</label>
//                   <select
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                   >
//                     <option value="" disabled selected></option>
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">CC</label>
//                   <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">leadSource</label>
//                   <select
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                   >
//                     <option value="" disabled selected></option>
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Phone</label>
//                   <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Stack</label>
//                   <select
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                   >
//                     <option value="" disabled selected></option>
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Email</label>
//                   <input type="email" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Course</label>
//                   <select
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                   >
//                     <option value="" disabled selected></option>
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Fee Quoted</label>
//                   <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Class Mode</label>
//                   <select
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                   >
//                     <option value="" disabled selected></option>
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Batch Timing</label>
//                   <input type="text" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Next nextFollowUp</label>
//                   <input type="date" className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">description</label>
//                   <textarea className=" block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" rows="1"></textarea>
//                 </div>
//               </div>
//               <div className="flex  gap-4 mt-4">
//                 <button type="button" className=" text-black px-8 py-1 border border-sky-500 rounded-full hover:bg-blue-600 hover:text-white">Create</button>
//                 <button type="button" className=" text-black px-8 py-1  border border-sky-500 rounded-full hover:bg-blue-600 hover:text-white">Cancel</button>
//                 <button type="button" className=" text-black px-8 py-1  border border-red-500 rounded-full hover:bg-red-600 hover:text-white"onClick={handleCloseFormClick} >Close</button>
//               </div>
//             </form>
//           </div>
//         )}
//         <div className="overflow-x-auto pt-5">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-400">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                   <input type="checkbox" /> Created on
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Lead Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Stack</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Class Mode</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((dataAt, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <input type="checkbox" /> {dataAt.createdOn}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{dataAt.leadStatus}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{dataAt.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{dataAt.phone}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-orange-500 text-black">{dataAt.stack}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-rose-500 text-black">{dataAt.class}</span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navabar';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/leads/'); // Replace with your API endpoint
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Leads</h1>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Lead</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Actions</button>
          </div>
        </div>
        <div className="bg-white shadow rounded-md">
          <div className="flex space-x-2 p-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Not Contacted</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Attempted</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">Warm Lead</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded">Cold Lead</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">Created on</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Lead Status</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Phone</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Stack</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Course</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : leads.length > 0 ? (
                  leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 text-sm text-gray-700">{lead.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{lead.lead_status}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{lead.contact_no}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{lead.tech_stack}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{lead.courses}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Leads data not found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leads;

