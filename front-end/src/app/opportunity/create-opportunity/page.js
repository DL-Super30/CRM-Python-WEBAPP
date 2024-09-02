// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { FaIdCard } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from '@/app/components/navbar';

// export default function CreateLeadPage() {
//   const [details, setDetails] = useState({
//     name: '',
//     cc: '',
//     phone: '',
//     email: '',
//     fee_quoted: '',
//     batch_timing: '',
//     lead_status:'',
//     stack: '',
//     class_mode: '',
//     description: '',
//     opportunity_status: '',
//     opportunity_stage: '',
//     demo_attended_stage: '',
//     visited_stage: '',
//     lost_opportunity_reason:'',
//     next_followup: new Date(),
//     lead_source:'',
//     course: '',
//     class_mode: '',

//   });

//   const [errors, setErrors] = useState({});
//   const [showSuccess, setShowSuccess] = useState(false);
//   const router = useRouter();

//   const validate = () => {
//     const errors = {};

//     if (!details.name) errors.name = "Name is required";
//     if (!details.cc) errors.cc = "CC is required";
//     if (!details.phone || !/^\d+$/.test(details.phone)) errors.phone = "Valid phone number is required";
//     if (!details.email || !/\S+@\S+\.\S+/.test(details.email)) errors.email = "Valid email is required";
//     if (!details.fee_quoted || isNaN(parseFloat(details.fee_quoted))) errors.fee_quoted = "Valid fee is required";
//     if (!details.batch_timing) errors.batch_timing = "Batch timing is required";
//     if (!details.description) errors.description = "Description is required";
//     if (!details.opportunity_status) errors.opportunity_status = "opportunity status is required";
//     if (!details.opportunity_stage) errors.opportunity_stage = "opportunity stage is required";
//     if (!details.demo_attended_stage) errors.demo_attended_stage = "demo attended stage is required";
//     if (!details.lost_opportunity_reason) errors.lost_opportunity_reason = "lost opportunity reason is required";


//     if (!details.visited_stage) errors.visited_stage = "visited stage is required";

