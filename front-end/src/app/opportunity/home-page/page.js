// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { FaTable, FaThLarge, FaIdCard, FaAngleDown, FaAngleUp } from "react-icons/fa";
// import OpportunityForm from '@/app/components/OpportunityForm';
// import Navbar from '@/app/components/navbar';

// const Dashboard = () => {
//   const router = useRouter();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [kanbanColumns, setKanbanColumns] = useState([]);
//   const [selectedLeads, setSelectedLeads] = useState([]);

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('Created Opportunities');

//   const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
//   const toggleActionsDropdown = () => setIsActionsDropdownOpen(prev => !prev);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setIsDropdownOpen(false);
//   };

//   const handleCreateOpportunity = () => router.push('/opportunity/create-opportunity');
//   const handleCheckboxChange = (id) => {
//     setSelectedLeads((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const handleDeleteClick = async () => {
//     if (window.confirm("Are you sure you want to delete the selected leads?")) {
//       try {
//         if (selectedLeads.length === 0) {
//           alert('No Opportunity selected for deletion');
//           return;
//         }
//         await Promise.all(
//           selectedLeads.map(async (leadId) => {
//             if (!leadId) {
//               console.error('Invalid OpportunityId:', leadId);
//               return;
//             }
//             const response = await fetch(`http://127.0.0.1:8000/deleteopportunity/${leadId}/`, {
//               method: 'DELETE'
//             });
//             if (!response.ok) {
//               throw new Error(`Failed to delete lead with ID: ${leadId}`);
//             }
//           })
//         );
//         await fetchData();
//         setSelectedLeads([]);
//         alert('Leads deleted successfully');
//       } catch (error) {
//         console.error('Error deleting leads:', error);
//         alert('Failed to delete leads. Please check console for details.');
//       }
//     }
//   };
//   const handleUpdate = () => {
//     if (selectedLeads.length === 1) {
//       router.push(`/leads/update-lead?id=${selectedLeads[0]}`);
//     }
//   };
//   const statusColorMappings = {
//     'visited': 'bg-gradient-to-r from-pink-400 via-red-300 to-red-200',
//     'visiting': 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200',
//     'demo attended': 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200',
//     'lost opportunity': 'bg-gradient-to-r from-green-400 via-green-300 to-green-200'
//   };

//   const stackColorMappings = {
//     'Life Skills': 'bg-gradient-to-r from-red-500 via-red-400 to-red-300',
//     'Study Abroad': 'bg-gradient-to-r from-green-500 via-green-400 to-green-300',
//     'HR': 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300',
//   };


//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/getOpportunities');
//       const result = await response.json();
//       if (Array.isArray(result)) {
//         setData(result);
//         setFilteredData(result);
//         const kanbanGrouped = groupForKanban(result);
//         setKanbanColumns(kanbanGrouped);
//       } else {
//         console.error('Fetched data is not an array:', result);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, []);

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
//     const kanbanGrouped = groupForKanban(filtered);
//     setKanbanColumns(kanbanGrouped);
//   }, [searchTerm, data]);

//   const groupForKanban = (data) => {
//     return [
//       { id: '1', title: 'Visiting', color: 'bg-[#FFCCCC]', leads: data.filter(lead => lead.oppo_status === 'Visiting') },
//       { id: '2', title: 'Visited', color: 'bg-[#FFFF99]', leads: data.filter(lead => lead.oppo_status === 'Visited') },
//       { id: '3', title: 'Demo Attended', color: 'bg-[#CCFFCC]', leads: data.filter(lead => lead.oppo_status === 'Demo Attended') },
//       { id: '4', title: 'Lost Opportunitty', color: 'bg-[#CCCCFF]', leads: data.filter(lead => lead.oppo_status === 'Lost Opportunitty') },
//     ];
//   };

//   const handleSearch = (event) => setSearchTerm(event.target.value);

