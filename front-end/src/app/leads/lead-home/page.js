

"use client";

import { useState, useEffect, useCallback } from "react";  // Added useCallback
import { useRouter } from "next/navigation";
import { FaTable, FaThLarge, FaIdCard, FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from '@/app/components/navbar';

const Dashboard = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isApiConnected, setIsApiConnected] = useState(false);

  // useCallback ensures fetchData is stable and doesn't change on every render
  const fetchData = useCallback(async () => {
    try {
      const tableResponse = await axios.get("/api/table-data");
      const kanbanResponse = await axios.get("/api/leads");
      setTableData(tableResponse.data);
      setFilteredData(tableResponse.data);

      const groupedData = groupData(kanbanResponse.data);
      setColumns(groupedData);
      setIsApiConnected(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsApiConnected(false);
    }
  }, []); // Empty dependency array ensures fetchData is not recreated on every render

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Fetch data when fetchData changes

  useEffect(() => {
    const filtered = tableData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData]);

  const groupData = (data) => {
    // Define your data grouping logic here
    // For example:
    return [
      { id: '1', title: 'Not Contacted', color: 'bg-[#FFCCCC]', leads: [] },
      { id: '2', title: 'Attempted', color: 'bg-[#FFFF99]', leads: [] },
      { id: '3', title: 'Opportunity', color: 'bg-[#CCFFCC]', leads: [] },
      { id: '4', title: 'Cold Lead', color: 'bg-[#CCCCFF]', leads: [] },
    ];
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destinationColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (sourceColumn && destinationColumn) {
      const [removed] = sourceColumn.leads.splice(source.index, 1);
      destinationColumn.leads.splice(destination.index, 0, removed);

      setColumns([...columns]);
    }
  };

  const handleCreateLead = () => {
    router.push('/leads/create-lead');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="mb-6">
        <Navbar />
      </div>
      <div className="bg-white shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FaIdCard className="text-white text-4xl bg-blue-500 p-2 rounded-sm" />
            <button className="text-xl flex items-center space-x-1">
              <span>All Leads</span>
              <FaAngleDown className="text-gray-600 font-semibold" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCreateLead}
              className="flex items-center justify-center space-x-1 bg-blue-500 text-white px-2 border border-black rounded"
            >
              <span>Create Lead</span>
              <FaAngleDown className="text-gray-600" />
            </button>
            <button className="flex items-center justify-center space-x-1 bg-gray-100 px-2 border border-black rounded">
              <span>Actions</span>
              <FaAngleDown className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded-md px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center ml-4">
            <button
              onClick={() => toggleViewMode("table")}
              className={`flex items-center px-4 py-2 rounded-md border ${viewMode === "table" ? "bg-blue-500 text-white" : "text-black"
                }`}
            >
              <FaTable className="mr-2" />
              Table
            </button>
            <button
              onClick={() => toggleViewMode("kanban")}
              className={`flex items-center px-4 py-2 rounded-md border ${viewMode === "kanban" ? "bg-blue-500 text-white" : "text-black"
                }`}
            >
              <FaThLarge className="mr-2" />
              Kanban
            </button>
          </div>
        </div>

        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="mr-2" />
                    Created on
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stack
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class Mode
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-900">{item.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{item.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{item.phone}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStackColor(item.stack)}`}
                        >
                          {item.stack}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getClassModeColor(item.classMode)}`}
                        >
                          {item.classMode}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                    >
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-4 p-4">
              {columns.length > 0 ? (
                columns.map((column) => (
                  <Droppable key={column.id} droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className={`p-4 ${column.color}`}>
                          <h3 className="font-semibold text-lg text-gray-800">
                            {column.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ₹0.00 . {column.leads.length} Leads
                          </p>
                        </div>
                        <div className="p-4 space-y-4">
                          {column.leads.length > 0 ? (
                            column.leads.map((lead, leadIndex) => (
                              <Draggable
                                key={lead.id.toString()}
                                draggableId={lead.id.toString()}
                                index={leadIndex}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                                  >
                                    <h4 className="font-semibold text-gray-800">
                                      {lead.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {lead.details}
                                    </p>
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <div className="bg-gray-200 p-4 rounded-lg text-center">
                              <p>No leads found.</p>
                            </div>
                          )}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))
              ) : (
                [
                  { title: "Not Contacted", color: "bg-[#FFCCCC]" },
                  { title: "Attempted", color: "bg-[#FFFF99]" },
                  { title: "Opportunity", color: "bg-[#CCFFCC]" },
                  { title: "Cold Lead", color: "bg-[#CCCCFF]" },
                ].map((status, index) => (
                  <div
                    key={index}
                    className={`flex flex-col bg-gray-100 rounded-lg shadow-lg`}
                  >
                    <div className={`${status.color} p-4 rounded-t-lg`}>
                      <h3 className="font-semibold text-lg">{status.title}</h3>
                      <p className="text-sm">₹0.00 . 0 Leads</p>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="bg-gray-200 p-4 rounded-lg text-center">
                        <p>No leads found.</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

const getStackColor = (stack) => {
  switch (stack) {
    case "Web":
      return "bg-blue-500 text-white";
    case "Mobile":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const getClassModeColor = (classMode) => {
  switch (classMode) {
    case "Online":
      return "bg-yellow-500 text-white";
    case "Offline":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default Dashboard;

