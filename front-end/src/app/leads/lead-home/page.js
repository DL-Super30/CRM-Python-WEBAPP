
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaTable, FaThLarge, FaIdCard, FaAngleDown } from "react-icons/fa";
import Navbar from '@/app/components/navbar';

const Dashboard = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [kanbanColumns, setKanbanColumns] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);

  const statusColorMappings = {
    'Not Contacted': 'bg-gradient-to-r from-red-400 via-red-300 to-red-200',
    'Attempted': 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200',
    'Opportunity': 'bg-gradient-to-r from-green-400 via-green-300 to-green-200',
    'Cold Lead': 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200',
  };

  const stackColorMappings = {
    'Life Skills': 'bg-gradient-to-r from-red-500 via-red-400 to-red-300',
    'Study Abroad': 'bg-gradient-to-r from-green-500 via-green-400 to-green-300',
    'HR': 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300',
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://107.23.3.162:8000/getleads');
      const result = await response.json();
      console.log('Fetched data:', result);

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
      { id: '1', title: 'Not Contacted', color: 'bg-[#FFCCCC]', leads: data.filter(lead => lead.lead_status === 'Not Contacted') },
      { id: '2', title: 'Attempted', color: 'bg-[#FFFF99]', leads: data.filter(lead => lead.lead_status === 'Attempted') },
      { id: '3', title: 'Opportunity', color: 'bg-[#CCFFCC]', leads: data.filter(lead => lead.lead_status === 'Opportunity') },
      { id: '4', title: 'Cold Lead', color: 'bg-[#CCCCFF]', leads: data.filter(lead => lead.lead_status === 'Cold Lead') },
    ];
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleCreateLead = () => {
    router.push('/leads/create-lead');
  };

  const handleCheckboxChange = (leadId) => {
    setSelectedLeads((prevSelected) =>
      prevSelected.includes(leadId)
        ? prevSelected.filter((id) => id !== leadId)
        : [...prevSelected, leadId]
    );
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedLeads.map((leadId) =>
          fetch(`http://107.23.3.162:8000/deleteleads/${leadId}`, {
            method: 'DELETE',
          })
        )
      );
      fetchData();
      setSelectedLeads([]);
    } catch (error) {
      console.error("Error deleting leads:", error);
    }
  };

  const handleUpdate = (leadId) => {
    router.push(`/leads/update-lead?lead_id=${leadId}`);
  };

  return (
    <div className="">
      <Navbar />
      <div className="bg-white-100 min-h-screen">
        <div className="border-2 rounded-xl border-gray-200 mt-4 ml-2 mr-2 shadow-md shadow-gray-400">
          <div className="p-8">
            <div className="flex items-center justify-between mb-4 p-4">
              <div className="flex items-center space-x-2">
                <FaIdCard className="text-white text-4xl bg-blue-500 p-2 rounded-md" />
                <button className="text-xl flex items-center space-x-1">
                  <span>All Leads</span>
                  <FaAngleDown className="text-gray-600 font-semibold" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCreateLead}
                  className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 border border-white rounded"
                >
                  <span>Create Lead</span>
                  <FaAngleDown className="text-gray-600" />
                </button>
                <button className="flex items-center justify-center space-x-1 bg-gray-100 px-2 border border-black rounded">
                  <span>Actions</span>
                  <FaAngleDown className="text-gray-600" />
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 border border-white rounded"
                  disabled={selectedLeads.length === 0}
                >
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => selectedLeads.length === 1 && handleUpdate(selectedLeads[0])}
                  className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 border border-white rounded"
                  disabled={selectedLeads.length !== 1}
                >
                  <span>Update</span>
                </button>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="border rounded-md px-4 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center ml-4">
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
              <table className="min-w-full divide-y divide-gray-200 border-2 border-gray-200 shadow-sm shadow-gray-400 rounded-half">
                <thead className="bg-gray-200 rounded-md">
                  <tr className="border-gray-400 border">
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedLeads.length === filteredData.length}
                        onChange={() =>
                          setSelectedLeads(
                            selectedLeads.length === filteredData.length ? [] : filteredData.map((lead) => lead.lead_id)
                          )
                        }
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lead Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stack</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Class Mode</th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 h-[calc(vh-100px)]">
                  {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.map((lead) => (
                      <tr key={lead.lead_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <input
                            type="checkbox"
                            checked={selectedLeads.includes(lead.lead_id)}
                            onChange={() => handleCheckboxChange(lead.lead_id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.created_at || 'N/A'}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm rounded-full ${statusColorMappings[lead.lead_status] || 'bg-white'}`}>
                          {lead.lead_status || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.name || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.phone || 'N/A'}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm rounded-full ${stackColorMappings[lead.stack] || 'bg-white'}`}>
                          {lead.stack || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.class_mode || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="flex space-x-4">
                {kanbanColumns.map((column) => (
                  <div key={column.id} className={`flex flex-col w-1/4 p-4 border rounded-lg ${column.color}`}>
                    <h2 className="text-xl font-semibold mb-2">{column.title}</h2>
                    {column.leads.length > 0 ? (
                      column.leads.map((lead) => (
                        <div key={lead.lead_id} className="mb-2 p-4 bg-white border rounded-md shadow-sm">
                          <p><strong>Name:</strong> {lead.name || 'N/A'}</p>
                          <p><strong>Phone:</strong> {lead.phone || 'N/A'}</p>
                          <p><strong>Created At:</strong> {lead.created_at || 'N/A'}</p>
                          <p><strong>Stack:</strong> {lead.stack || 'N/A'}</p>
                          <p><strong>Class Mode:</strong> {lead.class_mode || 'N/A'}</p>
                          <p><strong>Status:</strong> {lead.lead_status || 'N/A'}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No leads available</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