//   const toggleViewMode = (mode) => setViewMode(mode);

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
//                         onClick={() => handleOptionClick('Option 1')}
//                       >
//                         Option 1
//                       </button>
//                       <button
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         onClick={() => handleOptionClick('Option 2')}
//                       >
//                         Option 2
//                       </button>
//                       <button
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         onClick={() => handleOptionClick('Option 3')}
//                       >
//                         Option 3
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-col sm:flex-row items-center space-x-2">
//                 <button
//                   onClick={handleCreateOpportunity}
//                   className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 border border-white rounded mb-2 sm:mb-0"
//                 >
//                   <span>Create Opportunity</span>
//                 </button>
//                 <div className="relative">
//                   <button
//                     onClick={toggleActionsDropdown}
//                     className="flex items-center justify-center space-x-2 text-black px-4 py-2 border border-black rounded"
//                   >
//                     <span>Actions</span>
//                     {isActionsDropdownOpen ? (
//                       <FaAngleUp className="text-gray-600" />
//                     ) : (
//                       <FaAngleDown className="text-gray-600" />
//                     )}
//                   </button>
//                   {isActionsDropdownOpen && (
//                     <div className="absolute bg-white border border-gray-200 shadow-lg rounded mt-2 right-0 z-10">
//                       <button
//                         onClick={handleDeleteClick}
//                         className="block w-full text-left px-8 py-2 text-red-500 hover:bg-gray-100"
//                         disabled={selectedLeads.length === 0}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={handleUpdate}
//                         className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
//                         disabled={selectedLeads.length !== 1}
//                       >
//                         Update
//                       </button>
//                     </div>
//                   )}
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
//     <table className="w-full divide-y divide-gray-300">
//       {/* Table header */}
//       <thead className="bg-gray-100 sticky top-0 z-10">
//         <tr className="flex w-full">
//           <th className="w-16 text-center p-2 py-4">
//             <input
//               type="checkbox"
//               className="h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               checked={selectedLeads.length === filteredData.length}
//               onChange={() =>
//                 setSelectedLeads(
//                   selectedLeads.length === filteredData.length
//                     ? []
//                     : filteredData.map((lead) => lead.id)
//                 )
//               }
//             />
//           </th>
//           <th className="w-32 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">
//             Created on
//           </th>
//           <th className="w-48 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">
//             Opportunity Status
//           </th>
//           <th className="w-48 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">
//             Name
//           </th>
//           <th className="w-32 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">
//             Phone
//           </th>
//           <th className="w-32 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">
//             Stack
//           </th>
//           <th className="w-64 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">
//             Course
//           </th>
//         </tr>
//       </thead>
//     </table>

//     {/* Scrollable table body */}
//     <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//       <table className="w-full divide-y divide-gray-300">
//         <tbody className="bg-white">
//           {Array.isArray(filteredData) && filteredData.length > 0 ? (
//             filteredData.map((lead) => (
//               <tr
//                 key={lead.id}
//                 className="flex w-full hover:bg-gray-50 border-b border-gray-200"
//               >
//                 <td className="w-16 text-center p-4">
//                   <input
//                     type="checkbox"
//                     checked={selectedLeads.includes(lead.id)}
//                     onChange={() => handleCheckboxChange(lead.id)}
//                   />
//                 </td>
//                 <td className="w-32 py-1 text-center text-sm text-gray-800">
//                   {lead.created_at || 'N/A'}
//                 </td>
//                 <td className={`w-48 px-2 ml-4 py-4 text-center text-sm rounded-full ${statusColorMappings[lead.oppo_status.toLowerCase()] || 'bg-gray-200'}`}>
//                   {lead.oppo_status || 'N/A'}
//                 </td>
//                 <td className="w-40 py-1 text-center text-sm text-gray-800">
//                   {lead.name || 'N/A'}
//                 </td>
//                 <td className="w-32 px-2 py-1 text-center text-sm text-gray-800">
//                   {lead.phone || 'N/A'}
//                 </td>
//                 <td className={`w-48 py-4 text-center text-sm rounded-full ${stackColorMappings[lead.stack] || 'bg-gray-200'}`}>
//                   {lead.stack || 'N/A'}
//                 </td>
//                 <td className="w-48 px-2 py-1 text-center text-sm text-gray-800">
//                   {lead.class_mode || 'N/A'}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr className="flex w-full justify-center" style={{ height: '100%' }}>
//               <td colSpan="7" className="px-4 py-2 text-center text-sm text-gray-500">
//                 Opportunity data not found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>

