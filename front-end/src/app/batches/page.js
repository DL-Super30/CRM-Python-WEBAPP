// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { FaTable, FaThLarge, FaIdCard, FaAngleDown, FaAngleUp } from "react-icons/fa";
// import Navbar from '@/app/components/navbar';
// import BatchesForm from '@/app/components/BatchesForm';


// const Dashboard = () => {
//   const router = useRouter();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [kanbanColumns, setKanbanColumns] = useState([]);
//   const [selectedLeads, setSelectedLeads] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('Select Option');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleModal = () => setIsModalOpen(prev => !prev);
//   const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  
//   const handleDeleteClick = async () => {
//     if (selectedLeads.length === 0) {
//       alert('No leads selected for deletion');
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete the selected leads?")) {
//       return;
//     }

//     try {
//       await Promise.all(
//         selectedLeads.map(async (leadId) => {
//           if (!leadId) {
//             console.error('Invalid leadId:', leadId);
//             return;
//           }
//           const response = await fetch(`http://127.0.0.1:8000/delete_batch/${leadId}/`, {
//             method: 'DELETE'
//           });
//           if (!response.ok) {
//             throw new Error(`Failed to delete lead with ID: ${leadId}`);
//           }
//         })
//       );
//       await fetchData();
//       setSelectedLeads([]); // Clear selected leads
//       alert('Leads deleted successfully');
//     } catch (error) {
//       console.error('Error deleting leads:', error);
//       alert('Failed to delete leads. Please check console for details.');
//     }
//   };

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/get_batches');
//       if (!response.ok) throw new Error('Failed to fetch batches');
      
//       const result = await response.json();
//       if (Array.isArray(result)) {
//         setData(result);
//         setFilteredData(result);
//         setKanbanColumns(groupForKanban(result));
//       } else {
//         console.error('Fetched data is not an array:', result);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert('Error fetching data. Please try again later.');
//     }
//   }, []);

