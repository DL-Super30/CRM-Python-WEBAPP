"use client";

import { useState, useEffect, useCallback } from "react";
import { FaTable, FaThLarge, FaIdCard, FaAngleDown, FaAngleUp } from "react-icons/fa";
import Navbar from '@/app/components/navbar';
import LeadForm from '@/app/components/LeadForm';
import axios from 'axios';  // Added axios for API calls if you use it

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [kanbanColumns, setKanbanColumns] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [view, setView] = useState("Table");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select an option');

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const [leadCounts, setLeadCounts] = useState({
    notContacted: 0,
    attempted: 0,
    warmLead: 0,
    coldLead: 0,
    Opportunity: 0
  });

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleActionsDropdown = () => setIsActionsDropdownOpen(prev => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleCreateLead = () => setIsModalOpen(true); // Open modal

  const handleModalClose = () => setIsModalOpen(false); // Close modal

  const handleCheckboxChange = (id) => {
    setSelectedLeads((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete the selected leads?")) {
      try {
        if (selectedLeads.length === 0) {
          alert('No leads selected for deletion');
          return;
        }
        await Promise.all(
          selectedLeads.map(async (leadId) => {
            if (!leadId) {
              console.error('Invalid leadId:', leadId);
              return;
            }
            const response = await fetch(`http://127.0.0.1:8000/delete_lead/${leadId}/`, {
              method: 'DELETE'
            });
            if (!response.ok) {
              throw new Error(`Failed to delete lead with ID: ${leadId}`);
            }
          })
        );
        await fetchData();
        setSelectedLeads([]);
        alert('Leads deleted successfully');
      } catch (error) {
        console.error('Error deleting leads:', error);
        alert('Failed to delete leads. Please check console for details.');
      }
    }
  };

  const handleUpdate = () => {
    if (selectedLeads.length === 1) {
      router.push(`/leads/update-lead?id=${selectedLeads[0]}`);
    }
  };

  const statusColorMappings = {
    'Not Contacted': 'bg-gradient-to-r from-red-400 via-red-300 to-red-200',
    'Warm Lead': 'bg-gradient-to-r from-blue-400 via-red-300 to-red-200',
    'Attempted': 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200',
    'Opportunity': 'bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200',
    'Cold Lead': 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200',
  };

  const stackColorMappings = {
    'Life Skills': 'bg-gradient-to-r from-red-500 via-red-400 to-red-300',
    'Study Abroad': 'bg-gradient-to-r from-green-500 via-green-400 to-green-300',
    'HR': 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300',
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get_leads');
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
        setFilteredData(result);
        const kanbanGrouped = groupForKanban(result);
        setKanbanColumns(kanbanGrouped);
        updateLeadCounts(result);
      } else {
        console.error('Fetched data is not an array:', result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

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
      { id: '1', title: 'Not Contacted', color: 'bg-[#DCFCE7] border-t-green-300 border-t-4', leads: data.filter(lead => lead.lead_status === 'Not Contacted') },
      { id: '2', title: 'Attempted', color: 'bg-[#DBEAFE] border-t-blue-300 border-t-4', leads: data.filter(lead => lead.lead_status === 'Attempted') },
      { id: '4', title: 'Warm Lead', color: 'bg-[#E0E7FF] border-t-slate-300 border-t-4', leads: data.filter(lead => lead.lead_status === 'Warm Lead') },
      { id: '3', title: 'Opportunity', color: 'bg-[#FFEDD5] border-t-stone-300 border-t-4', leads: data.filter(lead => lead.lead_status === 'Opportunity') },
      { id: '5', title: 'Cold Lead', color: 'bg-[#E0E7FF] border-t-slate-300 border-t-4', leads: data.filter(lead => lead.lead_status === 'Cold Lead') },
    ];
  };

  const updateLeadCounts = (leads) => {
    const notContacted = leads.filter(lead => lead.lead_status === 'Not Contacted').length;
    const attempted = leads.filter(lead => lead.lead_status === 'Attempted').length;
    const warmLead = leads.filter(lead => lead.lead_status === 'Warm Lead').length;
    const coldLead = leads.filter(lead => lead.lead_status === 'Cold Lead').length;
    const Opportunity = leads.filter(lead => lead.lead_status === 'Opportunity').length;

    setLeadCounts({ notContacted, attempted, warmLead, coldLead, Opportunity });
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const toggleViewMode = (mode) => setViewMode(mode);

  

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
                  onClick={handleCreateLead}
                  className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 border border-white rounded mb-2 sm:mb-0"
                >
                  <span>Create Lead</span>
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
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4  sm:space-y-0">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search"
    value={searchTerm}
    onChange={handleSearch}
    className="border rounded-md px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
   <div className="flex space-x-2">
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
<div className="pr-24">
  {/* Status Pills with Single Border and Underline */}
  <div className=" flex border border-black rounded-md overflow-hidden">
    <span className="flex items-center justify-start px-4 py-2 border-r border-black  bg-green-200">
      Not Contacted <span className="ml-2 text-white-500 bg-red-400 px-2 border rounded-full">{leadCounts.notContacted}</span>
    </span>
    <span className="flex items-center justify-between px-4 py-2 border-r border-black bg-green-200">
      Attempted <span className="ml-2 text-white-500 bg-red-400 px-2 border rounded-full ">{leadCounts.attempted}</span>
    </span>
    <span className="flex items-center justify-between px-4 py-2 border-r border-black bg-green-200">
      Warm Lead <span className="ml-2 text-white-500 bg-red-400 px-2 border rounded-full">{leadCounts.warmLead}</span>
    </span>
    <span className="flex items-center justify-between px-2 py-2 border-r border-black bg-green-200">
      Cold Lead <span className="ml-2 text-white-500 bg-red-400 px-2 border rounded-full">{leadCounts.coldLead}</span>
    </span>
    <span className="flex items-center justify-between px-2 py-2 border-r border-black bg-green-200">
      Opportunity <span className="ml-2 text-white-500 bg-red-400 px-2 border rounded-full">{leadCounts.Opportunity}</span>
    </span>
  </div>
  </div>

  {/* Table and Kanban Toggle */}
 


            </div>
            {viewMode === 'table' ? (
              <div className="container border border-gray-300 shadow-md sm:rounded-lg">
                <div className="flex flex-col max-h-[400px]">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-200 sticky top-0 z-10">
                        <tr>
                          <th className="p-2 text-center">
                            <input
                              type="checkbox"
                              className="h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                          <th className="px-12 py-4 text-left text-xs font-bold text-gray-500 uppercase">Created At</th>
                          <th className="px-10 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stack</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lead Status</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Class Mode</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div className="overflow-y-auto flex-1">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white">
                        {Array.isArray(filteredData) && filteredData.length > 0 ? (
                          filteredData.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-100 border-b border-gray-200">
                              <td className="p-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedLeads.includes(lead.id)}
                                  onChange={() => handleCheckboxChange(lead.id)}
                                />
                              </td>
                              <td className="px-6 py-2 text-sm text-gray-900">{lead.created_at || 'N/A'}</td>
                              <td className="px-6 py-2 text-sm text-gray-900">{lead.name || 'N/A'}</td>
                              <td className="px-6 py-2 text-sm text-gray-900">{lead.phone || 'N/A'}</td>
                              <td className={`px-6 py-2 text-sm rounded-full ${stackColorMappings[lead.stack] || 'bg-white'}`}>
                                {lead.stack || 'N/A'}
                              </td>
                              <td className={`px-6 py-2 text-sm rounded-full ${statusColorMappings[lead.lead_status] || 'bg-white'}`}>
                                {lead.lead_status || 'N/A'}
                              </td>
                              <td className="px-6 py-2 text-sm text-gray-900">{lead.class_mode || 'N/A'}</td>
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

      {/* Modal for Create Lead Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <LeadForm onClose={handleModalClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
