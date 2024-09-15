
 "use client"
import Navbar from "@/app/components/navbar";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ReactDatePicker from "react-datepicker";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";


function Field({ label, value, error, onChange, children }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      {children || (
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="border rounded-md p-2 w-full"
        />
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
const formatDateLabel = (date) => {
  return date ? date.toLocaleDateString("en-CA") : "";
};

export default function CreateOpportunityPage() {
  const router = useRouter(); 
  const [details, setDetails] = useState({
    first_name: "",
    id_proof: "",
    DOB: null,
    registered_date: null,
    batch_id: "",
    description: "",
    source: "",
    learner_owner: "",
    currency: "",
    counselling_done: "",
    lastname: "",
    phone: "",
    email: "",
    location: "",
    alternate_phone: "",
    exchange_rate: "",
    attended_demo: "",
    learner_stage: "",
    lead_createdtime: null,
    registered_course: "",
    tech_stack: "",
    course_comments: "",
    slack_access: "",
    lms_access: "",
    preferrable_time: "",
    batch_timing: "",
    class_mode: "",
    comment: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e, field) => {
    setDetails({ ...details, [field]: e.target.value });
  };

  const handleDateChange = (field, date) => {
    setDetails({ ...details, [field]: date });
  };

  const handleCreate = async () => {
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post("http://127.0.0.1:8000/createLeaners", details);
      setLoading(false);
      setShowSuccess(true);
      console.log("Form submitted successfully:", response.data);
      router.push('/learners/learner-home'); 
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };
  const resetForm = () => {
    setDetails({});
    setErrors({});
  };

  return (
    <div className="relative min-h-screen bg-gray-10 w-full">
      <header className="sticky top-0 left-0 w-full">
        <Navbar />
      </header>
      <div className="container mx-auto p-10 bg-white  border-b border-gray-600 ">
  <div className="flex flex-col h-[calc(100vh-160px)] overflow-y-auto">
    <div className="flex items-center gap-4 font-bold text-xl sm:text-2xl mb-6">
      <span>Create Learners</span>
    </div>
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side fields */}
        <div className="space-y-4">
          <Field
            label="First Name"
            value={details.first_name}
            error={errors.first_name}
            onChange={(e) => handleChange(e, "first_name")}
            className="border-b-2 border-gray-400 focus:border-blue-500"
          />
          <Field
            label="Id Proof"
            value={details.id_proof}
            error={errors.id_proof}
            onChange={(e) => handleChange(e, "id_proof")}
            className="border-b-2 border-gray-400 p-2 w-full"
          /> <Field label="Date of Birth" value={formatDateLabel(details.DOB)} error={errors.DOB}>
          <div className="relative">
            <DatePicker
              selected={details.DOB}
              onChange={(date) => handleDateChange("DOB", date)}
              className="border rounded-md p-2 w-full"
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
            />
            <button
              onClick={() => document.querySelector('.react-datepicker__input-container input').focus()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </button>
          </div>
        </Field>
        <Field label={`Registered Date: ${formatDateLabel(details.registered_date)}`}>
            <div className="relative">
              <DatePicker
                selected={details.registered_date}
                onChange={(date) => handleDateChange("registered_date", date)}
                className="border rounded-md p-2 w-full"
                dateFormat="yyyy-MM-dd"
              />
              <button
                onClick={() => document.querySelector('.react-datepicker__input-container input').focus()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
              </button>
            </div>
          </Field>

          <Field
            label="Batch ID"
            value={details.batch_id}
            error={errors.batch_id}
            onChange={(e) => handleChange(e, "batch_id")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Description"
            value={details.description}
            error={errors.description}
            onChange={(e) => handleChange(e, "description")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Source"
            value={details.source}
            error={errors.source}
            onChange={(e) => handleChange(e, "source")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Learner Owner"
            value={details.learner_owner}
            error={errors.learner_owner}
            onChange={(e) => handleChange(e, "learner_owner")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Currency"
            value={details.currency}
            error={errors.currency}
            onChange={(e) => handleChange(e, "currency")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Counseling Done By"
            value={details.counselling_done}
            error={errors.counselling_done}
            onChange={(e) => handleChange(e, "counselling_done")}
            className="border-b-2 border-gray-400"
          />
        </div>

        {/* Right side fields */}
        <div className="space-y-4">
          <Field
            label="Last Name"
            value={details.lastname}
            error={errors.lastname}
            onChange={(e) => handleChange(e, "lastname")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Phone"
            value={details.phone}
            error={errors.phone}
            onChange={(e) => handleChange(e, "phone")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Email"
            value={details.email}
            error={errors.email}
            onChange={(e) => handleChange(e, "email")}
            className="border-b-2 border-gray-400"
          />
          <Field label="Location">
            <select
              value={details.location}
              onChange={(e) => handleChange(e, "location")}
              className="border-b-2 border-gray-400 p-2 w-full"
            >
              <option value="">Select Location</option>
              <option value="Location1">Location 1</option>
              <option value="Location2">Location 2</option>
            </select>
          </Field>
          <Field
            label="Alternative Phone"
            value={details.alternate_phone}
            error={errors.alternate_phone}
            onChange={(e) => handleChange(e, "alternate_phone")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Exchange Rate"
            value={details.exchange_rate}
            error={errors.exchange_rate}
            onChange={(e) => handleChange(e, "exchange_rate")}
            className="border-b-2 border-gray-400"
          />
          <Field label="Attended Demo">
            <select
              value={details.attended_demo}
              onChange={(e) => handleChange(e, "attended_demo")}
              className="border-b-2 border-gray-400 p-2 w-full"
            >
              <option value="">Select Option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </Field>
          <Field label="Learner Stage">
            <select
              value={details.learner_stage}
              onChange={(e) => handleChange(e, "learner_stage")}
              className="border-b-2 border-gray-400 p-2 w-full"
            >
              <option value="">Select Stage</option>
              <option value="stage1">Stage 1</option>
              <option value="stage2">Stage 2</option>
            </select>
          </Field>
          <Field
  label={
    details.lead_createdtime
      ? `Lead Created Time: ${details.lead_createdtime.toLocaleDateString()}`
      : "Lead Created Time"
  }
  value={details.lead_createdtime}
  error={errors.lead_createdtime}
>
  <div className="relative">
    <DatePicker
      selected={details.lead_createdtime}
      onChange={(date) => handleDateChange("lead_createdtime", date)}
      showTimeSelect
      dateFormat="MM/dd/yyyy" // Formats the date in MM/dd/yyyy format
      className="border rounded-md p-2 w-full"
    />
    <button
      onClick={() => DatePickerRef.current?.setFocus()}
      className="absolute right-3 top-1/2 transform -translate-y-1/2"
    >
      <FontAwesomeIcon icon={faCalendarAlt} />
    </button>
  </div>
</Field>

        </div>
      </div>
      <div>
        <span>Course Details</span>
      </div>
      {/* Additional fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side additional fields */}
        <div className="space-y-4">
          <Field
            label="Registered Course"
            value={details.registered_course}
            onChange={(e) => handleChange(e, "registered_course")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Tech Stack"
            value={details.tech_stack}
            onChange={(e) => handleChange(e, "tech_stack")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Course Comments"
            value={details.course_comments}
            onChange={(e) => handleChange(e, "course_comments")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Slack Access"
            value={details.slack_access}
            onChange={(e) => handleChange(e, "slack_access")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="LMS Access"
            value={details.lms_access}
            onChange={(e) => handleChange(e, "lms_access")}
            className="border-b-2 border-gray-400"
          />
        </div>

        {/* Right side additional fields */}
        <div className="space-y-4">
        <Field label={`Preferable Time: ${formatDateLabel(details.Preferable_Time)}`}>
            <div className="relative">
              <DatePicker
                selected={details.preferrable_time}
                onChange={(date) => handleDateChange("preferrable_time", date)}
                className="border rounded-md p-2 w-full"
                showYearDropdown
                showMonthDropdown
                dateFormat="yyyy-MM-dd"
              />
              <button
                onClick={() => document.querySelector('.react-datepicker__input-container input').focus()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
              </button>
            </div>
          </Field>

          <Field label={`Batch Timing: ${formatDateLabel(details.batch_timing)}`}>
            <div className="relative">
              <DatePicker
                selected={details.batch_timing}
                onChange={(date) => handleDateChange("batch_timing", date)}
                className="border rounded-md p-2 w-full"
                showYearDropdown
                showMonthDropdown
                dateFormat="yyyy-MM-dd"
              />
              <button
                onClick={() => document.querySelector('.react-datepicker__input-container input').focus()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
              </button>
            </div>
          </Field>
          <Field
            label="Mode Of Class"
            value={details.class_mode}
            onChange={(e) => handleChange(e, "class_mode")}
            className="border-b-2 border-gray-400"
          />
          <Field
            label="Comment"
            value={details.comment}
            onChange={(e) => handleChange(e, "comment")}
            className="border-b-2 border-gray-400"
          />
        </div>
      </div>
    </div>
  </div>
  <div className="flex justify-end space-x-4">
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {loading ? "Creating..." : "Create Learner"}
              </button>
            </div>

            {/* Success message */}
            {showSuccess && (
              <div className="text-green-500 mt-4">
                Learner has been created successfully!
              </div>
            )}
          </div>
</div>   
  );
}
