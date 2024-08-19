
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaIdCard } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '@/app/components/navbar';

export default function LeadDetails() {
  const [details, setDetails] = useState({
    name: '',
    opportunitystatus: '',
    CC:'',
    opportunitystage: '',
    Phone:'',
    DemoAttendedStage: '',
    Email:'',
    VisitedStage: '',
    FeeQuoted:'',
    ColdLeadReason: '',
    BatchTiming:'',
    nextFollowUp: new Date(),
    LeadStatus: '',
    LeadSource: '',
    stack:'',
    course: '',
  });

  const [dropdownOptions] = useState({
    LeadSource: ['Online', 'Referral', 'Advertisement'],
    opportunitystatus:['online','Referral','advertisement'],
    opportunitystage:['online','Referral','advertisement'],
    DemoAttendedStage:['online','Referral','advertisement'],
    VisitedStage:['online','Referral','advertisement'],
    ColdLeadReason:['online','Referral','advertisement'],
    LeadStatus:['online','Referral','advertisement'],
    stack: ['Frontend', 'Backend', 'Fullstack'],
    course: ['Course A', 'Course B', 'Course C']
  });

  const router = useRouter();


  const handleChange = (e, key) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: e.target.value,
    }));
  };
  const handleDropdownChange = (key, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };
  const handleDateChange = (date) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      nextFollowUp: date,
    }));
  };
  const handleCancel = () => {
    router.push('/page.js');
  };

  
  const handleCreate = () => {
    router.push('/next-page'); 
  };

  return (
   
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="w-full">
      <header className="sticky top-0 left-0 w-full"> 
         <div className="pb-4">
         <Navbar />
      </div>
        </header>
      
        <div className="container p-8 bg-white scrollable-container">
          <div className="flex justify-start align-center font-bold text-2xl gap-8">
            <FaIdCard className="text-white text-4xl bg-blue-600 border-6" /> Create Lead
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-10">
            {Object.keys(details).map((key, index) => (
              key !== '' && (
                <div key={index} className="flex flex-col p-2 border-b mr-4">
                  <label className="text-gray-400 block mb-1">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                  {dropdownOptions[key] ? (
                    <select
                      value={details[key]}
                      onChange={(e) => handleDropdownChange(key, e.target.value)}
                      className="underline-select"
                    >
                      <option value="" disabled>Select an option</option>
                      {dropdownOptions[key].map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : key === 'nextFollowUp' ? (
                    <DatePicker
                      selected={details.nextFollowUp}
                      onChange={handleDateChange}
                      className="underline-input w-full"
                      dateFormat="dd/MM/yyyy"
                    />
                  ) : (
                    <input
                      type="text"
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                      className="underline-input"
                    />
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6 sticky bottom-0 bg-white py-4">
        <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
        <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded">Create</button>
      </div>
    </div>
  );
}
