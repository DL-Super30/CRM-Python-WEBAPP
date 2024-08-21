
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
    phone: 0,
    email: '',
    fee_quoted: 0,
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
  const router = useRouter();

  // Validation logic
  const validate = () => {
    const errors = {};

    if (!details.name) errors.name = "Name is required";
    if (!details.cc) errors.cc = "CC is required";
    if (!details.phone || isNaN(details.phone)) errors.phone = "Valid phone number is required";
    if (!details.email || !/\S+@\S+\.\S+/.test(details.email)) errors.email = "Valid email is required";
    if (!details.fee_quoted || isNaN(details.fee_quoted)) errors.fee_quoted = "Valid fee is required";
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

  // Handle input changes
  const handleChange = (e, key) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setDetails(prevDetails => ({
      ...prevDetails,
      [key]: value
    }));
  };

  // Handle dropdown changes
  const handleDropdownChange = (key, value) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      [key]: value
    }));
  };

  // Handle date changes
  const handleDateChange = (key, date) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      [key]: date.toISOString()
    }));
  };


  const handleCancel = () => {
    router.push('/leads/lead-home');
  };

 
  const handleCreate = async () => {
    if (!validate()) return;

    try {
      console.log('Submitting details:', details);

      const response = await fetch('http://44.202.26.131:8000/Insert%20Leads/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        throw new Error(`Error: ${errorData.message || 'An error occurred'}`);
      }

      console.log('Success! Redirecting...');
      router.push('/leads/lead-home');
    } catch (error) {
      console.error('Error creating lead:', error.message);
      alert(`Error creating lead: ${error.message}`);
    }
  };

  return (
    <div className="">
      <header className="sticky top-0 left-0 w-full">
        <div className="w-full">
          <Navbar />
        </div>
      </header>
      <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 w-full">
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-md w-full">
          <div className="flex items-center gap-4 font-bold text-xl sm:text-2xl mb-6">
            <FaIdCard className="text-white text-4xl bg-blue-600 p-2 border-6" />
            <span>Create Lead</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {Object.keys(details).map((key, index) => (
              <div key={index} className="flex flex-col p-2 border-b">
                <label className="text-gray-500 block mb-1 text-sm sm:text-base">
                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                </label>
                {dropdownOptions[key] ? (
                  <select
                    value={details[key]}
                    onChange={(e) => handleDropdownChange(key, e.target.value)}
                    className="underline-select p-2 border rounded-md text-sm sm:text-base"
                  >
                    <option value="" disabled>Select an option</option>
                    {dropdownOptions[key].map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                ) : key === 'next_followup' ? (
                  <DatePicker
                    selected={new Date(details[key])}
                    onChange={(date) => handleDateChange(key, date)}
                    className="underline-input w-full p-2 border rounded-md text-sm sm:text-base"
                    dateFormat="dd/MM/yyyy"
                  />
                ) : (
                  <input
                    type={typeof details[key] === 'number' ? 'number' : 'text'}
                    value={details[key]}
                    onChange={(e) => handleChange(e, key)}
                    className="underline-input p-2 border rounded-md text-sm sm:text-base"
                  />
                )}
                {errors[key] && <span className="text-red-500 text-sm">{errors[key]}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6 bg-white py-4">
          <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md text-sm sm:text-base">Cancel</button>
          <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md text-sm sm:text-base">Create</button>
        </div>
      </div>
    </div>
  );
}

const dropdownOptions = {
  lead_status: ['Status 1', 'Status 2'],
  class_mode: ['Online', 'Offline'],
  lead_source: ['Source 1', 'Source 2'],
  stack: ['Web', 'Mobile'],
  course: ['Course 1', 'Course 2'],
};
