// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
// import { faTable, faChartSimple } from '@fortawesome/free-solid-svg-icons';
// import Navbar from '../../../component/navbar';

// export default function Lead() {
//   const [showForm, setShowForm] = useState(false);
//   const [view, setView] = useState('table'); // 'table' or 'kanban'
//   const [leads, setLeads] = useState([]);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [formValues, setFormValues] = useState({
//     name: '',
//     cc: '',
//     phone: '',
//     email: '',
//     fee_quoted: 0,
//     batch_timing: '',
//     description: '',
//     lead_status: '',
//     lead_source: '',
//     stack: '',
//     course: '',
//     class_mode: '',
//     next_followup: '',
//     created_at: ''
//   });
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       const response = await axios.get('http://44.212.21.130:8000/getleads');
//       setLeads(response.data);
//     } catch (error) {
//       console.error("There was an error fetching the leads!", error);
//     }
//   };

//   const handleCreateLeadClick = () => {
//     setFormValues({
//       name: '',
//       cc: '',
//       phone: '',
//       email: '',
//       fee_quoted: 0,
//       batch_timing: '',
//       description: '',
//       lead_status: '',
//       lead_source: '',
//       stack: '',
//       course: '',
//       class_mode: '',
//       next_followup: '',
//       created_at: ''
//     });
//     setShowForm(true);
//     setSelectedLead(null);
//     setFormErrors({});
//   };

//   const handleCloseFormClick = () => {
//     setShowForm(false);
//   };

//   const handleViewChange = (newView) => {
//     setView(newView);
//   };

//   const handleEditClick = (lead) => {
//     setFormValues(lead);
//     setSelectedLead(lead);
//     setShowForm(true);
//   };

//   const handleDeleteClick = (leadToDelete) => {
//     if (window.confirm('Are you sure you want to delete this lead?')) {
//       axios.delete(`http://44.212.21.130:8000/deleteleads/${leadToDelete.id}`)
//         .then(() => {
//           setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
//         })
//         .catch(error => {
//           console.error("There was an error deleting the lead!", error);
//         });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         if (selectedLead) {
//           // Update an existing lead
//           await axios.put(`http://44.212.21.130:8000/updateleads/${selectedLead.id}`, formValues);
//         } else {
//           // Create a new lead
//           await axios.post('http://44.212.21.130:8000/createleads', formValues);
//         }

//         fetchLeads(); // Refresh the leads list
//         setShowForm(false);
//         setFormValues({
//           name: '',
//           cc: '',
//           phone: '',
//           email: '',
//           fee_quoted: 0,
//           batch_timing: '',
//           description: '',
//           lead_status: '',
//           lead_source: '',
//           stack: '',
//           course: '',
//           class_mode: '',
//           next_followup: '',
//           created_at: ''
//         });
//         setSelectedLead(null);
//         setFormErrors({});
//       } catch (error) {
//         console.error("There was an error submitting the form!", error);
//       }
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     const requiredFields = ['name', 'lead_source'];