//   const groupForKanban = (data) => {
//     return [
//       { id: '1', title: 'Upcoming', color: 'bg-[#DCFCE7] border-t-green-300 border-t-4', leads: data.filter(lead => lead.oppo_status === 'Upcoming') },
//       { id: '2', title: 'Ongoing', color: 'bg-[#DBEAFE] border-t-blue-300 border-t-4 ', leads: data.filter(lead => lead.oppo_status === 'Ongoing') },
//       { id: '3', title: 'On Hold', color: 'bg-[#FFEDD5] border-t-stone-300 border-t-4', leads: data.filter(lead => lead.oppo_status === 'On Hold') },
//       { id: '4', title: 'Completed', color: 'bg-[#E0E7FF] border-t-slate-300 border-t-4', leads: data.filter(lead => lead.oppo_status === 'Completed') },
//     ];
//   };

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     const filtered = data.filter((item) =>
//       Object.values(item).some((val) =>
//         String(val).toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//     setFilteredData(filtered);
//     setKanbanColumns(groupForKanban(filtered));
//   }, [searchTerm, data]);

//   const handleSearch = (event) => setSearchTerm(event.target.value);
//   const toggleViewMode = (mode) => setViewMode(mode);
//   const Page = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const toggleModal = () => {
//         setIsModalOpen(!isModalOpen);
//     };

//   return (
//     <div className="min-h-screen bg-white-100">
//       <Navbar />
//       <div className="mx-auto p-4">
//         <div className="border-2 rounded-xl border-gray-200 mt-4 shadow-md shadow-gray-400">
//           <div className="p-4 sm:p-8">
//             <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
//               <div className="flex items-center space-x-2 mb-4 sm:mb-0 relative">
//                 <FaIdCard className="text-white text-3xl sm:text-4xl bg-blue-500 p-2 rounded-md" />
//                 <div className="relative">
//                   <button
//                     className="text-lg sm:text-xl flex items-center space-x-1"
//                     onClick={toggleDropdown}
//                   >
//                     <span>{selectedOption}</span>
//                     {isDropdownOpen ? (
//                       <FaAngleUp className="text-gray-600 font-semibold" />
//                     ) : (
//                       <FaAngleDown className="text-gray-600 font-semibold" />
//                     )}
//                   </button>
//                   {isDropdownOpen && (
//                     <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
//                       <button
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         onClick={() => setSelectedOption('Option 1')}
//                       >
//                         Option 1
//                       </button>
//                       <button
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         onClick={() => setSelectedOption('Option 2')}
//                       >
//                         Option 2
//                       </button>
//                       <button
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         onClick={() => setSelectedOption('Option 3')}
//                       >
//                         Option 3
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-col sm:flex-row items-center space-x-2">
//               <div>
//             <button onClick={toggleModal} className="mb-2 p-2 bg-blue-500 text-white rounded">
//                 Open Modal
//             </button>

            
//         </div>
//                 <div className="relative">
//                   <button
//                     className="flex items-center justify-center space-x-2 text-black px-4 py-2 border border-black rounded"
//                   >
//                     <span>Actions</span>
//                     {isDropdownOpen ? (
//                       <FaAngleUp className="text-gray-600" />
//                     ) : (
//                       <FaAngleDown className="text-gray-600" />
//                     )}
//                   </button>
//                   {/* Dropdown for actions can be implemented here */}
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row items-center mb-4">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="border rounded-md px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
//               />
//               <div className="flex flex-col sm:flex-row items-center space-x-2">
//                 <button
//                   onClick={() => toggleViewMode("table")}
//                   className={`flex items-center px-4 py-2 rounded-md border ${viewMode === "table" ? "bg-blue-500 text-white" : "text-black"}`}
//                 >
//                   <FaTable className="mr-2" />
//                   Table
//                 </button>
//                 <button
//                   onClick={() => toggleViewMode("kanban")}
//                   className={`flex items-center px-4 py-2 rounded-md border ${viewMode === "kanban" ? "bg-blue-500 text-white" : "text-black"}`}
//                 >
//                   <FaThLarge className="mr-2" />
//                   Kanban
//                 </button>
//               </div>
//             </div>
//             {viewMode === 'table' ? (
//   <div className="overflow-hidden border border-gray-300 shadow-md sm:rounded-lg">
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-300 h-96">
//         {/* Table header */}
//         <thead className="bg-gray-100 sticky top-0">
//           <tr className="flex w-full">
//             <th className="w-16 text-center p-2 py-4">
//               <input
//                 type="checkbox"
//                 className="h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 checked={selectedLeads.length === filteredData.length}
//                 onChange={() =>
//                   setSelectedLeads(
//                     selectedLeads.length === filteredData.length
//                       ? []
//                       : filteredData.map((lead) => lead.id)
//                   )
//                 }
//               />
//             </th>
//             <th className="w-32 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Batch Name</th>
//             <th className="w-48 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Trainer</th>
//             <th className="w-48 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Batch Status</th>
//             <th className="w-32 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Stage</th>
//             <th className="w-32 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Slot</th>
//             <th className="w-64 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Stack</th>
//             <th className="w-64 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Tentative End Date</th>
//             <th className="w-64 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Timings</th>
//             <th className="w-64 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">No of Students</th>
//             <th className="w-64 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Location</th>
//           </tr>
//         </thead>

//         {/* Table body with vertical scroll */}
//         <tbody className="bg-white flex flex-col" style={{ overflowY: 'auto', maxHeight: '400px' }}>
//           {Array.isArray(filteredData) && filteredData.length > 0 ? (
//             filteredData.map((lead) => (
//               <tr key={lead.id} className="flex w-full hover:bg-gray-50 border-b border-gray-200">
//                 <td className="w-16 text-center p-4">
//                   <input
//                     type="checkbox"
//                     checked={selectedLeads.includes(lead.id)}
//                     onChange={() => handleCheckboxChange(lead.id)}
//                   />
//                 </td>
//                 <td className="w-32 py-1 text-center text-sm text-gray-800">{lead.batch_name || 'N/A'}</td>
//                 <td className="w-48 px-2 ml-4 py-4 text-center text-sm rounded-full">{lead.trainer || 'N/A'}</td>
//                 <td className="w-40 py-1 text-center text-sm text-gray-800">{lead.batch_status || 'N/A'}</td>
//                 <td className="w-32 px-2 py-1 text-center text-sm text-gray-800">{lead.stage || 'N/A'}</td>
//                 <td className="w-48 py-4 text-center text-sm rounded-full">{lead.slot || 'N/A'}</td>
//                 <td className="w-48 px-2 py-1 text-center text-sm text-gray-800">{lead.stack || 'N/A'}</td>
//                 <td className="w-48 px-2 py-1 text-center text-sm text-gray-800">{lead.tentative_end_date || 'N/A'}</td>
//                 <td className="w-48 px-2 py-1 text-center text-sm text-gray-800">{lead.timings || 'N/A'}</td>
//                 <td className="w-48 px-2 py-1 text-center text-sm text-gray-800">{lead.no_of_students || 'N/A'}</td>
//                 <td className="w-48 px-2 py-1 text-center text-sm text-gray-800">{lead.location || 'N/A'}</td>
//               </tr>
//             ))
//           ) : (
//             <tr className="flex w-full justify-start" style={{ height: '100%' }}>
//               <td colSpan="7" className="px-4 py-2 text-center text-sm text-gray-500 pt-22">
//                 Batches data not found
//               </td>
//             </tr>
//           )}
//         </tbody>

//         {/* Table footer with pagination */}
//         <tfoot>
//           <tr className="flex w-full justify-between items-center px-4 py-2 bg-gray-100">
//             <td className="text-sm text-gray-600">0 to 0 of 0</td>
//             <td className="flex space-x-2">
//               <button className="text-sm text-gray-600">|&lt;</button>
//               <button className="text-sm text-gray-600">&lt;</button>
//               <span className="text-sm text-gray-600">Page 0 of 0</span>
//               <button className="text-sm text-gray-600">&gt;</button>
//               <button className="text-sm text-gray-600">&gt;|</button>
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   </div>





//             ) : viewMode === 'kanban' ? (
//               <div className="flex space-x-2 overflow-x-auto">
//                 {kanbanColumns.map((column) => (
//                   <div key={column.id} style={{ width: '300px', minWidth: '300px' }}> {/* Fixed width without min-width */}

//                     {/* Header Section */}
//                     <div className={`p-4 rounded-t-xl ${column.color}`}>
//                       <h2 className="text-sm sm:text-xl font-semibold">{column.title}</h2>
//                       <div className="text-sm font-normal">
//                         <p className="mt-2">₹{column.total_value || '0.00'}</p>
//                         <p>{column.leads.length} Leads</p>
//                       </div>
//                     </div>

//                     {/* Leads Data Section */}
//                     <div className="pt-2">
//                       <div className="bg-gray-200 h-[63vh] px-0.5 max-w-full overflow-y-auto rounded">
//                         {column.leads.length > 0 ? (
//                           <div className="flex flex-col space-y-4 w-full">
//                             {column.leads.map((lead) => (
//                               <div key={lead.id} className="p-4 bg-white border rounded-md shadow-sm w-full">
//                                 <p><strong>Batch Name:</strong> {lead.batch_name || 'N/A'}</p>
//                                 <p><strong>Trainer:</strong> {lead.trainer|| 'N/A'}</p>
//                                 <p><strong>Batch Status:</strong> {lead.batch_status || 'N/A'}</p>
//                                 <p><strong>Stage:</strong> {lead.stage || 'N/A'}</p>
//                                 <p><strong>Slot:</strong> {lead.slot || 'N/A'}</p>
//                                 <p><strong>Stack:</strong> {lead.stack || 'N/A'}</p>
//                                 <p><strong>Stack:</strong> {lead.start_date || 'N/A'}</p>
//                                 <p><strong>Stack:</strong> {lead.tentative_end_date || 'N/A'}</p>
//                                 <p><strong>Stack:</strong> {lead.timings || 'N/A'}</p>
//                                 <p><strong>Stack:</strong> {lead.no_of_students|| 'N/A'}</p>
//                                 <p><strong>Stack:</strong> {lead.location || 'N/A'}</p>

//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <p className="text-black-500 p-4 text-bold">No data found.</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>
  

//       </div>
//       {isModalOpen && <BatchesForm toggleModal={toggleModal} />}
//     </div>


// export default Dashboard;