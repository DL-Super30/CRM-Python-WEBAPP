
"use client";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function LeadForm({ onClose }) {
  const [details, setDetails] = useState({
    first_name: "",
    lastname: "",
    id_proof: "",
    phone: "",
    email: "",
    location: "",
    alternate_phone: "",
    exchange_rate: "",
    attended_demo: "",
    learner_stage: "",
    tech_stack: "",
    registered_course: "",
    course_comments: "",
    slack_access: "",
    lms_access: "",
    class_mode: "",
    comment: "",
    preferrable_time: "",
    batch_timing: "",
    counselling_done: "",
    learner_owner: "",
    currency: "",
    source: "",
    description: "",
    batch_id: "",
    DOB: null,
    registered_date: null,
    lead_createdtime: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "first_name", "lastname", "id_proof", "phone", "email", "location",
      "alternate_phone", "exchange_rate", "attended_demo", "learner_stage",
      "tech_stack", "Up Coming", "On Going", "On Hold","Completed",
      "lms_access", "class_mode", "comment", "preferrable_time", "batch_timing",
      "learner_owner", "currency", "source", "description", "batch_id", "DOB",
      "registered_date"
    ];

    requiredFields.forEach((field) => {
      if (!details[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const id = Date.now().toString();
    const currentDate = new Date().toLocaleDateString("en-GB");

    const updatedDetails = {
      ...details,
      id,
      date: currentDate.replace(/\//g, "-"),
    };

    console.log("Submitting the following details:", updatedDetails);

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

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-sm w-full max-w-5xl h-[100vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex gap-4 items-center justify-between p-4 md:p-5 rounded-t">
          <img
            alt="header image"
            width="44"
            height="44"
            className="w-10 h-9"
            src="https://crm.skillcapital.ai/_next/static/media/employee_contact.2d215fd6.svg"
          />
          <h2 className="text-2xl font-semibold">Create Learner</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 font-semibold">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
            {/* Left Side Fields */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={details.first_name}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.first_name && <span className="text-red-500">{errors.first_name}</span>}
              </div>
              <div className="flex flex-col">
                <label>ID Proof</label>
                <input
                  type="text"
                  name="id_proof"
                  value={details.id_proof}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.id_proof && <span className="text-red-500">{errors.id_proof}</span>}
              </div>
              <div className="flex flex-col">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  name="DOB"
                  value={details.DOB || ""} // Ensures a string value is used
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.DOB && <span className="text-red-500">{errors.DOB}</span>}
              </div>

              <div className="flex flex-col">
                <label>Registered Date</label>
                <input
                  type="date"
                  name="registered_date"
                  value={details.registered_date || ""} // Ensures a string value is used
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.registered_date && (
                  <span className="text-red-500">{errors.registered_date}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label>Batch ID's</label>
                <input
                  type="text"
                  name="batch_id"
                  value={details.batch_id}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.batch_id && <span className="text-red-500">{errors.batch_id}</span>}
              </div>
              <div className="flex flex-col">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={details.description}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.description && <span className="text-red-500">{errors.description}</span>}
              </div>
              <div className="flex flex-col">
                <label>Source</label>
                <input
                  type="text"
                  name="source"
                  value={details.source}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.source && <span className="text-red-500">{errors.source}</span>}
              </div>
              <div className="flex flex-col">
                <label>learner_owner</label>
                <input
                  type="text"
                  name="learner_owner"
                  value={details.learner_owner}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.learner_owner && <span className="text-red-500">{errors.learner_owner}</span>}
              </div>
              <div className="flex flex-col">
                <label>currency</label>
                <input
                  type="text"
                  name="currency"
                  value={details.currency}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.currency && <span className="text-red-500">{errors.currency}</span>}
              </div>
              <div className="flex flex-col">
                <label>Counselling_done_by</label>
                <input
                  type="text"
                  name="counselling_done"
                  value={details.counselling_done}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.counselling_done && <span className="text-red-500">{errors.counselling_done}</span>}
              </div>
            </div>

            {/* Right Side Fields */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={details.lastname}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.lastname && <span className="text-red-500">{errors.lastname}</span>}
              </div>
              <div className="flex flex-col">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={details.phone}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.phone && <span className="text-red-500">{errors.phone}</span>}
              </div>
              <div className="flex flex-col">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className="flex flex-col relative">
                <label>Location</label>
                <select
                  name="location"
                  value={details.location}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full appearance-none"
                >
                  <option value="">Select a location</option>
                  <option value="Location 1">Location 1</option>
                  <option value="Location 2">Location 2</option>
                  <option value="Location 3">Location 3</option>
                  {/* Add more options as needed */}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
                </div>
                {errors.location && (
                  <span className="text-red-500">{errors.location}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label>Alternate Phone</label>
                <input
                  type="text"
                  name="alternate_phone"
                  value={details.alternate_phone}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.alternate_phone && <span className="text-red-500">{errors.alternate_phone}</span>}
              </div>
              <div className="flex flex-col">
                <label>Exchange Rate</label>
                <input
                  type="text"
                  name="exchange_rate"
                  value={details.exchange_rate}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.exchange_rate && <span className="text-red-500">{errors.exchange_rate}</span>}
              </div>
              <div className="flex flex-col relative">
                <label>Attended Demo</label>
                <select
                  name="attended_demo"
                  value={details.attended_demo}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full appearance-none"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Pending">Pending</option>
                  {/* Add more options as needed */}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
                </div>
                {errors.attended_demo && (
                  <span className="text-red-500">{errors.attended_demo}</span>
                )}
              </div>
              <div className="flex flex-col relative">
                <label>Learner Stage</label>
                <select
                  name="learner_stage"
                  value={details.learner_stage}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full appearance-none"
                >
                  <option value="">Select a stage</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                  {/* Add more options as needed */}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
                </div>
                {errors.learner_stage && (
                  <span className="text-red-500">{errors.learner_stage}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label>Lead Created Time</label>
                <input
                  type="datetime-local"
                  name="lead_createdtime"
                  value={details.lead_createdtime || ""} // Ensures a string value
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.lead_createdtime && (
                  <span className="text-red-500">{errors.lead_createdtime}</span>
                )}
              </div>

            </div>
          </form>
          <div>
            <h1 className="font-bold text-xl p-8 ">Course Details</h1>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">

            {/* Left Side Fields */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label>Registered Course</label>
                <input
                  type="text"
                  name="registered_course"
                  value={details.registered_course}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.registered_course && <span className="text-red-500">{errors.registered_course}</span>}
              </div>
              <div className="flex flex-col">
                <label>Tech Stack</label>
                <input
                  type="text"
                  name="tech_stack"
                  value={details.tech_stack}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.tech_stack && <span className="text-red-500">{errors.tech_stack}</span>}
              </div>
              <div className="flex flex-col">
                <label>Course Comments</label>
                <input
                  type="text"
                  name="course_comments"
                  value={details.course_comments}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.course_comments && <span className="text-red-500">{errors.course_comments}</span>}
              </div>
              <div className="flex flex-col">
                <label>Slack Access</label>
                <input
                  type="text"
                  name="slack_access"
                  value={details.slack_access}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.slack_access && <span className="text-red-500">{errors.slack_access}</span>}
              </div>
              <div className="flex flex-col">
                <label>LMS Access</label>
                <input
                  type="text"
                  name="lms_access"
                  value={details.lms_access}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.lms_access && <span className="text-red-500">{errors.lms_access}</span>}
              </div>
            </div>

            {/* Right Side Fields */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label>Preferrable Time</label>
                <input
                  type="date"
                  name="preferrable_time"
                  value={details.preferrable_time || ""} // Ensures a string value
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.preferrable_time && (
                  <span className="text-red-500">{errors.preferrable_time}</span>
                )}
              </div>


              <div className="flex flex-col">
                <label>Batch Timing</label>
                <input
                  type="date"
                  name="batch_timing"
                  value={details.batch_timing || ""} // Ensure a string value
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.batch_timing && (
                  <span className="text-red-500">{errors.batch_timing}</span>
                )}
              </div>


              <div className="flex flex-col">
                <label>Mode Of Class</label>
                <input
                  type="text"
                  name="class_mode"
                  value={details.class_mode}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.class_mode && <span className="text-red-500">{errors.class_mode}</span>}
              </div>
              <div className="flex flex-col">
                <label>Comments</label>
                <input
                  type="text"
                  name="comment"
                  value={details.comment}
                  onChange={handleChange}
                  className="border-b-2 border-gray-400 p-2 w-full"
                />
                {errors.comment && <span className="text-red-500">{errors.comment}</span>}
              </div>
            </div>
            <div className="col-span-2 flex justify-end gap-4 mt-4">
       <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 bg-gray-500 text-white rounded"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create
      </button>
    </div>

          </form>

      

        </div>
      </div>
    </div>
  );
}