//     requiredFields.forEach(field => {
//       if (!formValues[field]) {
//         errors[field] = 'This field is required';
//       }
//     });

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   return (
//     <main>
//       <Navbar />
//       <div className="container-lg border shadow-lg mt-5 p-5">
//         <div className="flex flex-col lg:flex-row lg:justify-between">
//           <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4 lg:mb-0">
//             <button className="text-4xl text-blue-400">
//               <i className="fa-sharp fa-solid fa-address-card"></i>
//             </button>
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
//               <option value="" disabled>Actions</option>
//               <option>Edit</option>
//               <option>Delete</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
//           <input
//             type="text"
//             placeholder="Search...."
//             className="border rounded p-1 w-3/12 mt-2"
//           />
//           <div className="flex gap-5 border rounded-xl">
//             <button
//               className={`text-xl border-none rounded-xl p-2 ${view === 'table' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
//               onClick={() => handleViewChange('table')}
//             >
//               <FontAwesomeIcon icon={faTable} /> Table
//             </button>
//             <button
//               className={`text-xl border-none rounded-xl p-2 ${view === 'kanban' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
//               onClick={() => handleViewChange('kanban')}
//             >
//               <FontAwesomeIcon icon={faChartSimple} /> Kanban
//             </button>
//           </div>
//         </div>

//         {/* Conditionally Render Form */}
//         {showForm && (
//           <div className="mt-5 p-5 border rounded bg-white shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">{selectedLead ? 'Edit Lead' : 'Create New Lead'}</h2>
//             <form className="space-y-4" onSubmit={handleFormSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {Object.keys(formValues).map((key) => (
//                   <div key={key}>
//                     <label className="block text-sm font-medium text-gray-700">{key.replace('_', ' ').toUpperCase()}</label>
//                     {key === 'description' ? (
//                       <textarea
//                         name={key}
//                         value={formValues[key]}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
//                         rows="4"
//                       />
//                     ) : (
//                       <input
//                         type={key === 'created_at' ? 'date' : 'text'}
//                         name={key}
//                         value={formValues[key]}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
//                         placeholder={key.replace('_', ' ')}
//                       />
//                     )}
//                     {formErrors[key] && <p className="text-red-500 text-xs mt-1">{formErrors[key]}</p>}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex gap-4 mt-4">
//                 <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
//                 <button type="button" className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600" onClick={handleCloseFormClick}>Close</button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Display leads in a table or kanban view */}
//         {view === 'table' ? (
//           <table className="w-full mt-5 border-collapse border border-gray-200">
//             <thead>
//               <tr>
//                 {Object.keys(leads[0] || {}).map((key) => (
//                   <th key={key} className="border border-gray-300 p-2">{key.replace('_', ' ').toUpperCase()}</th>
//                 ))}
//                 <th className="border border-gray-300 p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead) => (
//                 <tr key={lead.id}>
//                   {Object.keys(lead).map((key) => (
//                     <td key={key} className="border border-gray-300 p-2">{lead[key]}</td>
//                   ))}
//                   <td className="border border-gray-300 p-2">
//                     <button onClick={() => handleEditClick(lead)} className="text-blue-500 hover:text-blue-700">Edit</button>
//                     <button onClick={() => handleDeleteClick(lead)} className="text-red-500 hover:text-red-700 ml-2">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="kanban-board mt-5">
//             {/* Kanban view implementation goes here */}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faTable, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../../component/navbar';

export default function Lead() {
  const [showForm, setShowForm] = useState(false);
  const [showDetails,setShowDetails]=useState(false);
  const [view, setView] = useState('table'); // 'table' or 'kanban'
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    cc: '',
    phone: '',
    email: '',
    fee_quoted: 0,
    batch_timing: '',
    description: '',
    lead_status: '',
    lead_source: '',
    stack: '',
    course: '',
    class_mode: '',
    next_followup: '',
    created_at: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleCreateLeadClick = () => {
    setFormValues({
      name: '',
      cc: '',
      phone: '',
      email: '',
      fee_quoted: 0,
      batch_timing: '',
      description: '',
      lead_status: '',
      lead_source: '',
      stack: '',
      course: '',
      class_mode: '',
      next_followup: '',
      created_at: ''
    });
    setShowForm(true);
    setSelectedLead(null);
    setFormErrors({});
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://44.212.21.130:8000/getleads');
      setLeads(response.data); // Update leads state with fetched data
      
    } catch (error) {
      console.error("There was an error fetching the leads!", error);
    }
  };
  const handleViewDetailsClick =(lead)=>{
    setSelectedLead(lead);
    setShowDetails(true);
    setShowForm(false);

  }

  const handleCloseFormClick = () => {
    setShowForm(false);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleEditClick = (lead) => {
    setFormValues({
      ...lead,
      created_at: new Date(lead.created_at).toISOString().slice(0, 16) // Convert ISO to local date-time string
    });

    setSelectedLead(lead);
    setShowForm(true);
  };

  const handleDeleteClick = async (leadToDelete) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await axios.delete(`http://44.212.21.130:8000/deletelead/${leadToDelete.id}`);
        setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
      } catch (error) {
        console.error("There was an error deleting the lead!", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    
    if (validateForm()) {
      try {
       
        if (selectedLead) {
          
          await axios.put(`http://44.212.21.130:8000/updatelead/${selectedLead.id}`, formValues);
          window.alert('Lead details Updated Successfully');
        } else {
         
          await axios.post(`http://44.212.21.130:8000/createleads`, formValues);
          window.alert(' Lead created succefully');
        }

        
        fetchLeads();
        
        setShowForm(false);
        setFormValues({
          name: '',
          cc: '',
          phone: '',
          email: '',
          fee_quoted: 0,
          batch_timing: '',
          description: '',
          lead_status: '',
          lead_source: '',
          stack: '',
          course: '',
          class_mode: '',
          next_followup: '',
          created_at: ''
        });
        setSelectedLead(null);
        setFormErrors({});
      } catch (error) {
        console.error("There was an error submitting the form!", error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['name'];

    requiredFields.forEach(field => {
      if (!formValues[field]) {
        errors[field] = 'This field is required';
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <main>
      <Navbar Navbar={Navbar} />
      <div className="container-lg border shadow-lg mt-5 p-5">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4 lg:mb-0">
            <button className="text-4xl text-blue-400">
              <i className="fa-sharp fa-solid fa-address-card"></i>
            </button>
            <select className="text-2xl text-blue-400 border rounded">
              <option value="" className="text-lg text-black">All Leads</option>
              <option value="hari" className="text-lg text-black">Hari</option>
              <option value="Krishna" className="text-lg text-black">Krishna</option>
              <option value="Jayanth" className="text-lg text-black">Jayanth</option>
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <button
              className="hover:bg-blue-500 hover:text-white border rounded p-2"
              onClick={handleCreateLeadClick}
            >
              Create Lead
            </button>
            <select className="lg:hover:bg-blue-500 lg:hover:text-white rounded p-1">
              <option selected disabled>Actions</option>
              <option>Edit</option>
              <option>Delete</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="Search...."
            className="border rounded p-1 w-3/12 mt-2"
          />
          <div className="flex gap-5 border rounded-xl">
            <button
              className={`hover:bg-blue-500 hover:text-white text-xl border-none rounded-xl p-2 ${view === 'table' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleViewChange('table')}
            >
              <FontAwesomeIcon icon={faTable} /> Table
            </button>
            <button
              className={`hover:bg-blue-500 hover:text-white text-xl border-none rounded-xl p-2 ${view === 'kanban' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleViewChange('kanban')}
            >
              <FontAwesomeIcon icon={faChartSimple} /> Kanban
            </button>
          </div>
        </div>

        {/* Conditionally Render Form */}
        {showForm && (
          <div className="mt-5 p-5 border rounded bg-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedLead ? 'Edit Lead' : 'Create New Lead'}</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
                    placeholder="Enter name"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lead Status</label>
                  <select
                  
                    name="lead_status"
                    value={formValues.lead_status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
                  >
                    <option value="" disabled selected></option>
                    <option value="Cold Lead1">Cold Lead1</option>
                    <option value="Cold Lead2">Cold Lead2</option>
                    <option value="Cold Lead3">Cold Lead3</option>
                  </select>
                  {formErrors.leadStatus && <p className="text-red-500 text-xs mt-1">{formErrors.leadStatus}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CC</label>
                  <input type="text" 
                  name='cc'
                  value={formValues.cc}
                    onChange={handleInputChange}
                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  />
                   {formErrors.cc && <p className="text-red-500 text-xs mt-1">{formErrors.cc}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">leadSource</label>
                  <select
                  name="lead_source"
                  value={formValues.lead_source}
                  onChange={handleInputChange}
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  >
                    <option value="" disabled selected></option>
                    <option value="option 1">Option 1</option>
                    <option value="option 2">Option 2</option>
                    <option value="option 3">Option 3</option>
                  </select>
                  {formErrors.leadSource && <p className="text-red-500 text-xs mt-1">{formErrors.leadSource}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
                    placeholder="Enter phone number"
                  />
                 {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stack</label>
                  <select
                    name="stack"
                    value={formValues.stack}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
                  >
                    <option value="" disabled selected></option>
                    <option value="lifeSkills">lifeSkills</option>
                    <option value="FullStack">FullStack</option>
                    <option value="MERN-Stack">MERN-Stack</option>
                    <option value="AWS-DevOps">AWS-DevOps</option>
                  </select>
                  {formErrors.stack && <p className="text-red-500 text-xs mt-1">{formErrors.stack}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" 
                   name="email"
                   value={formValues.email}
                   onChange={handleInputChange}
                  className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
                    placeholder="Email"
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <select
                   name="course"
                   value={formValues.course}
                   onChange={handleInputChange}
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

                  >
                    <option value="" disabled selected></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  {formErrors.course && <p className="text-red-500 text-xs mt-1">{formErrors.course}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fee Quoted</label>
                  <input type="text"
                   name="fee_quoted"
                   value={formValues.fee_quoted}
                   onChange={handleInputChange}
                  className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
                  {formErrors.feeQuoted && <p className="text-red-500 text-xs mt-1">{formErrors.feeQuoted}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Class Mode</label>
                  <select
                    name="class_mode"
                    value={formValues.class_mode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
                  >
                    <option value="" disabled selected></option>
                    <option value="Hyd Offline Campus"> Hyd Offline Campus</option>
                    <option value="BLR Offline Campus">BLR Offline Campus</option>
                    {/* <option value="option3">Option 3</option> */}
                  </select>
                  {formErrors.class && <p className="text-red-500 text-xs mt-1">{formErrors.class}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Batch Timing</label>
                  <input type="text"
                   name="batch_timing"
                   value={formValues.batch_timing}
                   onChange={handleInputChange}
                  className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
                  {formErrors.batchTiming && <p className="text-red-500 text-xs mt-1">{formErrors.batchTiming}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next nextFollowUp</label>
                  <input type="text"
                   name="next_followup"
                   value={formValues.next_followup}
                   onChange={handleInputChange}
                  className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
                 {formErrors.nextFollowUp && <p className="text-red-500 text-xs mt-1">{formErrors.nextFollowUp}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created_at</label>
                  <input type="text"
                   name="created_at"
                   value={formValues.created_at}
                   onChange={handleInputChange}
                  className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
                 {formErrors.nextFollowUp && <p className="text-red-500 text-xs mt-1">{formErrors.nextFollowUp}</p>}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">description</label>
                  <textarea
                   name="description"
                   value={formValues.description}
                   onChange={handleInputChange}
                  className=" block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" rows="1"></textarea>
                </div>
                </div>
                
              
              <div className="flex gap-4 mt-4">
                <button type="submit"
                  className="text-black px-8 py-1 border border-sky-500 rounded-full hover:bg-blue-600 hover:text-white">
                  {selectedLead ? 'Update' : 'Create'}
                </button>
                <button type="button" className="text-black px-8 py-1 border border-sky-500 rounded-full hover:bg-blue-600 hover:text-white" onClick={handleCloseFormClick}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

{showDetails && selectedLead && (
          <div className="mt-5 p-5 border rounded bg-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Lead Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Name:</strong> {selectedLead.name}
              </div>
              <div>
                <strong>CC:</strong> {selectedLead.cc}
              </div>
              <div>
                <strong>Phone:</strong> {selectedLead.phone}
              </div>
              <div>
                <strong>Email:</strong> {selectedLead.email}
              </div>
              <div>
                <strong>Fee Quoted:</strong> {selectedLead.fee_quoted}
              </div>
              <div>
                <strong>Batch Timing:</strong> {selectedLead.batch_timing}
              </div>
              <div>
                <strong>Description:</strong> {selectedLead.description}
              </div>
              <div>
                <strong>Lead Status:</strong> {selectedLead.lead_status}
              </div>
              <div>
                <strong>Lead Source:</strong> {selectedLead.lead_source}
              </div>
              <div>
                <strong>Stack:</strong> {selectedLead.stack}
              </div>
              <div>
                <strong>Course:</strong> {selectedLead.course}
              </div>
              <div>
                <strong>Class Mode:</strong> {selectedLead.class_mode}
              </div>
              <div>
                <strong>Next Follow-up:</strong> {selectedLead.next_followup}
              </div>
              <div>
                <strong>Created At:</strong> {new Date(selectedLead.created_at).toLocaleString()}
              </div>
            </div>
            <button onClick={() => setShowDetails(false)} className="bg-red-500 text-white rounded p-2 mt-4">
              Close Details
            </button>
          </div>
        )}

        {/* Conditionally Render Views */}
        {view === 'table' && (
          <div className="overflow-x-auto pt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-500">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">createdOn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">leadStatus</th>
                  
                  <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Stack</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">classMode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">Actions</th>


                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.created_at}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.lead_status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.stack}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.class_mode}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleEditClick(lead)} className="text-blue-500 hover:text-blue-700">Edit</button>
                      <button onClick={() => handleDeleteClick(lead)} className="text-red-500 hover:text-red-700 ml-4">Delete</button>
                      <button onClick={() => handleViewDetailsClick(lead)} className="text-green-500 hover:text-pink-700 ml-4">View</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

{view === 'kanban' && (
          <div className="container mx-auto p-4 mt-5">
            {/* Kanban view implementation */}
            <div className="container mx-auto p-4">

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 border rounded p-4 text-sm font-semibold bg-green-200">
              Not Contacted
              <p className="font-medium">$ 0.00, 0 Leads</p>
            </div>
            <div className="flex-1 border rounded p-4 text-sm font-semibold bg-blue-200">
              Attempted
              <p className="font-medium">$ 0.00, 0 Leads</p>
            </div>
            <div className="flex-1 border rounded p-4 text-sm font-semibold bg-orange-200">
              Opportunity
              <p className="font-medium">$ 0.00, 0 Leads</p>
            </div>
            <div className="flex-1 border rounded p-4 text-sm font-semibold bg-sky-200">
              Cold Lead
              <p className="font-medium">$ 0.00, 0 Leads</p>
            </div>
          </div>


          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 border rounded bg-slate-400 text-center p-4">
              No leads Found
            </div>
            <div className="flex-1 border rounded bg-slate-400 text-center p-4">
              <div className="bg-white border rounded text-start p-2 text-xs">
                <p>Harikrishna</p>
                <p>Details..<span>1</span></p>
                <p>Additional Info</p>
                <p>Additional Info</p>
                <p>Additional Info</p>
                <p>Additional Info</p>
              </div>
            </div>
            <div className="flex-1 border rounded bg-slate-400 text-center p-4">
              No leads Found
            </div>
            <div className="flex-1 border rounded bg-slate-400 text-center p-4">
              <div className='pb-2'>
                <div className="bg-white border rounded text-start p-2  text-xs">
                  <p>Harikrishna</p>
                  <p>Details..<span>1</span></p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                </div>
              </div>
              <div className='pb-2'>
                <div className="bg-white border rounded text-start p-2  text-xs">
                  <p>Harikrishna</p>
                  <p>Details..<span>1</span></p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                  <p>Additional Info</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
          </div>
        )}
      </div>
    </main>
  );
}


// "use client";
// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
// import { faTable, faChartSimple } from '@fortawesome/free-solid-svg-icons';
// import Navbar from '../../../component/navbar';

// export default function Lead() {
//   const [showForm, setShowForm] = useState(false);
//   const [view, setView] = useState('table'); // 'table' or 'kanban'
//   const [leads, setLeads] = useState([
    
//   ]);
//   const [selectedLead, setSelectedLead] = useState('');
//   const [formValues, setFormValues] = useState({
//  name: '',
//   cc: '',
//   phone: '',
//   email:'',
//   fee_quoted: 0,
//   batch_timing: '',
//   description: '',
//   lead_status: '',
//   lead_source: '',
//   stack: '',
//   course: '',
//   class_mode:'',
//   next_followup: '',
//   created_at: ''
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const handleCreateLeadClick = () => {
//     setFormValues({
//     createdOn: '',
//     leadStatus: '',
//     name: '',
//     cc:'',
//     phone: '',
//     email:'',
//     leadSource:'',
//     stack: '',
//     feeQuoted:'',
//     class: '',
//     batchTiming:'',
//     nextFollowUp:'',
//     description:''
//     });
//     setShowForm(true);
//     setSelectedLead(null);
//     setFormErrors({});
//     setShowForm(true);
//     setSelectedLead(null);
//   };
//   useEffect(()=>{
//     fetchLeads();
//   },[]);

//   const fetchLeads =async ()=>{
//     try{
//       const leads= await axios.get('http://44.212.21.130:8000/getleads');
      
//     }catch(error){
//       console.error("There was an error fetching the leads!", error);
//     }
//   }
  


//   const handleCloseFormClick = () => {
//     setShowForm(false);
//   };

//   const handleViewChange = (newView) => {
//     setView(newView);
//   };

//   const handleEditClick = (lead) => {
//     setFormValues(lead);
//     setSelectedLead(lead);
//     setShowForm(true);
//   };

//   const handleDeleteClick = (leadToDelete) => {
//     if (window.confirm('Are you sure you want to delete this lead?')) {
//       setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
//     }
//   };

//   const handleViewDetailsClick = (lead) => {
//     setSelectedLead(lead);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
  
//     // Validate the form
//     if (validateForm()) {
//       try {
//         // Check if it's an update or a new entry
//         if (selectedLead) {
//           // Updating an existing lead
//           await axios.put(`http://44.201.198.122:8000/updateleads/${selectedLead.id}`, formValues);
//         } else {
//           // Creating a new lead
//           await axios.post(`http://44.212.21.130:8000/createleads`, formValues);
//         }
  
//         // Refresh the leads list
//         fetchLeads(); 
//         // Reset the form
//         setShowForm(false);
//         setFormValues({
//           createdOn: '',
//           leadStatus: '',
//           name: '',
//           cc:'',
//           phone: '',
//           email:'',
//           leadSource:'',
//           stack: '',
//           feeQuoted:'',
//           class: '',
//           batchTiming:'',
//           nextFollowUp:'',
//           description:''
//         });
//         setSelectedLead(null);
//         setFormErrors({});
//       } catch (error) {
//         console.error("There was an error submitting the form!", error);
//       }
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     const requiredFields = ['name'];

//     requiredFields.forEach(field => {
//       if (!formValues[field]) {
//         errors[field] = 'This field is required';
//       }
//     });

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
//   // const handleFormSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (validateForm()) {
//   //     if (selectedLead) {
//   //       // Editing an existing lead
//   //       setLeads(leads.map(lead => (lead.id === selectedLead.id ? { ...formValues, id: lead.id } : lead)));
//   //     } else {
//   //       // Creating a new lead
//   //       setLeads([...leads, { ...formValues, id: leads.length + 1 }]);
//   //     }
//   //     setShowForm(false);
//   //   }
//   // };

//   return (
//     <main>
//       <Navbar Navbar={Navbar} />
//       <div className="container-lg border shadow-lg mt-5 p-5">
//         <div className="flex flex-col lg:flex-row lg:justify-between">
//           <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4 lg:mb-0">
//             <button className="text-4xl text-blue-400">
//               <i className="fa-sharp fa-solid fa-address-card"></i>
//             </button>
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
//               <option selected disabled>Actions</option>
//               <option>Edit</option>
//               <option>Delete</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
//           <input
//             type="text"
//             placeholder="Search...."
//             className="border rounded p-1 w-3/12 mt-2"
//           />
//           <div className="flex gap-5 border rounded-xl">
//             <button
//               className={`hover:bg-blue-500 hover:text-white text-xl border-none rounded-xl p-2 ${view === 'table' ? 'bg-blue-500 text-white' : ''}`}
//               onClick={() => handleViewChange('table')}
//             >
//               <FontAwesomeIcon icon={faTable} /> Table
//             </button>
//             <button
//               className={`hover:bg-blue-500 hover:text-white text-xl border-none rounded-xl p-2 ${view === 'kanban' ? 'bg-blue-500 text-white' : ''}`}
//               onClick={() => handleViewChange('kanban')}
//             >
//               <FontAwesomeIcon icon={faChartSimple} /> Kanban
//             </button>
//           </div>
//         </div>

//         {/* Conditionally Render Form */}
//         {showForm && (
//           <div className="mt-5 p-5 border rounded bg-white shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">{selectedLead ? 'Edit Lead' : 'Create New Lead'}</h2>
//             <form className="space-y-4" onSubmit={handleFormSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formValues.name}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
//                     placeholder="Enter name"
//                   />
//                   {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Lead Status</label>
//                   <select
//                     name="lead_status"
//                     value={formValues.lead_status}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
//                   >
//                     <option value="" disabled>Select Status</option>
//                     <option value="Cold Lead1">Cold Lead1</option>
//                     <option value="Cold Lead2">Cold Lead2</option>
//                     <option value="Cold Lead3">Cold Lead3</option>
//                   </select>
//                   {formErrors.leadStatus && <p className="text-red-500 text-xs mt-1">{formErrors.leadStatus}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">CC</label>
//                   <input type="text" 
//                   name='cc'
//                   value={formValues.cc}
//                     onChange={handleInputChange}
//                      className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

//                   />
//                    {formErrors.cc && <p className="text-red-500 text-xs mt-1">{formErrors.cc}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">leadSource</label>
//                   <select
//                   name="lead_source"
//                   value={formValues.lead_source}
//                   onChange={handleInputChange}
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

//                   >
//                     <option value="" disabled selected></option>
//                     <option value="option 1">Option 1</option>
//                     <option value="option 2">Option 2</option>
//                     <option value="option 3">Option 3</option>
//                   </select>
//                   {formErrors.leadSource && <p className="text-red-500 text-xs mt-1">{formErrors.leadSource}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Phone</label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formValues.phone}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
//                     placeholder="Enter phone number"
//                   />
//                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Stack</label>
//                   <select
//                     name="stack"
//                     value={formValues.stack}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
//                   >
//                     <option value="" disabled>Select Stack</option>
//                     <option value="lifeSkills">lifeSkills</option>
//                     <option value="FullStack">FullStack</option>
//                     <option value="MERN-Stack">MERN-Stack</option>
//                     <option value="AWS-DevOps">AWS-DevOps</option>
//                   </select>
//                   {formErrors.stack && <p className="text-red-500 text-xs mt-1">{formErrors.stack}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Email</label>
//                   <input type="email" 
//                    name="email"
//                    value={formValues.email}
//                    onChange={handleInputChange}
//                   className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"
//                     placeholder="Email"
//                   />
//                   {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Course</label>
//                   <select
//                    name="course"
//                    value={formValues.course}
//                    onChange={handleInputChange}
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2"

//                   >
//                     <option value="" disabled selected></option>
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                   </select>
//                   {formErrors.course && <p className="text-red-500 text-xs mt-1">{formErrors.course}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Fee Quoted</label>
//                   <input type="text"
//                    name="fee_quoted"
//                    value={formValues.fee_quoted}
//                    onChange={handleInputChange}
//                   className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
//                   {formErrors.feeQuoted && <p className="text-red-500 text-xs mt-1">{formErrors.feeQuoted}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Class Mode</label>
//                   <select
//                     name="class_mode"
//                     value={formValues.class_mode}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none focus:outline-none p-2"
//                   >
//                     <option value="" disabled>Select Class Mode</option>
//                     <option value="Online">Online</option>
//                     <option value="Offline">Offline</option>
//                     {/* <option value="option3">Option 3</option> */}
//                   </select>
//                   {formErrors.class && <p className="text-red-500 text-xs mt-1">{formErrors.class}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Batch Timing</label>
//                   <input type="text"
//                    name="batch_timing"
//                    value={formValues.batch_timing}
//                    onChange={handleInputChange}
//                   className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
//                   {formErrors.batchTiming && <p className="text-red-500 text-xs mt-1">{formErrors.batchTiming}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Next nextFollowUp</label>
//                   <input type="text"
//                    name="next_followup"
//                    value={formValues.next_followup}
//                    onChange={handleInputChange}
//                   className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
//                  {formErrors.nextFollowUp && <p className="text-red-500 text-xs mt-1">{formErrors.nextFollowUp}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Created_at</label>
//                   <input type="text"
//                    name="created_at"
//                    value={formValues.created_at}
//                    onChange={handleInputChange}
//                   className="mt-1 block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" />
//                  {formErrors.nextFollowUp && <p className="text-red-500 text-xs mt-1">{formErrors.nextFollowUp}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">description</label>
//                   <textarea
//                    name="description"
//                    value={formValues.description}
//                    onChange={handleInputChange}
//                   className=" block w-full border-b border-gray-300 bg-transparent rounded-none  focus:outline-none p-2" rows="1"></textarea>
//                 </div>
                
                
//                 {/* Add more fields if needed */}
//               </div>
//               <div className="flex gap-4 mt-4">
//                 <button type="submit"
                
//                  className="text-black px-8 py-1 border border-sky-500 rounded-full hover:bg-blue-600 hover:text-white">
//                   {selectedLead ? 'Update' : 'Create'}
//                 </button>
//                 <button type="button" className="text-black px-8 py-1 border border-sky-500 rounded-full hover:bg-blue-600 hover:text-white" onClick={handleCloseFormClick}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Conditionally Render Views */}
//         {view === 'table' && (
//           <div className="overflow-x-auto pt-5">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-400">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                     <input type="checkbox" /> Created on
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Lead Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Phone</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Stack</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Class Mode</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {leads.map((lead) => (
//                   <tr key={lead.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input type="checkbox" /> {lead.created_at}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">{lead.lead_status}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{lead.cc}{item.phone}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-orange-500 text-black">{lead.stack}</span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-rose-500 text-black">{lead.class_mode}</span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleEditClick(lead)}>Edit</button>
//                       <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(lead)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {view === 'kanban' && (
//           <div className="container mx-auto p-4 mt-5">
//             {/* Kanban view implementation */}
//             <div className="container mx-auto p-4">

//           <div className="flex flex-col lg:flex-row gap-4 mb-6">
//             <div className="flex-1 border rounded p-4 text-sm font-semibold bg-green-200">
//               Not Contacted
//               <p className="font-medium">$ 0.00, 0 Leads</p>
//             </div>
//             <div className="flex-1 border rounded p-4 text-sm font-semibold bg-blue-200">
//               Attempted
//               <p className="font-medium">$ 0.00, 0 Leads</p>
//             </div>
//             <div className="flex-1 border rounded p-4 text-sm font-semibold bg-orange-200">
//               Opportunity
//               <p className="font-medium">$ 0.00, 0 Leads</p>
//             </div>
//             <div className="flex-1 border rounded p-4 text-sm font-semibold bg-sky-200">
//               Cold Lead
//               <p className="font-medium">$ 0.00, 0 Leads</p>
//             </div>
//           </div>


//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 border rounded bg-slate-400 text-center p-4">
//               No leads Found
//             </div>
//             <div className="flex-1 border rounded bg-slate-400 text-center p-4">
//               <div className="bg-white border rounded text-start p-2 text-xs">
//                 <p>Harikrishna</p>
//                 <p>Details..<span>1</span></p>
//                 <p>Additional Info</p>
//                 <p>Additional Info</p>
//                 <p>Additional Info</p>
//                 <p>Additional Info</p>
//               </div>
//             </div>
//             <div className="flex-1 border rounded bg-slate-400 text-center p-4">
//               No leads Found
//             </div>
//             <div className="flex-1 border rounded bg-slate-400 text-center p-4">
//               <div className='pb-2'>
//                 <div className="bg-white border rounded text-start p-2  text-xs">
//                   <p>Harikrishna</p>
//                   <p>Details..<span>1</span></p>
//                   <p>Additional Info</p>
//                   <p>Additional Info</p>
//                   <p>Additional Info</p>
//                   <p>Additional Info</p>
//                 </div>
//               </div>
//               <div className='pb-2'>
//                 <div className="bg-white border rounded text-start p-2  text-xs">
//                   <p>Harikrishna</p>
//                   <p>Details..<span>1</span></p>
//                   <p>Additional Info</p>
//                   <p>Additional Info</p>
//                   <p>Additional Info</p>
//                   <p>Additional Info</p>
//                 </div>
//               </div>
              
//             </div>
//           </div>
//         </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }






