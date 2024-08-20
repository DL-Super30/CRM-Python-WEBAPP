

// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { FaIdCard } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from '@/app/components/navbar';

// export default function LeadDetails() {
//   const [details, setDetails] = useState({
//     name: '',
//     opportunitystatus: '',
//     CC: '',
//     opportunitystage: '',
//     Phone: '',
//     ClassMode: '',
//     Email: '',
//     VisitedStage: '',
//     FeeQuoted: '',
//     ColdLeadReason: '',
//     BatchTiming: '',
//     nextFollowUp: new Date(),
//     Status: '',
//     LeadSource: '',
//     stack: '',
//     course: '',
//   });

//   const [dropdownOptions] = useState({
//     LeadSource: ['None', 'Walkin', 'StudentReferral', 'Demo', 'WebSite', 'InboundCall', 'GoogleAdWords', 'FacebookAds', 'GoogleMyBusiness', 'WhatsAppDigitalLync'],
//     opportunitystatus: ['Online', 'Referral', 'Advertisement'],
//     opportunitystage: ['Online', 'Referral', 'Advertisement'],
//     DemoAttendedStage: ['Online', 'Referral', 'Advertisement'],
//     VisitedStage: ['Online', 'Referral', 'Advertisement'],
//     ColdLeadReason: ['Online', 'Referral', 'Advertisement'],
//     Status: ['None', 'NotContacted', 'Attempted', 'WarmLead', 'Opportunity', 'AttendedDemo', 'Visited', 'Registered', 'ColdLead'],
//     stack: ['Frontend', 'Backend', 'Fullstack'],
//     course: ['Angular', 'AWS', 'Azure', 'AWSWithDevOps', 'BusinessAnalyist', 'DevOps', 'FrontEndAngular', 'FrontEndReact', 'Python', 'Java', 'FullStack'],
//     BatchTiming: ['7AM_8AM', '8AM_9AM', '9AM_10AM', '10AM_11AM'],
//     ClassMode: ['HYDClassRoom', 'BLRClassRoom', 'IndiaOnline', 'InternationalOnline']
//   });

//   const router = useRouter();

//   const handleChange = (e, key) => {
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [key]: e.target.value,
//     }));
//   };

//   const handleDropdownChange = (key, value) => {
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [key]: value,
//     }));
//   };

//   const handleDateChange = (date) => {
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       nextFollowUp: date,
//     }));
//   };

//   const handleCancel = () => {
//     router.push('../leads/lead-home');
//   };

//   const handleCreate = async () => {
//     try {
//       const response = await fetch('/api/lead', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(details),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       console.log('Success:', result);

//       router.push('/next-page');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
//       <header className="sticky top-0 left-0 w-full bg-white shadow-md">
//         <div className="pb-4">
//           <Navbar />
//         </div>
//       </header>