//     if (!details.lead_source) errors.lead_source = "Lead source is required";
//     if (!details.stack) errors.stack = "Stack is required";
//     if (!details.course) errors.course = "Course is required";
//     if (!details.class_mode) errors.class_mode = "Class mode is required";
//     if (!details.next_followup) errors.next_followup = "Next follow-up date is required";

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e, key) => {
//     const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
//     setDetails(prevDetails => ({
//       ...prevDetails,
//       [key]: value
//     }));
//   };

//   const handleDropdownChange = (key, value) => {
//     setDetails(prevDetails => ({
//       ...prevDetails,
//       [key]: value
//     }));
//   };

//   const handleDateChange = (key, date) => {
//     setDetails(prevDetails => ({
//       ...prevDetails,
//       [key]: date ? date.toISOString() : ''
//     }));
//   };

//   const handleCancel = () => {
//     router.push('/leads/lead-home');
//   };

//   const handleCreate = async () => {
//     if (!validate()) return;

//     try {
//       const requestPayload = {
//         ...details,
//         phone: details.phone,
//         fee_quoted: parseFloat(details.fee_quoted),
//         next_followup: new Date(details.next_followup).toISOString(),
//         created_at: new Date().toISOString()
//       };

//       const response = await fetch('http://18.216.178.154:8000/createleads', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestPayload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error response data:', errorData);
//         throw new Error(errorData.message || 'An unknown error occurred');
//       }

//       setShowSuccess(true);
//       setTimeout(() => router.push('/leads/lead-home'), 2000);
//     } catch (error) {
//       console.error('Error creating lead:', error);
//       alert(`Error creating lead: ${error.message}`);
//     }
//   };


//   return (
//   <div className="relative min-h-screen bg-gray-10 w-full">
//   <header className="sticky top-0 left-0 w-full">
//     <Navbar />
//   </header>
//   <div>
//     <div className="container mx-auto p-10 bg-white rounded-lg border-gray-600 shadow-lg">
//       <div className="flex flex-col h-[calc(100vh-160px)]">
//         <div className="flex items-center gap-4 font-bold text-xl sm:text-2xl mb-6">
//           <FaIdCard className="text-white text-4xl bg-blue-600 p-2 border-6" />
//           <span>Create Opportunity</span>
//         </div>
//         <div className="overflow-y-auto">
//           <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
//             {Object.keys(details).map((key, index) => (
//               <div key={index} className="flex flex-col border-b border-b-2 border-b-gray-400">
//                 <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">
//                   {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
//                 </label>
//                 {dropdownOptions[key] ? (
//                   <select
//                     value={details[key]}
//                     onChange={(e) => handleDropdownChange(key, e.target.value)}
//                     className="underline-select p-2 text-sm sm:text-base"
//                   >
//                     <option value="" disabled>Select an option</option>
//                     {dropdownOptions[key].map((option, i) => (
//                       <option key={i} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 ) : key === 'next_followup' ? (
//                   <DatePicker
//                     selected={details[key] ? new Date(details[key]) : new Date()}
//                     onChange={(date) => handleDateChange(key, date)}
//                     className="underline-input w-full p-2 text-sm sm:text-base border-black"
//                     dateFormat="dd/MM/yyyy"
//                   />
//                 ) : (
//                   <input
//                     type={typeof details[key] === 'number' ? 'number' : 'text'}
//                     value={details[key]}
//                     onChange={(e) => handleChange(e, key)}
//                     className="underline-input p-2 text-sm sm:text-base"
//                   />
//                 )}
//                 {errors[key] && <span className="text-red-500 text-sm">{errors[key]}</span>}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center gap-4 mt-6 sticky bottom-0 bg-white py-4">
//         <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
//         <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded">Create</button>
//      </div>
//     </div>
//   </div>
//   {showSuccess && (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
//         <div className="flex items-center gap-2">
//           <FaIdCard className="text-2xl" />
//           <span className="text-lg font-semibold">Lead Created Successfully!</span>
//         </div>
//         <button
//           onClick={() => setShowSuccess(false)}
//           className="mt-4 bg-white text-green-500 py-2 px-4 rounded-md shadow-md"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   )}
// </div>
// );
// }

// const dropdownOptions = {
// opportunity_status: ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'],
// lead_status: ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'],
// lost_opportunity_reason: ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'],

// opportunity_stage: ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'],
// demo_attended_stage: ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'],
// visited_stage: ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'],
// class_mode: ['BLR Online', 'BLR Offline', 'HYD Online', 'HYD Offline'],
// lead_source: ['None', 'Walk In', 'Student Referral', 'Demo', 'Website', 'Google Ads', 'Facebook Ads'],
// stack: ['Life Skills', 'Study Abroad', 'HR'],
// course: ['Life Skills', 'Full Stack', 'DevOps', 'Aptitude'],
// };


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
    lead_status: '',
    stack: '',
    class_mode: '',
    opportunity_status: '',
    opportunity_stage: '',
    demo_attended_stage: '',
    visited_stage: '',
    lost_opportunity_reason: '',
    next_followup: new Date(),
    lead_source: '',
    course: '',
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
    if (!details.opportunity_status) errors.opportunity_status = "Opportunity status is required";
    if (!details.opportunity_stage) errors.opportunity_stage = "Opportunity stage is required";
    if (!details.demo_attended_stage) errors.demo_attended_stage = "Demo attended stage is required";
    if (!details.visited_stage) errors.visited_stage = "Visited stage is required";
    if (!details.lost_opportunity_reason) errors.lost_opportunity_reason = "Lost opportunity reason is required";
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
    <div className="relative min-h-screen bg-gray-10 w-full">
      <header className="sticky top-0 left-0 w-full">
        <Navbar />
      </header>
      <div>
        <div className="container mx-auto p-10 bg-white rounded-lg border-gray-600 shadow-lg">
          <div className="flex flex-col h-[calc(100vh-160px)]">
            <div className="flex items-center gap-4 font-bold text-xl sm:text-2xl mb-6">
              <FaIdCard className="text-white text-4xl bg-blue-600 p-2 border-6" />
              <span>Create Opportunity</span>
            </div>
            <div className="overflow-y-auto">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
                {/* Left side fields */}
                <div>
                  <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                    <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">NAME:</label>
                    <input
                      type="text"
                      value={details.name}
                      onChange={(e) => handleChange(e, 'name')}
                      className="underline-input p-2 text-sm sm:text-base"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                    <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">CC:</label>
                    <input
                      type="text"
                      value={details.cc}
                      onChange={(e) => handleChange(e, 'cc')}
                      className="underline-input p-2 text-sm sm:text-base"
                    />
                    {errors.cc && <span className="text-red-500 text-sm">{errors.cc}</span>}
                  </div>

                  <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                    <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">PHONE:</label>
                    <input
                      type="text"
                      value={details.phone}
                      onChange={(e) => handleChange(e, 'phone')}
                      className="underline-input p-2 text-sm sm:text-base"
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                  </div>

                  <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                    <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">EMAIL:</label>
                    <input
                      type="text"
                      value={details.email}
                      onChange={(e) => handleChange(e, 'email')}
                      className="underline-input p-2 text-sm sm:text-base"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                    <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">FEE QUOTED:</label>
                    <input
                      type="text"
                      value={details.fee_quoted}
                      onChange={(e) => handleChange(e, 'fee_quoted')}
                      className="underline-input p-2 text-sm sm:text-base"
                    />
                    {errors.fee_quoted && <span className="text-red-500 text-sm">{errors.fee_quoted}</span>}
                  </div>

                  <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                    <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">BATCH TIMING:</label>
                    <input
                      type="text"
                      value={details.batch_timing}
                      onChange={(e) => handleChange(e, 'batch_timing')}
                      className="underline-input p-2 text-sm sm:text-base"
                    />
                    {errors.batch_timing && <span className="text-red-500 text-sm">{errors.batch_timing}</span>}
                  </div>

                  <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                    <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">LEAD STATUS:</label>
                    <select
                      value={details.lead_status}
                      onChange={(e) => handleDropdownChange('lead_status', e.target.value)}
                      className="underline-select p-2 text-sm sm:text-base"
                    >
                      <option value="" disabled>Select an option</option>
                      {dropdownOptions.lead_status.map((option, i) => (
                                              <option key={i} value={option}>{option}</option>
                                            ))}
                                          </select>
                                          {errors.lead_status && <span className="text-red-500 text-sm">{errors.lead_status}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">STACK:</label>
                                          <input
                                            type="text"
                                            value={details.stack}
                                            onChange={(e) => handleChange(e, 'stack')}
                                            className="underline-input p-2 text-sm sm:text-base"
                                          />
                                          {errors.stack && <span className="text-red-500 text-sm">{errors.stack}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">CLASS MODE:</label>
                                          <select
                                            value={details.class_mode}
                                            onChange={(e) => handleDropdownChange('class_mode', e.target.value)}
                                            className="underline-select p-2 text-sm sm:text-base"
                                          >
                                            <option value="" disabled>Select an option</option>
                                            {dropdownOptions.class_mode.map((option, i) => (
                                              <option key={i} value={option}>{option}</option>
                                            ))}
                                          </select>
                                          {errors.class_mode && <span className="text-red-500 text-sm">{errors.class_mode}</span>}
                                        </div>
                                      </div>
                      
                                      {/* Right side fields */}
                                      <div>
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">DESCRIPTION:</label>
                                          <input
                                            type="text"
                                            value={details.description}
                                            onChange={(e) => handleChange(e, 'description')}
                                            className="underline-input p-2 text-sm sm:text-base w-full"
                                          />
                                          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">OPPORTUNITY STATUS:</label>
                                          <select
                                            value={details.opportunity_status}
                                            onChange={(e) => handleDropdownChange('opportunity_status', e.target.value)}
                                            className="underline-select p-2 text-sm sm:text-base"
                                          >
                                            <option value="" disabled>Select an option</option>
                                            {dropdownOptions.opportunity_status.map((option, i) => (
                                              <option key={i} value={option}>{option}</option>
                                            ))}
                                          </select>
                                          {errors.opportunity_status && <span className="text-red-500 text-sm">{errors.opportunity_status}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">OPPORTUNITY STAGE:</label>
                                          <select
                                            value={details.opportunity_stage}
                                            onChange={(e) => handleDropdownChange('opportunity_stage', e.target.value)}
                                            className="underline-select p-2 text-sm sm:text-base"
                                          >
                                            <option value="" disabled>Select an option</option>
                                            {dropdownOptions.opportunity_stage.map((option, i) => (
                                              <option key={i} value={option}>{option}</option>
                                            ))}
                                          </select>
                                          {errors.opportunity_stage && <span className="text-red-500 text-sm">{errors.opportunity_stage}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">DEMO ATTENDED STAGE:</label>
                                          <select
                                            value={details.demo_attended_stage}
                                            onChange={(e) => handleDropdownChange('demo_attended_stage', e.target.value)}
                                            className="underline-select p-2 text-sm sm:text-base"
                                          >
                                            <option value="" disabled>Select an option</option>
                                            {dropdownOptions.demo_attended_stage.map((option, i) => (
                                              <option key={i} value={option}>{option}</option>
                                            ))}
                                          </select>
                                          {errors.demo_attended_stage && <span className="text-red-500 text-sm">{errors.demo_attended_stage}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">VISITED STAGE:</label>
                                          <select
                                            value={details.visited_stage}
                                            onChange={(e) => handleDropdownChange('visited_stage', e.target.value)}
                                            className="underline-select p-2 text-sm sm:text-base"
                                          >
                                            <option value="" disabled>Select an option</option>
                                            {dropdownOptions.visited_stage.map((option, i) => (
                                              <option key={i} value={option}>{option}</option>
                                            ))}
                                          </select>
                                          {errors.visited_stage && <span className="text-red-500 text-sm">{errors.visited_stage}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">LOST OPPORTUNITY REASON:</label>
                                          <input
                                            type="text"
                                            value={details.lost_opportunity_reason}
                                            onChange={(e) => handleChange(e, 'lost_opportunity_reason')}
                                            className="underline-input p-2 text-sm sm:text-base"
                                          />
                                          {errors.lost_opportunity_reason && <span className="text-red-500 text-sm">{errors.lost_opportunity_reason}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">NEXT FOLLOWUP:</label>
                                          <DatePicker
                                            selected={new Date(details.next_followup)}
                                            onChange={(date) => handleDateChange('next_followup', date)}
                                            className="underline-input p-2 text-sm sm:text-base w-full"
                                          />
                                          {errors.next_followup && <span className="text-red-500 text-sm">{errors.next_followup}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">LEAD SOURCE:</label>
                                          <input
                                            type="text"
                                            value={details.lead_source}
                                            onChange={(e) => handleChange(e, 'lead_source')}
                                            className="underline-input p-2 text-sm sm:text-base"
                                          />
                                          {errors.lead_source && <span className="text-red-500 text-sm">{errors.lead_source}</span>}
                                        </div>
                      
                                        <div className="flex flex-col border-b border-b-2 border-b-gray-400">
                                          <label className="text-gray-400 block mb-1 text-sm sm:text-base font-bold">COURSE:</label>
                                          <input
                                            type="text"
                                            value={details.course}
                                            onChange={(e) => handleChange(e, 'course')}
                                            className="underline-input p-2 text-sm sm:text-base"
                                          />
                                          {errors.course && <span className="text-red-500 text-sm">{errors.course}</span>}
                                        </div>
                                      </div>
                                    </div>
                      
                                    <div className="flex justify-between mt-6">
                                      <button
                                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleCreate}
                                      >
                                        Create
                                      </button>
                                      <button
                                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                      
                                    {showSuccess && (
                                      <div className="mt-4 text-green-600 font-bold">
                                        Lead created successfully! Redirecting...
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      
                      const dropdownOptions = {
                        lead_status: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'],
                        class_mode: ['Online', 'Offline'],
                        opportunity_status: ['Active', 'Inactive'],
                        opportunity_stage: ['Initial Contact', 'Discovery', 'Proposal', 'Negotiation', 'Closed'],
                        demo_attended_stage: ['Scheduled', 'Completed', 'Missed'],
                        visited_stage: ['Yes', 'No'],
                      };
                      