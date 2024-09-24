
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaIdCard } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Navbar from "@/app/components/navbar";

// export default function CreateLeadPage() {
//   const [details, setDetails] = useState({
//     name: "",
//     cc: "",
//     phone: "",
//     email: "",
//     fee_quoted: "",
//     batch_timing: "",
//     lead_status: "",
//     stack: "",
//     class_mode: "",
//     description: "",
//     opportunity_status: "",
//     opportunity_stage: "",
//     demo_attended_stage: "",
//     visited_stage: "",
//     lost_opportunity_reason: "",
//     next_followup: new Date(),
//     lead_source: "",
//     course: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
  
//   const dropdownOptions = {
//     lead_status: ["New", "In Progress", "Completed", "Closed"],
//     class_mode: ["International Online","India Online", "BLR Class room", "Hyd Class room"],
//     opportunity_status: ["Visiting", "Visited", "Demo Attended","Lost Opportunitty"],
//     opportunity_stage: ["None", "Advanced Discussion", "Ready To Join","Visiting","Fee Negotiation","Batch allocation","Inserted to Demo","Closed Lost"],
//     demo_attended_stage: ["None", "Advanced Discussion", "Ready To Join","Visiting","Fee Negotiation","Batch allocation","Inserted to Demo","Closed Lost"],
//     visited_stage: ["None", "Advanced Discussion", "Ready To Join","Visiting","Fee Negotiation","Batch allocation","Inserted to Demo","Closed Lost","Not Visited", "Visited"],
//     batch_timing:["7AM-8AM","8AM-9AM","9AM-10AM","10AM-11AM","11AM-12PM","12PM-01PM","01PM-02PM","02PM-03PM","03PM-04PM","04PM-05PM","05PM-06PM","06PM-07PM","07PM-08PM","08PM-09PM"],
//     stack:["Life skills","Study Abroad","HR"],
//     lost_opportunity_reason:["None","Invalid Number","Not Interested","Joined other Institute"],
//     lead_source:['None', 'Walk In', 'Student Referral', 'Demo', 'Website', 'Google Ads', 'Facebook Ads'],
//     course:["Life skills","Study Abroad","HR"]
//   };

