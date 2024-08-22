
// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { FaTable, FaThLarge, FaIdCard, FaAngleDown } from "react-icons/fa";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Navbar from '@/app/components/navbar';

// const Dashboard = () => {
//   const router = useRouter();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [tableData, setTableData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [columns, setColumns] = useState([]);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch('http://44.202.26.131:8000/Insert%20Leads/');
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setTableData(data);
//         setFilteredData(data);

//         const groupedData = groupData(data);
//         setColumns(groupedData);
//       } else {
//         console.error('Fetched data is not an array:', data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     const filtered = tableData.filter((item) =>
//       Object.values(item).some((val) =>
//         String(val).toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, tableData]);

//   const groupData = (data) => {
//     return [
//       { id: '1', title: 'Not Contacted', color: 'bg-[#FFCCCC]', leads: data.filter(lead => lead.status === 'Not Contacted') },
//       { id: '2', title: 'Attempted', color: 'bg-[#FFFF99]', leads: data.filter(lead => lead.status === 'Attempted') },
//       { id: '3', title: 'Opportunity', color: 'bg-[#CCFFCC]', leads: data.filter(lead => lead.status === 'Opportunity') },
//       { id: '4', title: 'Cold Lead', color: 'bg-[#CCCCFF]', leads: data.filter(lead => lead.status === 'Cold Lead') },
//     ];
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const toggleViewMode = (mode) => {
//     setViewMode(mode);
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     ) {
//       return;
//     }

//     const sourceColumn = columns.find((col) => col.id === source.droppableId);
//     const destinationColumn = columns.find(
//       (col) => col.id === destination.droppableId
//     );

//     if (sourceColumn && destinationColumn) {
//       const [removed] = sourceColumn.leads.splice(source.index, 1);
//       destinationColumn.leads.splice(destination.index, 0, removed);

//       setColumns([...columns]);
//     }
//   };

//   const handleCreateLead = () => {
//     router.push('/leads/create-lead');
//   };

//   return (
//     <div className="bg-white-100 min-h-screen p-2">
//       <div className="mb-2">
//         <Navbar />
//       </div>
//       <div className="bg-white shadow-md p-12">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <FaIdCard className="text-white text-4xl bg-blue-500 p-2 rounded-md" />
//             <button className="text-xl flex items-center space-x-1">
//               <span>All Leads</span>
//               <FaAngleDown className="text-gray-600 font-semibold" />
//            </button>
//           </div>
//            <div className="flex items-center space-x-2">
//           <button
//               onClick={handleCreateLead}
//               className="flex items-center justify-center space-x-1 bg-blue-500 text-white px-2 border border-white rounded"
//             >
//               <span>Create Lead</span>
//               <FaAngleDown className="text-gray-600" />
//             </button>
//             <button className="flex items-center justify-center space-x-1 bg-gray-100 px-2 border border-black rounded">
//               <span>Actions</span>
//               <FaAngleDown className="text-gray-600" />
//             </button>
//           </div>
//         </div>
//         <div className="flex items-center mb-4">
//          <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={handleSearch}
//             className="border rounded-md px-4 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <div className="flex items-center ml-4">
//             <button
//               onClick={() => toggleViewMode("table")}
//               className={`flex items-center px-4 py-2 rounded-md border ${viewMode === "table" ? "bg-blue-500 text-white" : "text-black"
//                 }`}
//             >
//               <FaTable className="mr-2" />
//               Table
//             </button>
//             <button
//               onClick={() => toggleViewMode("kanban")}
//               className={`flex items-center px-4 py-2 rounded-md border ${viewMode === "kanban" ? "bg-blue-500 text-white" : "text-black"
//                 }`}
//             >
//               <FaThLarge className="mr-2" />
//               Kanban
//             </button>
//           </div>
//         </div>
//         {viewMode === 'table' ? (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-200">
//               <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stack</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ClassMode</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {Array.isArray(filteredData) && filteredData.length > 0 ? (
//                 filteredData.map((lead) => (
//                   <tr key={lead.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="px-6 py-4 text-center" colSpan="6">
//                     No leads available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         ) : (
//           <DragDropContext onDragEnd={onDragEnd}>
//             <Droppable
//               droppableId="droppable"
//               direction="horizontal"
//             >
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="flex space-x-4"
//                 >
//                                    {columns.map((column) => (
//                     <div
//                       key={column.id}
//                       className={`p-4 rounded ${column.color}`}
//                     >
//                       <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
//                       <Droppable droppableId={column.id}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                             className="space-y-2"
//                           >
//                             {column.leads.map((lead, index) => (
//                               <Draggable
//                                 key={lead.id}
//                                 draggableId={String(lead.id)}
//                                 index={index}
//                               >
//                                 {(provided) => (
//                                   <div
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     className="p-4 bg-white rounded shadow"
//                                   >
//                                     {lead.name}
//                                   </div>
//                                 )}
//                               </Draggable>
//                             ))}
//                             {provided.placeholder}
//                           </div>
//                         )}
//                       </Droppable>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Droppable>
//           </DragDropContext>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


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
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [kanbanColumns, setKanbanColumns] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://44.201.198.122:8000/leads');
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
  }, [searchTerm, data]);

  const groupForKanban = (data) => {
    // Adjust this grouping logic as needed based on your data structure
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

    const sourceColumn = kanbanColumns.find((col) => col.id === source.droppableId);
    const destinationColumn = kanbanColumns.find(
      (col) => col.id === destination.droppableId
    );

    if (sourceColumn && destinationColumn) {
      const [removed] = sourceColumn.leads.splice(source.index, 1);
      destinationColumn.leads.splice(destination.index, 0, removed);

      setKanbanColumns([...kanbanColumns]);
    }
  };

  const handleCreateLead = () => {
    router.push('/leads/create-lead');
  };

  return (
    <div className="bg-white-100 min-h-screen p-2">
      <div className="mb-2">
        <Navbar />
      </div>
      <div className="bg-white shadow-md p-12">
        <div className="flex items-center justify-between mb-4">
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
              className="flex items-center justify-center space-x-1 bg-blue-500 text-white px-2 border border-white rounded"
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
            className="border rounded-md px-4 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.created_on}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.stack}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.classMode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="flex overflow-x-auto">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="all-columns" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex space-x-4"
                  >
                    {kanbanColumns.map((column) => (
                      <Droppable key={column.id} droppableId={column.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`p-4 bg-white shadow-md rounded ${column.color}`}
                          >
                            <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
                            {column.leads.map((lead, index) => (
                              <Draggable key={lead.id} draggableId={String(lead.id)} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-2 mb-2 bg-white shadow rounded"
                                  >
                                    <div className="font-medium">{lead.name}</div>
                                    <div className="text-sm text-gray-600">{lead.phone}</div>
                                    <div className="text-xs text-gray-500">{lead.stack} - {lead.classMode}</div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
