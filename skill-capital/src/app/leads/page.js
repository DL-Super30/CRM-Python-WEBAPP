// "use client"
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// export default function Createleads() {
//   const [leads, setLeads] = useState([]);
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const submitForm = async (formValues) => {
//     try {
//       const { data } = await axios.post('http://127.0.0.1:8000/api/leads/', formValues);
//       setLeads([...leads, data]);
//       alert('Lead created successfully');
//     } catch (error) {
//       console.error('Error creating lead:', error);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h3 className="text-2xl font-bold mb-6">Lead Module</h3>
//       <form onSubmit={handleSubmit(submitForm)}>
//         <div className="grid grid-cols-3 gap-6 sm:grid-cols-2">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//               <input type="text" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('name', { required: true })} />
//               {errors.name && <p className="text-red-500 text-sm">Name is mandatory</p>}
//             </div>

//             <div>
//               <label htmlFor="cc" className="block text-sm font-medium text-gray-700">CC</label>
//               <input type="number" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('cc', { required: true })} />
//               {errors.cc && <p className="text-red-500 text-sm">CC is mandatory</p>}
//             </div>

//             <div>
//               <label htmlFor="contact_no" className="block text-sm font-medium text-gray-700">Phone</label>
//               <input type="number" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('contact_no', { required: true })} />
//               {errors.contact_no && <p className="text-red-500 text-sm">Phone number is mandatory</p>}
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input type="email" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('email', { required: true })} />
//               {errors.email && <p className="text-red-500 text-sm">Email is mandatory</p>}
//             </div>

//             <div>
//               <label htmlFor="fee_coated" className="block text-sm font-medium text-gray-700">Fee Coated</label>
//               <input type="number" step="0.01" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('fee_coated', { required: true })} />
//               {errors.fee_coated && <p className="text-red-500 text-sm">Fee is mandatory</p>}
//             </div>

//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('description', { required: true })}></textarea>
//               {errors.description && <p className="text-red-500 text-sm">Description is mandatory</p>}
//             </div>

//             <div>
//               <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//               <input type="date" className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('date', { required: true })} />
//               {errors.date && <p className="text-red-500 text-sm">Date is mandatory</p>}
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label htmlFor="lead_source" className="block text-sm font-medium text-gray-700">Lead Source</label>
//               <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('lead_source', { required: true })}>
//                 <option value="None">None</option>
//                 <option value="WalkIn">WalkIn</option>
//                 <option value="StudentReferral">StudentReferral</option>
//                 <option value="Demo">Demo</option>
//                 <option value="WebSite">WebSite</option>
//                 <option value="WebsiteChat">WebsiteChat</option>
//                 <option value="InboundCall">InboundCall</option>
//                 <option value="GoogleAdWords">GoogleAdWords</option>
//                 <option value="FacebookAds">FacebookAds</option>
//                 <option value="GoogleMyBusiness">GoogleMyBusiness</option>
//                 <option value="WhatsAppDigitalLync">WhatsAppDigitalLync</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="batch_timing" className="block text-sm font-medium text-gray-700">Batch Timing</label>
//               <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('batch_timing', { required: true })}>
//                 <option value="7AM_8AM">7AM_8AM</option>
//                 <option value="8AM_9AM">8AM_9AM</option>
//                 <option value="9AM_10AM">9AM_10AM</option>
//                 <option value="10AM_11AM">10AM_11AM</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="class_mode" className="block text-sm font-medium text-gray-700">ClassMode</label>
//               <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('ClassMode', { required: true })}>
//                 <option value="HYDClassRoom">HYDClassRoom</option>
//                 <option value="BLRClassRoom">BLRClassRoom</option>
//                 <option value="IndiaOnline">IndiaOnline</option>
//                 <option value="InternationalOnline">InternationalOnline</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="Status" className="block text-sm font-medium text-gray-700">Status</label>
//               <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('Status', { required: true })}>
//                 <option value="None">None</option>
//                 <option value="NotContacted">NotContacted</option>
//                 <option value="Attempted">Attempted</option>
//                 <option value="WarmLead">WarmLead</option>
//                 <option value="Opportunity">Opportunity</option>
//                 <option value="AttendedDemo">AttendedDemo</option>
//                 <option value="Visited">Visited</option>
//                 <option value="Registered">Registered</option>
//                 <option value="ColdLead">ColdLead</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="Courses" className="block text-sm font-medium text-gray-700">Courses</label>
//               <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('Courses', { required: true })}>
//                 <option value="Angular">Angular</option>
//                 <option value="AWS">AWS</option>
//                 <option value="Azure">Azure</option>
//                 <option value="AWSWithDevOps">AWSWithDevOps</option>
//                 <option value="BusinessAnalyst">BusinessAnalyst</option>
//                 <option value="DevOps">DevOps</option>
//                 <option value="FrontEndAngular">FrontEndAngular</option>
//                 <option value="FrontEndReact">FrontEndReact</option>
//                 <option value="Python">Python</option>
//                 <option value="Java">Java</option>
//                 <option value="FullStackMEAN">FullStackMEAN</option>
//                 <option value="FullStackJAVA">FullStackJAVA</option>
//                 <option value="FullstackPython">FullstackPython</option>
//                 <option value="FullStackMERN">FullStackMERN</option>
//                 <option value="PowerBI">PowerBI</option>
//                 <option value="CloudOpsMasters">CloudOpsMasters</option>
//                 <option value="ServiceNow">ServiceNow</option>
//                 <option value="NeedCounselling">NeedCounselling</option>
//                 <option value="SalesForceAdmin">SalesForceAdmin</option>
//                 <option value="Others">Others</option>
//                 <option value="React">React</option>
//                 <option value="Tableau">Tableau</option>
//                 <option value="Testing">Testing</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="Stack" className="block text-sm font-medium text-gray-700">Stack</label>
//               <select className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('Stack', { required: true })}>
//                 <option value="CloudOps">CloudOps</option>
//                 <option value="Salesforce">Salesforce</option>
//                 <option value="FullStack">FullStack</option>
//                 <option value="DataStack">DataStack</option>
//                 <option value="ServiceNow">ServiceNow</option>
//                 <option value="BusinessStack">BusinessStack</option>
//                 <option value="CareerCounselling">CareerCounselling</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <button type="submit" className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';

export default function CreateLeads() {
  const [leads, setLeads] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = async (formValues) => {
    try {
      const { data } = await axios.post('http://3.83.12.107:8000/api/leads/', formValues);
      setLeads([...leads, data]);
      alert('Lead created successfully');
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  return (
    
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-6">Lead Module</h3>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700"><Link href={`/leaduserdetails/${leads.id}`}>
            <a>{leads.name}</a>
          </Link></label>
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
        <button type="submit" className="mt-6 w-full bg-indigo-600 text-white p-2 rounded-md">Submit</button>
      </form>
    </div>
  );
}