//   const validate = () => {
//     const errors = {};
//     if (!details.opportunity_status) errors.opportunity_status = "Field required";
//     if (!details.opportunity_stage) errors.opportunity_stage = "Field required";
//     if (!details.demo_attended_stage) errors.demo_attended_stage = "Field required";
//     if (!details.lost_opportunity_reason) errors.lost_opportunity_reason = "Field required";

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e, key) => {
//     const value = e.target.value;
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [key]: value,
//     }));
//   };

//   const handleDateChange = (key, date) => {
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [key]: date ? date.toISOString() : "",
//     }));
//   };

//   const handleCreate = async () => {
//     if (!validate()) return;
//     setLoading(true);
//     const formattedDetails = {
//       ...details,
//       oppo_status: details.opportunity_status,
//       oppo_stage: details.opportunity_stage,
//       Demo_stage: details.demo_attended_stage,
//       lost_reason: details.lost_opportunity_reason,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:8000/createopportunity", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formattedDetails),
//       });

//       if (!response.ok) {
//         throw new Error("Error creating lead");
//       }

//       setShowSuccess(true);
//       setTimeout(() => {
//         router.push("/opportunity/home-page");
//         resetForm();
//       }, 2000);
//     } catch (error) {
//       console.error("Error:", error);
//       alert(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setDetails({
//       name: "",
//       cc: "",
//       phone: "",
//       email: "",
//       fee_quoted: "",
//       batch_timing: "",
//       lead_status: "",
//       stack: "",
//       class_mode: "",
//       description: "",
//       opportunity_status: "",
//       opportunity_stage: "",
//       demo_attended_stage: "",
//       visited_stage: "",
//       lost_opportunity_reason: "",
//       next_followup: new Date(),
//       lead_source: "",
//       course: "",
//     });
//     setErrors({});
//   };

//   return (
    
//         <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[100vh] flex flex-col">
//           <div className="flex items-center gap-4 font-bold text-xl sm:text-2xl mb-6">
//             <FaIdCard className="text-white text-4xl bg-blue-600 p-2 border-6" />
//             <span>Create Opportunity</span>
//           </div>
//           <div className="overflow-y-auto grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
//             {/* Left side fields */}
//             <div>
//               <Field
//                 label="Name"
//                 value={details.name}
//                 error={errors.name}
//                 onChange={(e) => handleChange(e, "name")}
//               />
//               <Field
//                 label="CC"
//                 value={details.cc}
//                 error={errors.cc}
//                 onChange={(e) => handleChange(e, "cc")}
//               />
//               <Field
//                 label="Phone"
//                 value={details.phone}
//                 error={errors.phone}
//                 onChange={(e) => handleChange(e, "phone")}
//               />
//               <Field
//                 label="Email"
//                 value={details.email}
//                 error={errors.email}
//                 onChange={(e) => handleChange(e, "email")}
//               />
//               <Field
//                 label="Fee Quoted"
//                 value={details.fee_quoted}
//                 error={errors.fee_quoted}
//                 onChange={(e) => handleChange(e, "fee_quoted")}
//               />
//               <SelectField
//                 label="Batch Timing"
//                 value={details.batch_timing}
//                 options={dropdownOptions.batch_timing}
//                 error={errors.batch_timing}
//                 onChange={(e) => handleChange(e, "batch_timing")}
//               />
//               <SelectField
//                 label="Lead Status"
//                 value={details.lead_status}
//                 options={dropdownOptions.lead_status}
//                 error={errors.lead_status}
//                 onChange={(e) => handleChange(e, "lead_status")}
//               />
//               <SelectField
//                 label="Stack"
//                 value={details.stack}
//                 options={dropdownOptions.stack}
//                 error={errors.stack}
//                 onChange={(e) => handleChange(e, "stack")}
//               />
//               <SelectField
//                 label="Class Mode"
//                 value={details.class_mode}
//                 options={dropdownOptions.class_mode}
//                 error={errors.class_mode}
//                 onChange={(e) => handleChange(e, "class_mode")}
//               />
//               <Field
//                 label="Description"
//                 value={details.description}
//                 error={errors.description}
//                 onChange={(e) => handleChange(e, "description")}
//               />
//             </div>
//             {/* Right side fields */}
//             <div>
//               <SelectField
//                 label="Opportunity Status"
//                 value={details.opportunity_status}
//                 options={dropdownOptions.opportunity_status}
//                 error={errors.opportunity_status}
//                 onChange={(e) => handleChange(e, "opportunity_status")}
//               />
//               <SelectField
//                 label="Opportunity Stage"
//                 value={details.opportunity_stage}
//                 options={dropdownOptions.opportunity_stage}
//                 error={errors.opportunity_stage}
//                 onChange={(e) => handleChange(e, "opportunity_stage")}
//               />
//               <SelectField
//                 label="Demo Attended Stage"
//                 value={details.demo_attended_stage}
//                 options={dropdownOptions.demo_attended_stage}
//                 error={errors.demo_attended_stage}
//                 onChange={(e) => handleChange(e, "demo_attended_stage")}
//               />
//               <SelectField
//                 label="Visited Stage"
//                 value={details.visited_stage}
//                 options={dropdownOptions.visited_stage}
//                 error={errors.visited_stage}
//                 onChange={(e) => handleChange(e, "visited_stage")}
//               />
//               <SelectField
//                 label="Lost Opportunity Reason"
//                 value={details.lost_opportunity_reason}
//                 options={dropdownOptions.lost_opportunity_reason}
//                 error={errors.lost_opportunity_reason}
//                 onChange={(e) => handleChange(e, "lost_opportunity_reason")}
//               />
//               <div className="flex flex-col mb-4">
//                 <label className="text-gray-400 font-bold mb-1">Next Follow-up</label>
//                 <DatePicker
//                   selected={new Date(details.next_followup)}
//                   onChange={(date) => handleDateChange("next_followup", date)}
//                   className="outline-none border-b-2 border-gray-400 focus:border-blue-600 p-2 w-full h-12"
//                 />
//                 {errors.next_followup && (
//                   <span className="text-red-500">{errors.next_followup}</span>
//                 )}
//               </div>
//               <SelectField
//                 label="Lead Source"
//                 value={details.lead_source}
//                 options={dropdownOptions.lead_source}
//                 error={errors.lead_source}
//                 onChange={(e) => handleChange(e, "lead_source")}
//                 className="outline-none border-b-2 border-gray-400 focus:border-blue-600 p-2 w-full h-12"
//               />
//               <SelectField
//                 label="Course"
//                 value={details.course}
//                 options={dropdownOptions.course}
//                 error={errors.course}
//                 onChange={(e) => handleChange(e, "course")}
//                 className="outline-none border-b-2 border-gray-400 focus:border-blue-600 p-2 w-full h-12"
//               />
//             </div>
//           </div>
//           {/* Buttons */}
//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md font-semibold"
//               onClick={resetForm}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-blue-600 text-white py-2 px-6 rounded-md font-semibold"
//               onClick={handleCreate}
//               disabled={loading}
//             >
//               {loading ? "Creating..." : "Create"}
//             </button>
//           </div>
//         </div>
    
//   );
// }

// const Field = ({ label, value, error, onChange }) => (
//   <div className="flex flex-col mb-4">
//     <label className="text-gray-400 font-bold mb-1">{label}</label>
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       className="outline-none border-b-2 border-gray-400 focus:border-blue-600 p-2 w-full h-12"
//     />
//     {error && <span className="text-red-500">{error}</span>}
//   </div>
// );

// const SelectField = ({ label, value, options, error, onChange, className }) => (
//   <div className="flex flex-col mb-4">
//     <label className="text-gray-400 font-bold mb-1">{label}</label>
//     <select
//       value={value}
//       onChange={onChange}
//       className={`outline-none border-b-2 border-gray-400 focus:border-blue-600 p-2 w-full h-12 ${className}`}
//     >
//       <option value="">Select an option</option>
//       {options.map((option, index) => (
//         <option key={index} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//     {error && <span className="text-red-500">{error}</span>}
//   </div>
// );
"use client";
import { useState } from "react";
import { FaIdCard } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateOpportunityModal({ onClose }) {
  const [details, setDetails] = useState({
    name: "",
    cc: "",
    phone: "",
    email: "",
    fee_quoted: "",
    batch_timing: "",
    lead_status: "",
    stack: "",
    class_mode: "",
    description: "",
    opportunity_status: "",
    opportunity_stage: "",
    demo_attended_stage: "",
    visited_stage: "",
    lost_opportunity_reason: "",
    next_followup: new Date(),
    lead_source: "",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dropdownOptions = {
    lead_status: ["New", "In Progress", "Completed", "Closed"],
    class_mode: ["International Online", "India Online", "BLR Class room", "Hyd Class room"],
    opportunity_status: ["Visiting", "Visited", "Demo Attended", "Lost Opportunity"],
    opportunity_stage: ["None", "Advanced Discussion", "Ready To Join", "Visiting", "Fee Negotiation", "Batch allocation", "Inserted to Demo", "Closed Lost"],
    demo_attended_stage: ["None", "Advanced Discussion", "Ready To Join", "Visiting", "Fee Negotiation", "Batch allocation", "Inserted to Demo", "Closed Lost"],
    visited_stage: ["None", "Advanced Discussion", "Ready To Join", "Visiting", "Fee Negotiation", "Batch allocation", "Inserted to Demo", "Closed Lost", "Not Visited", "Visited"],
    batch_timing: ["7AM-8AM", "8AM-9AM", "9AM-10AM", "10AM-11AM", "11AM-12PM", "12PM-01PM", "01PM-02PM", "02PM-03PM", "03PM-04PM", "04PM-05PM", "05PM-06PM", "06PM-07PM", "07PM-08PM", "08PM-09PM"],
    stack: ["Life skills", "Study Abroad", "HR"],
    lost_opportunity_reason: ["None", "Invalid Number", "Not Interested", "Joined other Institute"],
    lead_source: ["None", "Walk In", "Student Referral", "Demo", "Website", "Google Ads", "Facebook Ads"],
    course: ["Life skills", "Study Abroad", "HR"]
  };

  const validate = () => {
    const errors = {};
    if (!details.name) errors.name = "Field required";
    if (!details.cc) errors.cc = "Field required";
    if (!details.phone) errors.phone = "Field required";
    if (!details.email) errors.email = "Field required";
    if (!details.opportunity_status) errors.opportunity_status = "Field required";
    if (!details.opportunity_stage) errors.opportunity_stage = "Field required";
    if (!details.demo_attended_stage) errors.demo_attended_stage = "Field required";
    if (!details.lost_opportunity_reason) errors.lost_opportunity_reason = "Field required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e, key) => {
    const value = e.target.value;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleDateChange = (key, date) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: date ? date.toISOString() : "",
    }));
  };

  const handleCreate = async () => {
    if (!validate()) return;
    setLoading(true);
    
    const formattedDetails = {
      ...details,
      oppo_status: details.opportunity_status,
      oppo_stage: details.opportunity_stage,
      Demo_stage: details.demo_attended_stage,
      lost_reason: details.lost_opportunity_reason,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/createopportunity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedDetails),
      });

      if (!response.ok) {
        throw new Error("Error creating opportunity");
      }

      alert("Opportunity created successfully!");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDetails({
      name: "",
      cc: "",
      phone: "",
      email: "",
      fee_quoted: "",
      batch_timing: "",
      lead_status: "",
      stack: "",
      class_mode: "",
      description: "",
      opportunity_status: "",
      opportunity_stage: "",
      demo_attended_stage: "",
      visited_stage: "",
      lost_opportunity_reason: "",
      next_followup: new Date(),
      lead_source: "",
      course: "",
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[100vh] flex flex-col">
      <div className="flex gap-4 items-center justify-between p-4 md:p-5  rounded-t">
          <img alt="header image" width="44" height="44" class="w-10 h-9" src="https://crm.skillcapital.ai/_next/static/media/employee_contact.2d215fd6.svg" />
          <h2 className="text-2xl font-semibold">Create Opportunitty</h2>
          <button type="button" onClick={onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
            </svg><span class="sr-only">Close modal</span>
          </button>
        </div>
        <div className="flex-grow p-4 overflow-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Name" value={details.name} error={errors.name} onChange={(e) => handleChange(e, "name")} />
            <Field label="CC" value={details.cc} error={errors.cc} onChange={(e) => handleChange(e, "cc")} />
            <Field label="Phone" value={details.phone} error={errors.phone} onChange={(e) => handleChange(e, "phone")} />
            <Field label="Email" value={details.email} error={errors.email} onChange={(e) => handleChange(e, "email")} />
            <Field label="Fee Quoted" value={details.fee_quoted} error={errors.fee_quoted} onChange={(e) => handleChange(e, "fee_quoted")} />
            <SelectField label="Batch Timing" value={details.batch_timing} options={dropdownOptions.batch_timing} error={errors.batch_timing} onChange={(e) => handleChange(e, "batch_timing")} />
            <SelectField label="Lead Status" value={details.lead_status} options={dropdownOptions.lead_status} error={errors.lead_status} onChange={(e) => handleChange(e, "lead_status")} />
            <SelectField label="Stack" value={details.stack} options={dropdownOptions.stack} error={errors.stack} onChange={(e) => handleChange(e, "stack")} />
            <SelectField label="Class Mode" value={details.class_mode} options={dropdownOptions.class_mode} error={errors.class_mode} onChange={(e) => handleChange(e, "class_mode")} />
            <Field label="Description" value={details.description} error={errors.description} onChange={(e) => handleChange(e, "description")} />
            <SelectField label="Opportunity Status" value={details.opportunity_status} options={dropdownOptions.opportunity_status} error={errors.opportunity_status} onChange={(e) => handleChange(e, "opportunity_status")} />
            <SelectField label="Opportunity Stage" value={details.opportunity_stage} options={dropdownOptions.opportunity_stage} error={errors.opportunity_stage} onChange={(e) => handleChange(e, "opportunity_stage")} />
            <SelectField label="Demo Attended Stage" value={details.demo_attended_stage} options={dropdownOptions.demo_attended_stage} error={errors.demo_attended_stage} onChange={(e) => handleChange(e, "demo_attended_stage")} />
            <SelectField label="Visited Stage" value={details.visited_stage} options={dropdownOptions.visited_stage} error={errors.visited_stage} onChange={(e) => handleChange(e, "visited_stage")} />
            <SelectField label="Lost Opportunity Reason" value={details.lost_opportunity_reason} options={dropdownOptions.lost_opportunity_reason} error={errors.lost_opportunity_reason} onChange={(e) => handleChange(e, "lost_opportunity_reason")} />
            <div className="flex flex-col mb-4">
              <label className="text-gray-400 font-bold mb-1">Next Follow-up</label>
              <DatePicker
                selected={new Date(details.next_followup)}
                onChange={(date) => handleDateChange("next_followup", date)}
                className="outline-none border-b-2 border-gray-400 focus:border-blue-600 p-2 w-full h-12"
              />
              {errors.next_followup && <span className="text-red-500">{errors.next_followup}</span>}
            </div>
            <SelectField label="Lead Source" value={details.lead_source} options={dropdownOptions.lead_source} error={errors.lead_source} onChange={(e) => handleChange(e, "lead_source")} />
            <SelectField label="Course" value={details.course} options={dropdownOptions.course} error={errors.course} onChange={(e) => handleChange(e, "course")} />
          </div>
        </div>
        <div className="flex justify-center p-4 ">
          <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-2" onClick={resetForm}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, value, error, onChange }) => (
  <div className="flex flex-col mb-4">
    <label className="text-gray-400 font-bold mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="outline-none border-b-2 border-gray-400 focus:border-blue-600 p-2 w-full h-12"
    />
    {error && <span className="text-red-500">{error}</span>}
  </div>
);

const SelectField = ({ label, value, options, error, onChange }) => (
  <div className="flex flex-col mb-4">
    <label className="text-gray-400 font-bold mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="outline-none border-b-2 border-gray-400 focus:border-blue-600 p-2 w-full h-12"
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500">{error}</span>}
  </div>
);
