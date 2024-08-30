

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaIdCard } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '@/app/components/navbar';

export default function CreateLeadPage() {
  const [details, setDetails] = useState({
    name: '',
    cc: '',
    phone: '',
    email: '',
    fee_quoted: '',
    batch_timing: '',
    description: '',
    lead_status: '',
    lead_source: '',
    stack: '',
    course: '',
    class_mode: '',
    next_followup: new Date(),
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const validate = () => {
    const errors = {};

    if (!details.name) errors.name = "Name is required";
    if (!details.cc) errors.cc = "CC is required";
    if (!details.phone || !/^\d+$/.test(details.phone)) errors.phone = "Valid phone number is required";
    if (!details.email || !/\S+@\S+\.\S+/.test(details.email)) errors.email = "Valid email is required";
    if (!details.fee_quoted || isNaN(parseFloat(details.fee_quoted))) errors.fee_quoted = "Valid fee is required";
    if (!details.batch_timing) errors.batch_timing = "Batch timing is required";
    if (!details.description) errors.description = "Description is required";
    if (!details.lead_status) errors.lead_status = "Lead status is required";
    if (!details.lead_source) errors.lead_source = "Lead source is required";
    if (!details.stack) errors.stack = "Stack is required";
    if (!details.course) errors.course = "Course is required";
    if (!details.class_mode) errors.class_mode = "Class mode is required";
    if (!details.next_followup) errors.next_followup = "Next follow-up date is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e, key) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setDetails(prevDetails => ({
      ...prevDetails,
      [key]: value
    }));
  };

  const handleDropdownChange = (key, value) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      [key]: value
    }));
  };

  const handleDateChange = (key, date) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      [key]: date ? date.toISOString() : ''
    }));
  };

  const handleCancel = () => {
    router.push('/leads/lead-home');
  };

  const handleCreate = async () => {
    if (!validate()) return;

    try {
      const requestPayload = {
        ...details,
        phone: details.phone,
        fee_quoted: parseFloat(details.fee_quoted),
        next_followup: new Date(details.next_followup).toISOString(),
        created_at: new Date().toISOString()
      };

      const response = await fetch('http://18.216.178.154:8000/createleads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        throw new Error(errorData.message || 'An unknown error occurred');
      }

      setShowSuccess(true);
      setTimeout(() => router.push('/leads/lead-home'), 2000);
    } catch (error) {
      console.error('Error creating lead:', error);
      alert(`Error creating lead: ${error.message}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 w-full">
      <header className="sticky top-0 left-0 w-full bg-white shadow-md">
        <Navbar />
      </header>
      <div className="container mx-auto p-4 sm:p-6 lg:p-16 bg-white rounded-lg border-gray-600 shadow-lg">
        <div className="flex flex-col h-[calc(100vh-160px)]">
          <div className="flex items-center gap-4 font-bold text-xl sm:text-2xl mb-6">
            <FaIdCard className="text-white text-3xl sm:text-4xl bg-blue-600 p-2 border-4 sm:border-6" />
            <span>Create Lead</span>
          </div>
          <div className="flex-1 overflow-y-auto lg:overflow-y-auto scrollbar-hidden lg:scrollbar-auto">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              {Object.keys(details).map((key, index) => (
                <div key={index} className="flex flex-col border-b border-gray-400">
                  <label className="text-gray-600 block mb-1 text-sm sm:text-base font-bold">
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                  </label>
                  {dropdownOptions[key] ? (
                    <select
                      value={details[key]}
                      onChange={(e) => handleDropdownChange(key, e.target.value)}
                      className="underline-select p-2 text-sm sm:text-base border rounded-md"
                    >
                      <option value="" disabled>Select an option</option>
                      {dropdownOptions[key].map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : key === 'next_followup' ? (
                    <DatePicker
                      selected={details[key] ? new Date(details[key]) : new Date()}
                      onChange={(date) => handleDateChange(key, date)}
                      className="underline-input w-full p-2 text-sm sm:text-base border rounded-md"
                      dateFormat="dd/MM/yyyy"
                    />
                  ) : (
                    <input
                      type={typeof details[key] === 'number' ? 'number' : 'text'}
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                      className="underline-input p-2 text-sm sm:text-base border rounded-md"
                    />
                  )}
                  {errors[key] && <span className="text-red-500 text-sm">{errors[key]}</span>}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md text-sm sm:text-base">Cancel</button>
              <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md text-sm sm:text-base">Create</button>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <FaIdCard className="text-2xl" />
              <span className="text-lg font-semibold">Lead Created Successfully!</span>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 bg-white text-green-500 py-2 px-4 rounded-md shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const dropdownOptions = {
  lead_status: ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'],
  class_mode: ['BLR Online', 'BLR Offline', 'HYD Online', 'HYD Offline'],
  lead_source: ['None', 'Walk In', 'Student Referral', 'Demo', 'Website', 'Google Ads', 'Facebook Ads'],
  stack: ['Life Skills', 'Study Abroad', 'HR'],
  course: ['Life Skills', 'Full Stack', 'DevOps', 'Aptitude'],
};
