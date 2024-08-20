

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
    CC: '',
    opportunitystage: '',
    Phone: '',
    ClassMode: '',
    Email: '',
    VisitedStage: '',
    FeeQuoted: '',
    ColdLeadReason: '',
    BatchTiming: '',
    nextFollowUp: new Date(),
    Status: '',
    LeadSource: '',
    stack: '',
    course: '',
  });

  const [dropdownOptions] = useState({
    LeadSource: ['None', 'Walkin', 'StudentReferral', 'Demo', 'WebSite', 'InboundCall', 'GoogleAdWords', 'FacebookAds', 'GoogleMyBusiness', 'WhatsAppDigitalLync'],
    opportunitystatus: ['Online', 'Referral', 'Advertisement'],
    opportunitystage: ['Online', 'Referral', 'Advertisement'],
    DemoAttendedStage: ['Online', 'Referral', 'Advertisement'],
    VisitedStage: ['Online', 'Referral', 'Advertisement'],
    ColdLeadReason: ['Online', 'Referral', 'Advertisement'],
    Status: ['None', 'NotContacted', 'Attempted', 'WarmLead', 'Opportunity', 'AttendedDemo', 'Visited', 'Registered', 'ColdLead'],
    stack: ['Frontend', 'Backend', 'Fullstack'],
    course: ['Angular', 'AWS', 'Azure', 'AWSWithDevOps', 'BusinessAnalyist', 'DevOps', 'FrontEndAngular', 'FrontEndReact', 'Python', 'Java', 'FullStack'],
    BatchTiming: ['7AM_8AM', '8AM_9AM', '9AM_10AM', '10AM_11AM'],
    ClassMode: ['HYDClassRoom', 'BLRClassRoom', 'IndiaOnline', 'InternationalOnline']
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
    router.push('../leads/lead-home');
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      router.push('/next-page');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="sticky top-0 left-0 w-full bg-white shadow-md">
        <div className="pb-4">
          <Navbar />
        </div>
      </header>

      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-4 font-bold text-xl sm:text-2xl mb-6">
          <FaIdCard className="text-white text-4xl bg-blue-600 p-2  border-6" />
          <span>Create Lead</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {Object.keys(details).map((key, index) => (
            key !== '' && (
              <div key={index} className="flex flex-col p-2 border-b">
                <label className="text-gray-500 block mb-1 text-sm sm:text-base">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
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
                ) : key === 'nextFollowUp' ? (
                  <DatePicker
                    selected={details.nextFollowUp}
                    onChange={handleDateChange}
                    className="underline-input w-full p-2 border rounded-md text-sm sm:text-base"
                    dateFormat="dd/MM/yyyy"
                  />
                ) : (
                  <input
                    type="text"
                    value={details[key]}
                    onChange={(e) => handleChange(e, key)}
                    className="underline-input p-2 border rounded-md text-sm sm:text-base"
                  />
                )}
              </div>
            )
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 bg-white py-4">
        <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md text-sm sm:text-base">Cancel</button>
        <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md text-sm sm:text-base">Create</button>
      </div>
    </div>
  );
}