//     {/* Table footer with pagination */}
//     <table className="w-full divide-y divide-gray-300">
//       <tfoot>
//         <tr className="flex w-full justify-between items-center px-4 py-2 bg-gray-100">
//           <td className="text-sm text-gray-600">0 to 0 of 0</td>
//           <td className="flex space-x-2">
//             <button className="text-sm text-gray-600">|&lt;</button>
//             <button className="text-sm text-gray-600">&lt;</button>
//             <span className="text-sm text-gray-600">Page 0 of 0</span>
//             <button className="text-sm text-gray-600">&gt;</button>
//             <button className="text-sm text-gray-600">&gt;|</button>
//           </td>
//         </tr>
//       </tfoot>
//     </table>
//   </div>
// ) : null}

// </div>
// </div>
// </div>

// {viewMode === 'kanban' ? (
//   <div className="flex space-x-2 overflow-x-auto">
//     {kanbanColumns.map((column) => (
//       <div key={column.id} style={{ width: '300px', minWidth: '300px' }}>
//         {/* Header Section */}
//         <div className={`p-4 rounded-t-xl ${column.color}`}>
//           <h2 className="text-sm sm:text-xl font-semibold">{column.title}</h2>
//           <div className="text-sm font-normal">
//             <p className="mt-2">₹{column.total_value || '0.00'}</p>
//             <p>{column.leads.length} Leads</p>
//           </div>
//         </div>

//         {/* Leads Data Section */}
//         <div className="pt-2">
//           <div className="bg-gray-200 h-[63vh] px-0.5 max-w-full overflow-y-auto rounded">
//             {column.leads.length > 0 ? (
//               <div className="flex flex-col space-y-4 w-full">
//                 {column.leads.map((lead) => (
//                   <div key={lead.id} className="p-4 bg-white border rounded-md shadow-sm w-full">
//                     <p><strong>Name:</strong> {lead.name || 'N/A'}</p>
//                     <p><strong>Phone:</strong> {lead.phone || 'N/A'}</p>
//                     <p><strong>Created At:</strong> {lead.created_at || 'N/A'}</p>
//                     <p><strong>Stack:</strong> {lead.stack || 'N/A'}</p>
//                     <p><strong>Class Mode:</strong> {lead.class_mode || 'N/A'}</p>
//                     <p><strong>Status:</strong> {lead.opportunity_status || 'N/A'}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-black-500 p-4 text-bold">No data found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// ) : null}
// </div>
// {isModalOpen && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//       <LeadForm onClose={handleModalClose} />
//     </div>
//   </div>
// )}
// </div>
  
//   );
// };

// export default Dashboard;


"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaTable, FaThLarge, FaIdCard, FaAngleDown, FaAngleUp } from "react-icons/fa";
import OpportunityForm from '@/app/components/OpportunityForm';
import Navbar from '@/app/components/navbar';

