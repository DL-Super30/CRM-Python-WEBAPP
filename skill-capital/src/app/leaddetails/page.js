"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navabar';
import { useForm} from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';


const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editLeadId, setEditLeadId] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [searchQuery, setSearchQuery] = useState('');
  const [newLead, setNewLead] = useState({
    name: '',
    contact_no: '',
    tech_stack: '',
    courses: '',
    lead_status: 'Not Contacted'
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await axios.get('http://127.0.0.1:8000/api/leads/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      console.log('Leads fetched successfully:', response.data);
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLeads = leads.filter(lead =>
    lead.courses.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.lead_status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitForm = async (formValues) => {
  //   try {
  //     const { data } = await axios.post('http://127.0.0.1:8000/api/leads/', formValues);
  //     setLeads([...leads, data]);
  //     alert('Lead created successfully');
  //        setModalOpen(false);
  //   } catch (error) {
  //     console.error('Error creating lead:', error);
  //   }
  // };
  // const Form = async (formValues) => {
  try {
      if (isEditMode) {
        const response = await axios.put(`http://127.0.0.1:8000/api/leads/${editLeadId}/`, formValues);
        setLeads(leads.map(lead => lead.id === editLeadId ? response.data : lead));
        alert('Lead updated successfully');
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/leads/', formValues);
        setLeads([...leads, response.data]);
        alert('Lead created successfully');
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };
   


const handleEditClick = (lead) => {
  setIsEditMode(true);
  setEditLeadId(lead.id);
  setModalOpen(true);

  // Populate the form with existing lead data
  setValue('name', lead.name);
  setValue('cc', lead.cc);
  setValue('contact_no', lead.contact_no);
  setValue('email', lead.email);
  setValue('fee_coated', lead.fee_coated);
  setValue('batch_timing', lead.batch_timing);
  setValue('description', lead.description);
  setValue('lead_status', lead.lead_status);
  setValue('lead_source', lead.lead_source);
  setValue('tech_stack', lead.tech_stack);
  setValue('courses', lead.courses);
  setValue('class_mode', lead.class_mode);
  setValue('date', lead.date);
};


const handleDeleteClick = async (leadId) => {
  if (window.confirm("Are you sure you want to delete this lead?")) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/leads/${leadId}/`);
      setLeads(leads.filter(lead => lead.id !== leadId));
      alert('Lead deleted successfully');
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  }
};
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex  items-center mb-4">
          <Image src="idcard.svg" alt="idcard" width={30} height={30}/><h1 className="text-xl font-medium ml-1 text-blue-950">All Leads</h1>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded" style={{ marginLeft: '52rem' }}
              onClick={() => {
  setModalOpen(true);
  setIsEditMode(false); // Reset to create mode
  setEditLeadId(null); // Clear any previously selected lead
}}

            >
              Create Lead
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded">Actions</button>
          </div>
        </div>
        <div className='flex justify'>
   
    <div className="relative">
  <input
    type="text"
    placeholder="Search"
    value={searchQuery}
    onChange={handleSearch}
    className="border-2 rounded pl-10 pr-4 py-1 w-72"
  />
  <FaSearch className="absolute left-3 top-2 text-gray-500" />
</div>

    <button
      type="submit"
      className="relative border-2 bg-blue-500 border-gray px-4 ml-2 rounded flex items-center text-white"
    >
       <FontAwesomeIcon icon={faTableCells} className="ml-2 text-white" /> Table
    
    </button>
    <button type="submit" className="relative border-2 px-4 ml-2 border-gray rounded">Kanban</button>
    </div>
        <div className="bg-white  mt-4 rounded-md">
          {/* <div className="flex space-x-2 p-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Not Contacted</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Attempted</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">Warm Lead</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded">Cold Lead</button>
          </div> */}
          <div className="overflow-x-auto ">
            <table className="min-w-full border-2 bg-white mt-6 text-center rounded">
              <thead className='border-2 bg-gray-100'>
                <tr>
                <th className="px-4 py-2 ">
                 <input type="checkbox" />
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500 ">Created on</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Lead Status</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Phone</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Stack</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Course</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className='ml-2'>
                   
                    <td colSpan="7" className="px-6 py-2 text-center text-gray-500 ">Loading...</td>
                  </tr>
                ) : leads.length > 0 ? (
                  leads.map((lead) => (
                    <tr key={lead.id}>
                       <td className="px-6 py-2 border-b-2">
                 <input type="checkbox" className='ml-2' />
                  </td>
                      <td className="py-px text-sm text-gray-700 border-b-2">{lead.date}</td>
                      <td className="py-px text-sm text-gray-700 border-b-2 ">{lead.lead_status}</td>
                      <td className="py-px text-sm text-gray-700 border-b-2">
                        <Link href={`/leaduserdetails/${lead.id}`}>
                          {lead.name}
                        </Link>
                      </td>
                      <td className="py-px text-sm text-gray-700 border-b-2">{lead.contact_no}</td>
                      <td className="py-px text-sm text-gray-700 border-b-2">{lead.tech_stack}</td>
                      <td className="py-px  text-sm text-gray-700 border-b-2">{lead.courses}</td>
                      <td className="py-px text-sm text-gray-700 border-b-2">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                          onClick={() => handleEditClick(lead)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => handleDeleteClick(lead.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Leads data not found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed overflow-auto w-screen h-full inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Create New Lead</h2>
     
             <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block  text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('name', { required: true })} />
              {errors.name && <p className="text-red-500 text-sm">Name is mandatory</p>}
            </div>

            <div>
              <label htmlFor="cc" className="block text-sm font-medium text-gray-700">CC</label>
              <input type="number" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('cc', { required: true })} />
              {errors.cc && <p className="text-red-500 text-sm">CC is mandatory</p>}
            </div>

            <div>
              <label htmlFor="contact_no" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="number" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('contact_no', { required: true })} />
              {errors.contact_no && <p className="text-red-500 text-sm">Phone number is mandatory</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('email', { required: true })} />
              {errors.email && <p className="text-red-500 text-sm">Email is mandatory</p>}
            </div>

            <div>
              <label htmlFor="fee_coated" className="block text-sm font-medium text-gray-700">Fee Coated</label>
              <input type="number" step="0.01" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('fee_coated', { required: true })} />
              {errors.fee_coated && <p className="text-red-500 text-sm">Fee is mandatory</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('description', { required: true })}></textarea>
              {errors.description && <p className="text-red-500 text-sm">Description is mandatory</p>}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('date', { required: true })} />
              {errors.date && <p className="text-red-500 text-sm">Date is mandatory</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="lead_source" className="block text-sm font-medium text-gray-700">Lead Source</label>
              <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('lead_source', { required: true })}>
                <option value="None"></option>
                <option value="WalkIn">WalkIn</option>
                <option value="StudentReferral">StudentReferral</option>
                <option value="Demo">Demo</option>
                <option value="WebSite">WebSite</option>
                <option value="WebsiteChat">WebsiteChat</option>
                <option value="InboundCall">InboundCall</option>
                <option value="GoogleAdWords">GoogleAdWords</option>
                <option value="FacebookAds">FacebookAds</option>
                <option value="GoogleMyBusiness">GoogleMyBusiness</option>
                <option value="WhatsAppDigitalLync">WhatsAppDigitalLync</option>
              </select>
            </div>

            <div>
              <label htmlFor="batch_timing" className="block text-sm font-medium text-gray-700">Batch Timing</label>
              <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('batch_timing', { required: true })}>
                <option value="7AM_8AM">7AM_8AM</option>
                <option value="8AM_9AM">8AM_9AM</option>
                <option value="9AM_10AM">9AM_10AM</option>
                <option value="10AM_11AM">10AM_11AM</option>
              </select>
            </div>

            <div>
              <label htmlFor="class_mode" className="block text-sm font-medium text-gray-700">Class Mode</label>
              <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('class_mode', { required: true })}>
                <option value="HYDClassRoom">HYDClassRoom</option>
                <option value="BLRClassRoom">BLRClassRoom</option>
                <option value="IndiaOnline">IndiaOnline</option>
                <option value="InternationalOnline">InternationalOnline</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead_status" className="block text-sm font-medium text-gray-700">Lead Status</label>
              <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('lead_status', { required: true })}>
                <option value="None">None</option>
                <option value="NotContacted">NotContacted</option>
                <option value="Attempted">Attempted</option>
                <option value="WarmLead">WarmLead</option>
                <option value="Opportunity">Opportunity</option>
                <option value="AttendedDemo">AttendedDemo</option>
                <option value="Visited">Visited</option>
                <option value="Registered">Registered</option>
                <option value="ColdLead">ColdLead</option>
              </select>
            </div>

            <div>
              <label htmlFor="courses" className="block text-sm font-medium text-gray-700">Courses</label>
              <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('courses', { required: true })}>
                <option value="Angular">Angular</option>
                <option value="AWS">AWS</option>
                <option value="Azure">Azure</option>
                <option value="AWSWithDevOps">AWSWithDevOps</option>
                <option value="BusinessAnalyst">BusinessAnalyst</option>
                <option value="DevOps">DevOps</option>
                <option value="FrontEndAngular">FrontEndAngular</option>
                <option value="FrontEndReact">FrontEndReact</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="FullStackMEAN">FullStackMEAN</option>
                <option value="FullStackJAVA">FullStackJAVA</option>
                <option value="FullstackPython">FullstackPython</option>
                <option value="GoogleCloud">GoogleCloud</option>
                <option value="Mulesoft">Mulesoft</option>
                <option value="SDET">SDET</option>
                <option value="PowerBI">PowerBI</option>
              </select>
            </div>

            <div>
              <label htmlFor="tech_advisor" className="block text-sm font-medium text-gray-700">Tech Advisor</label>
              <input type="text" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('tech_advisor', { required: true })} />
              {errors.tech_advisor && <p className="text-red-500 text-sm">Tech Advisor is mandatory</p>}
            </div>

            <div>
              <label htmlFor="class_type" className="block text-sm font-medium text-gray-700">Class Type</label>
              <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('class_type', { required: true })}>
                <option value="Weekday">Weekday</option>
                <option value="Weekend">Weekend</option>
              </select>
            </div>
          </div>
        </div>
         <button
type="button"
onClick={() => setModalOpen(false)}
className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
>
Cancel
</button>
<button
type="submit"
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Submit
</button>
      </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Leads;

