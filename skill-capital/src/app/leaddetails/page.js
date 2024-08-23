"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navabar';
import { useForm} from 'react-hook-form';
import Link from 'next/link';


const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClose,setModalClose] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
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
        const response = await axios.get('http://127.0.0.1:8000/api/leads/');
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitForm = async (formValues) => {
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/leads/', formValues);
      setLeads([...leads, data]);
      alert('Lead created successfully');
         setModalOpen(false);
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Leads</h1>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setModalOpen(true)}
            >
              Create Lead
            </button>
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
                       <td className="px-6 py-4 text-sm text-gray-700">
                       <Link href={`/leaddetails/${lead.id}`}>
                       {lead.name}
                       </Link>
                     </td>
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

      {modalOpen && (
        <div className="fixed overflow-auto w-full h-full inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
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
                <option value="None">None</option>
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

