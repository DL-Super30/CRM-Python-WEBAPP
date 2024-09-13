"use client"
import  { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Navbar from '../components/navabar';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';
const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isKanbanView, setIsKanbanView] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editLeadId, setEditLeadId] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      cc: '',
      phone: '',
      email: '',
      fee_quoted: '',
      batch_timing: '',
      opportunity_status: '',
      opportunity_stage: '',
      demo_attended_stage: '',
      visited_stage: '',
      cold_lead_reason: '',
      next_followup: '',
      lead_source: '',
      remarks: ''
    }
  });

  useEffect(() => {
    // Fetch opportunities data from the API
    axios.get('http://127.0.0.1:8000/api/opportunties/')
      .then(response => {
        setOpportunities(response.data);
        setFilteredOpportunities(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleEditClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsEditMode(true);
    setModalOpen(true);
    // Set form values for editing
    Object.keys(opportunity).forEach(key => setValue(key, opportunity[key]));
  };

  const handleDeleteClick = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/opportunties/${id}`)
      .then(() => {
        setOpportunities(prev => prev.filter(opportunity => opportunity.id !== id));
        setFilteredOpportunities(prev => prev.filter(opportunity => opportunity.id !== id));
      })
      .catch(error => console.error(error));
  };

  const submitForm = (data) => {
    if (isEditMode) {
      axios.put(`http://127.0.0.1:8000/api/opportunties/${selectedOpportunity.id}`, data)
        .then(response => {
          setOpportunities(prev => prev.map(opportunity => opportunity.id === selectedOpportunity.id ? response.data : opportunity));
          setFilteredOpportunities(prev => prev.map(opportunity => opportunity.id === selectedOpportunity.id ? response.data : opportunity));
          setModalOpen(false);
          setIsEditMode(false);
          setSelectedOpportunity(null);
        })
        .catch(error => console.error(error));
    } else {
      axios.post('http://127.0.0.1:8000/api/opportunties/', data)
        .then(response => {
          setOpportunities(prev => [...prev, response.data]);
          setFilteredOpportunities(prev => [...prev, response.data]);
          setModalOpen(false);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
        <Navbar />
    
    <div>
      <button
        onClick={() => {
          setIsEditMode(false);
          setModalOpen(true);
          reset();
        }}
        className="bg-blue-500 overflow-y-auto text-white px-4 py-2 rounded mb-4"
      >
        Create Opportunity
      </button>
      
      <div className="overflow-x-auto">
        {filteredOpportunities.length === 0 ? (
          <p className="text-center text-gray-500">No opportunities available</p>
        ) : (
          <div className="min-w-full align-middle">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Timing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Quoted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOpportunities.map((opportunity) => (
                    <tr key={opportunity.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{opportunity.date_created}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{opportunity.opportunity_status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{opportunity.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{opportunity.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{opportunity.courses}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{opportunity.batch_timing}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{opportunity.fee_quoted}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEditClick(opportunity)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(opportunity.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white px-3 py-3 rounded-md  w-1/3">
            <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Opportunity' : 'Create Opportunity'}</h2>
            <form onSubmit={handleSubmit(submitForm)} className="bg-white p-6 rounded-md w-full max-h-screen overflow-y-auto">
              <div className="mb-4">
                <label className="block mb-1">Name:</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="border rounded p-2 w-full"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">CC:</label>
                <input
                  type="text"
                  {...register('cc', { required: 'CC is required' })}
                  className="border rounded p-2 w-full"
                />
                {errors.cc && <p className="text-red-500">{errors.cc.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Phone:</label>
                <input
                  type="text"
                  {...register('phone', { required: 'Phone is required' })}
                  className="border rounded p-2 w-full"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email:</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="border rounded p-2 w-full"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Fee Quoted:</label>
                <input
                  type="number"
                  {...register('fee_quoted', { required: 'Fee Quoted is required' })}
                  className="border rounded p-2 w-full"
                />
                {errors.fee_quoted && <p className="text-red-500">{errors.fee_quoted.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Batch Timing:</label>
                <input
                  type="text"
                  {...register('batch_timing', { required: 'Batch Timing is required' })}
                  className="border rounded p-2 w-full"
                />
                {errors.batch_timing && <p className="text-red-500">{errors.batch_timing.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Opportunity Status:</label>
                <input
                  type="text"
                  {...register('opportunity_status', { required: 'Opportunity Status is required' })}
                  className="border rounded p-2 w-full"
                />
                {errors.opportunity_status && <p className="text-red-500">{errors.opportunity_status.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Opportunity Stage:</label>
                <input
                  type="text"
                  {...register('opportunity_stage', { required: 'Opportunity Stage is required' })}
                  className="border rounded p-2 w-full"
                />
                {errors.opportunity_stage && <p className="text-red-500">{errors.opportunity_stage.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Demo Attended Stage:</label>
                <input
                  type="text"
                  {...register('demo_attended_stage')}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Visited Stage:</label>
                <input
                  type="text"
                  {...register('visited_stage')}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Cold Lead Reason:</label>
                <input
                  type="text"
                  {...register('cold_lead_reason')}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Next Followup:</label>
                <input
                  type="date"
                  {...register('next_followup')}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Lead Source:</label>
                <select
                  {...register('lead_source')}
                  className="border rounded p-2 w-full"
                >
                  <option value="">Select Source</option>
                  {['Direct', 'SocialMedia', 'Referral'].map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Remarks:</label>
                <textarea
                  {...register('remarks')}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
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
                  {isEditMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Opportunities;
