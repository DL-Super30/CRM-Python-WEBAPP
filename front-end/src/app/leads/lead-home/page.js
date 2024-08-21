
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaTable, FaThLarge, FaIdCard, FaAngleDown } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from '@/app/components/navbar';

const Dashboard = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/leads");
      const data = await response.json();
      setTableData(data);
      setFilteredData(data);

      const groupedData = groupData(data);
      setColumns(groupedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filtered = tableData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData]);

  const groupData = (data) => {
    return [
      { id: '1', title: 'Not Contacted', color: 'bg-[#FFCCCC]', leads: data.filter(lead => lead.status === 'Not Contacted') },
      { id: '2', title: 'Attempted', color: 'bg-[#FFFF99]', leads: data.filter(lead => lead.status === 'Attempted') },
      { id: '3', title: 'Opportunity', color: 'bg-[#CCFFCC]', leads: data.filter(lead => lead.status === 'Opportunity') },
      { id: '4', title: 'Cold Lead', color: 'bg-[#CCCCFF]', leads: data.filter(lead => lead.status === 'Cold Lead') },
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
        {viewMode === 'table' ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stack</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ClassMode</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="droppable"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex space-x-4"
                >
                  {columns.map((column) => (
                    <div
                      key={column.id}
                      className={`p-4 rounded ${column.color}`}
                    >
                      <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
                      <Droppable droppableId={column.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-2"
                          >
                            {column.leads.map((lead, index) => (
                              <Draggable
                                key={lead.id}
                                draggableId={String(lead.id)}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-4 bg-white rounded shadow"
                                  >
                                    {lead.name}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        
      </div>
    </div>
  );
};

export default Dashboard;