const Dashboard = () => {
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [kanbanColumns, setKanbanColumns] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Option"); // Initialize here
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);
   const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
   const toggleActionsDropdown = () => setIsActionsDropdownOpen(prev => !prev);
   const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
      };
    
  const handleCreateOpportunity = () => {
    toggleModal();
  };

  const handleCheckboxChange = (id) => {
    setSelectedLeads((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/getOpportunities');
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
        setFilteredData(result);
        const kanbanGrouped = groupForKanban(result);
        setKanbanColumns(kanbanGrouped);
      } else {
        console.error('Fetched data is not an array:', result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);


  const statusColorMappings = {
    'visited': 'bg-gradient-to-r from-pink-400 via-red-300 to-red-200',
    'visiting': 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200',
    'demo attended': 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200',
    'lost opportunity': 'bg-gradient-to-r from-green-400 via-blue-300 to-blue-200',

  };

  const stackColorMappings = {
    'Life Skills': 'bg-gradient-to-r from-red-500 via-red-400 to-red-300',
    'Study Abroad': 'bg-gradient-to-r from-green-500 via-green-400 to-green-300',
    'HR': 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300',
  };
    

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
    const kanbanGrouped = groupForKanban(filtered);
    setKanbanColumns(kanbanGrouped);
  }, [searchTerm, data]);

  const groupForKanban = (data) => {
    return [
      { id: '1', title: 'Visiting', color: 'bg-[#FFCCCC]', leads: data.filter(lead => lead.oppo_status === 'Visiting') },
      { id: '2', title: 'Visited', color: 'bg-[#FFFF99]', leads: data.filter(lead => lead.oppo_status === 'Visited') },
      { id: '3', title: 'Demo Attended', color: 'bg-[#CCFFCC]', leads: data.filter(lead => lead.oppo_status === 'Demo Attended') },
      { id: '4', title: 'Lost Opportunitty', color: 'bg-[#CCCCFF]', leads: data.filter(lead => lead.oppo_status === 'Lost Opportunitty') },
    ]
  };


  const handleSearch = (event) => setSearchTerm(event.target.value);

  return (
    <div className="min-h-screen bg-white-100">
           <Navbar />
           <div className="mx-auto p-4">
             <div className="border-2 rounded-xl border-gray-200 mt-4 shadow-md shadow-gray-400">
             <div className="p-4 sm:p-8">
               <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                 <div className="flex items-center space-x-2 mb-4 sm:mb-0 relative">
                   <FaIdCard className="text-white text-3xl sm:text-4xl bg-blue-500 p-2 rounded-md" />
                    <div className="relative">
                  <button
                        className="text-lg sm:text-xl flex items-center space-x-1"
                        onClick={toggleDropdown}
                      >
                        <span>{selectedOption}</span>
                        {isDropdownOpen ? (
                          <FaAngleUp className="text-gray-600 font-semibold" />
                        ) : (
                          <FaAngleDown className="text-gray-600 font-semibold" />
                        )}
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                          <button
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleOptionClick('Option 1')}
                          >
                            Option 1
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleOptionClick('Option 2')}
                          >
                            Option 2
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleOptionClick('Option 3')}
                          >
                            Option 3
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-x-2">
                    <button
                      onClick={handleCreateOpportunity}
                      className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 border border-white rounded mb-2 sm:mb-0"
                    >
                      <span>Create Opportunity</span>
                    </button>
                    <div className="relative">
                      <button
                        onClick={toggleActionsDropdown}
                        className="flex items-center justify-center space-x-2 text-black px-4 py-2 border border-black rounded"
                      >
                        <span>Actions</span>
                        {isActionsDropdownOpen ? (
                          <FaAngleUp className="text-gray-600" />
                        ) : (
                          <FaAngleDown className="text-gray-600" />
                        )}
                      </button>
                      {isActionsDropdownOpen && (
                        <div className="absolute bg-white border border-gray-200 shadow-lg rounded mt-2 right-0 z-10">
                          <button
                            onClick={handleDeleteClick}
                            className="block w-full text-left px-8 py-2 text-red-500 hover:bg-gray-100"
                            disabled={selectedLeads.length === 0}
                          >
                            Delete
                          </button>
                          <button
                            onClick={handleUpdate}
                            className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                            disabled={selectedLeads.length !== 1}
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border rounded-md px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
                  />
                  <div className="flex flex-col sm:flex-row items-center space-x-2">
                    <button
                      onClick={() => toggleViewMode("table")}
                      className={`flex items-center px-4 py-2 rounded-md border ${viewMode === "table" ? "bg-blue-500 text-white" : "text-black"}`}
                    >
                      <FaTable className="mr-2" />
                      Table
                    </button>
                    <button
                      onClick={() => toggleViewMode("kanban")}
                      className={`flex items-center px-4 py-2 rounded-md border ${viewMode === "kanban" ? "bg-blue-500 text-white" : "text-black"}`}
                    >
                      <FaThLarge className="mr-2" />
                      Kanban
                    </button>
                  </div>
                </div>
                {viewMode === 'table' ? (
  <div className="container border border-gray-300 shadow-md sm:rounded-lg">
    <div className="flex flex-col ">
      <div className="overflow-x-auto ">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="w-12 p-4 text-center ">
                <input
                  type="checkbox"
                  className="h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={selectedLeads.length === filteredData.length}
                  onChange={() =>
                    setSelectedLeads(
                      selectedLeads.length === filteredData.length
                        ? []
                        : filteredData.map((lead) => lead.id)
                    )
                  }
                />
              </th>
              <th className="w-40 px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Created On</th>
              <th className="w-40 px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase ">Opportunity Status</th>
              <th className="w-40 px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="w-32 px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="w-32 px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stack</th>
              <th className="w-32 px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Course</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="overflow-y-auto flex-1 max-h-[400px]">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <tbody className="bg-white">
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-100 border-b border-gray-200">
                  <td className="w-12 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleCheckboxChange(lead.id)}
                    />
                  </td>
                  <td className="w-24 px-4 py-2 text-sm text-gray-900">{lead.created_at || 'N/A'}</td>
                  <td className={`w-40 px-4 py-2 text-sm text-left rounded-full ${statusColorMappings[lead.oppo_status?.toLowerCase()] || 'bg-white'}`}>
                    {lead.oppo_status || 'N/A'}
                  </td>
                  <td className="w-40 px-4 py-2 text-sm text-gray-900">{lead.name || 'N/A'}</td>
                  <td className="w-32 px-4 py-2 text-sm text-gray-900">{lead.phone || 'N/A'}</td>
                  <td className={`w-32 px-4 py-2 text-sm rounded-full ${stackColorMappings[lead.stack] || 'bg-white'}`}>
                    {lead.stack || 'N/A'}
                  </td>
                  <td className="w-32 px-4 py-2 text-sm text-gray-900">{lead.course || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-sm text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>





            ) : viewMode === 'kanban' ? (
              <div className="flex space-x-2 overflow-x-auto">
                {kanbanColumns.map((column) => (
                  <div key={column.id} style={{ width: '300px', minWidth: '300px' }}> {/* Fixed width without min-width */}

                    {/* Header Section */}
                    <div className={`p-4 rounded-t-xl ${column.color}`}>
                      <h2 className="text-sm sm:text-xl font-semibold">{column.title}</h2>
                      <div className="text-sm font-normal">
                        <p className="mt-2">₹{column.total_value || '0.00'}</p>
                        <p>{column.leads.length} Leads</p>
                      </div>
                    </div>

                    {/* Leads Data Section */}
                    <div className="pt-2">
                      <div className="bg-gray-200 h-[63vh] px-0.5 max-w-full overflow-y-auto rounded">
                        {column.leads.length > 0 ? (
                          <div className="flex flex-col space-y-4 w-full">
                            {column.leads.map((lead) => (
                              <div key={lead.id} className="p-4 bg-white border rounded-md shadow-sm w-full">
                                <p><strong>Name:</strong> {lead.name || 'N/A'}</p>
                                <p><strong>Phone:</strong> {lead.phone || 'N/A'}</p>
                                <p><strong>Created At:</strong> {lead.created_at || 'N/A'}</p>
                                <p><strong>Stack:</strong> {lead.stack || 'N/A'}</p>
                                <p><strong>Class Mode:</strong> {lead.class_mode || 'N/A'}</p>
                                <p><strong>Status:</strong> {lead.opportunity_status || 'N/A'}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-black-500 p-4 text-bold">No data found.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
  
      {/* Modal for Opportunity Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <OpportunityForm onClose={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