//       <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
//         <div className="flex items-center gap-4 font-bold text-xl sm:text-2xl mb-6">
//           <FaIdCard className="text-white text-4xl bg-blue-600 p-2  border-6" />
//           <span>Create Lead</span>
//         </div>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
//           {Object.keys(details).map((key, index) => (
//             key !== '' && (
//               <div key={index} className="flex flex-col p-2 border-b">
//                 <label className="text-gray-500 block mb-1 text-sm sm:text-base">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
//                 {dropdownOptions[key] ? (
//                   <select
//                     value={details[key]}
//                     onChange={(e) => handleDropdownChange(key, e.target.value)}
//                     className="underline-select p-2 border rounded-md text-sm sm:text-base"
//                   >
//                     <option value="" disabled>Select an option</option>
//                     {dropdownOptions[key].map((option, i) => (
//                       <option key={i} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 ) : key === 'nextFollowUp' ? (
//                   <DatePicker
//                     selected={details.nextFollowUp}
//                     onChange={handleDateChange}
//                     className="underline-input w-full p-2 border rounded-md text-sm sm:text-base"
//                     dateFormat="dd/MM/yyyy"
//                   />
//                 ) : (
//                   <input
//                     type="text"
//                     value={details[key]}
//                     onChange={(e) => handleChange(e, key)}
//                     className="underline-input p-2 border rounded-md text-sm sm:text-base"
//                   />
//                 )}
//               </div>
//             )
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center gap-4 mt-6 bg-white py-4">
//         <button onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md text-sm sm:text-base">Cancel</button>
//         <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md text-sm sm:text-base">Create</button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CreateLeads() {
  const [leads, setLeads] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = async (formValues) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/leads/', formValues);
      const { data } = response;
      setLeads([...leads, data]);
      alert('Lead created successfully');
    } catch (error) {
      console.error('Error creating lead:', error);

      // Handle specific cases
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        
        // Show user-friendly error messages based on response status
        alert(`Error: ${error.response.status} - ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request data:', error.request);
        alert('No response received from the server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-6">Lead Module</h3>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-2">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('name', { required: 'Name is mandatory' })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="cc" className="block text-sm font-medium text-gray-700">CC</label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('cc', { required: 'CC is mandatory' })}
              />
              {errors.cc && <p className="text-red-500 text-sm">{errors.cc.message}</p>}
            </div>

            <div>
              <label htmlFor="contact_no" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('contact_no', { required: 'Phone number is mandatory' })}
              />
              {errors.contact_no && <p className="text-red-500 text-sm">{errors.contact_no.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('email', { required: 'Email is mandatory' })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="fee_coated" className="block text-sm font-medium text-gray-700">Fee Coated</label>
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('fee_coated', { required: 'Fee is mandatory' })}
              />
              {errors.fee_coated && <p className="text-red-500 text-sm">{errors.fee_coated.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('description', { required: 'Description is mandatory' })}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('date', { required: 'Date is mandatory' })}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="lead_source" className="block text-sm font-medium text-gray-700">Lead Source</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('lead_source', { required: 'Lead Source is mandatory' })}
              >
                <option value="">Select</option>
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
              {errors.lead_source && <p className="text-red-500 text-sm">{errors.lead_source.message}</p>}
            </div>

            <div>
              <label htmlFor="batch_timing" className="block text-sm font-medium text-gray-700">Batch Timing</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('batch_timing', { required: 'Batch Timing is mandatory' })}
              >
                <option value="">Select</option>
                <option value="7AM_8AM">7AM_8AM</option>
                <option value="8AM_9AM">8AM_9AM</option>
                <option value="9AM_10AM">9AM_10AM</option>
                <option value="10AM_11AM">10AM_11AM</option>
              </select>
              {errors.batch_timing && <p className="text-red-500 text-sm">{errors.batch_timing.message}</p>}
            </div>

            <div>
              <label htmlFor="class_mode" className="block text-sm font-medium text-gray-700">Class Mode</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('class_mode', { required: 'Class Mode is mandatory' })}
              >
                <option value="">Select</option>
                <option value="HYDClassRoom">HYDClassRoom</option>
                <option value="BLRClassRoom">BLRClassRoom</option>
                <option value="IndiaOnline">IndiaOnline</option>
                <option value="InternationalOnline">InternationalOnline</option>
              </select>
              {errors.class_mode && <p className="text-red-500 text-sm">{errors.class_mode.message}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('status', { required: 'Status is mandatory' })}
              >
                <option value="">Select</option>
                <option value="NotContacted">NotContacted</option>
                <option value="Attempted">Attempted</option>
                <option value="WarmLead">WarmLead</option>
                <option value="Opportunity">Opportunity</option>
                <option value="AttendedDemo">AttendedDemo</option>
                <option value="Visited">Visited</option>
                <option value="Registered">Registered</option>
                <option value="ColdLead">ColdLead</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            <div>
              <label htmlFor="courses" className="block text-sm font-medium text-gray-700">Courses</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('courses', { required: 'Courses is mandatory' })}
              >
                <option value="">Select</option>
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
                <option value="FullStackMERN">FullStackMERN</option>
                <option value="PowerBI">PowerBI</option>
                <option value="CloudOpsMasters">CloudOpsMasters</option>
                <option value="ServiceNow">ServiceNow</option>
                <option value="NeedCounselling">NeedCounselling</option>
                <option value="SalesForceAdmin">SalesForceAdmin</option>
                <option value="Others">Others</option>
                <option value="React">React</option>
                <option value="Tableau">Tableau</option>
                <option value="Testing">Testing</option>
              </select>
              {errors.courses && <p className="text-red-500 text-sm">{errors.courses.message}</p>}
            </div>

            <div>
              <label htmlFor="stack" className="block text-sm font-medium text-gray-700">Stack</label>
              <select
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('stack', { required: 'Stack is mandatory' })}
              >
                <option value="">Select</option>
                <option value="CloudOps">CloudOps</option>
                <option value="Salesforce">Salesforce</option>
                <option value="FullStack">FullStack</option>
                <option value="DataStack">DataStack</option>
                <option value="ServiceNow">ServiceNow</option>
                <option value="BusinessStack">BusinessStack</option>
                <option value="CareerCounselling">CareerCounselling</option>
              </select>
              {errors.stack && <p className="text-red-500 text-sm">{errors.stack.message}</p>}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
