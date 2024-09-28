import { useState } from "react";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';

export default function BatchForm({ onClose }) {
    const [details, setFormData] = useState({
        batch_name: '',
        location: '',
        slot: '',
        trainer: '',
        batch_status: '',
        topic_status: '',
        no_of_students: '',
        learners: '',
        stack: '',
        start_date: new Date().toISOString(),
        tentative_end_time: '',
        class_mode: '',
        stage: '',
        comment: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [month1Rows, setMonth1Rows] = useState([{
        id: Date.now(),
        date: '',
        topic: '',
        start_time: '',
        end_time: '',
        attendance: '',
        video_upload: false,
        duration: ''
    }]);
    const [month2Rows, setMonth2Rows] = useState([{
        id: Date.now(),
        date: '',
        topic: '',
        start_time: '',
        end_time: '',
        attendance: '',
        video_upload: false,
        duration: ''
    }]);
    const [month3Rows, setMonth3Rows] = useState([{
        id: Date.now(),
        date: '',
        topic: '',
        start_time: '',
        end_time: '',
        attendance: '',
        video_upload: false,
        duration: ''
    }]);

    const validate = () => {
        const newErrors = {};
        // Validate details fields
        for (const key in details) {
            if (!details[key]) {
                newErrors[key] = `${key.replace(/_/g, ' ')} is required.`;
            }
        }
        // Validate rows
        const rows = [...month1Rows, ...month2Rows, ...month3Rows];
        rows.forEach((row, index) => {
            if (!row.date) newErrors[`date_${index}`] = "Date is required.";
            if (!row.topic) newErrors[`topic_${index}`] = "Topic is required.";
            if (!row.start_time) newErrors[`start_time_${index}`] = "Start time is required.";
            if (!row.end_time) newErrors[`end_time_${index}`] = "End time is required.";
            if (!row.attendance) newErrors[`attendance_${index}`] = "Attendance is required.";
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddRow = (month) => {
        if (month === 1) {
            setMonth1Rows([...month1Rows, {
                id: Date.now(),
                date: '',
                topic: '',
                start_time: '',
                end_time: '',
                attendance: '',
                video_upload: false,
                duration: ''
            }]);
        } else if (month === 2) {
            setMonth2Rows([...month2Rows, {
                id: Date.now(),
                date: '',
                topic: '',
                start_time: '',
                end_time: '',
                attendance: '',
                video_upload: false,
                duration: ''
            }]);
        } else if (month === 3) {
            setMonth3Rows([...month3Rows, {
                id: Date.now(),
                date: '',
                topic: '',
                start_time: '',
                end_time: '',
                attendance: '',
                video_upload: false,
                duration: ''
            }]);
        }
    };

    const handleDeleteRow = (id, month) => {
        if (month === 1) {
            setMonth1Rows(month1Rows.filter(row => row.id !== id));
        } else if (month === 2) {
            setMonth2Rows(month2Rows.filter(row => row.id !== id));
        } else if (month === 3) {
            setMonth3Rows(month3Rows.filter(row => row.id !== id));
        }
    };

    const handleRowChange = (id, field, value, month) => {
        if (month === 1) {
            setMonth1Rows(month1Rows.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            ));
        } else if (month === 2) {
            setMonth2Rows(month2Rows.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            ));
        } else if (month === 3) {
            setMonth3Rows(month3Rows.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            ));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const formResponse = await axios.post("http://127.0.0.1:8000/create_batch", details);
            if (formResponse.status === 200) {
                const sessions = [...month1Rows, ...month2Rows, ...month3Rows];
                const sessionResponse = await axios.post("http://127.0.0.1:8000/create_month", { sessions });
                if (sessionResponse.status === 200) {
                    setSuccessMessage("Batch and sessions created successfully!");
                    setTimeout(() => {
                        setSuccessMessage("");
                        onClose();
                    }, 3000);
                } else {
                    alert(`Error submitting sessions: ${sessionResponse.status} ${sessionResponse.statusText}`);
                }
            } else {
                alert(`Error submitting form: ${formResponse.status} ${formResponse.statusText}`);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred.";
            alert(`Error: ${errorMessage}`);
        }
    };


    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">

            <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl h-[100vh] flex flex-col">

                <div className="flex gap-4 items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <img alt="header image" width="44" height="44" class="w-10 h-9" src="https://crm.skillcapital.ai/_next/static/media/employee_contact.2d215fd6.svg" />
                    <h2 className="text-2xl font-semibold">Create Batches</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="overflow-y-auto flex-1 p-6">
                    {/* Display success message */}
                    {successMessage && (
                        <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
                            {successMessage}
                        </div>
                    )}
                    <div>
                        <h3 className="text-2xl">Batch Information</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-16">

                        {/* Form Inputs */}
                        <div className="flex flex-col">
                            <label className="font-medium text-base">Batch Name</label>
                            <input
                                type="text"
                                name="batch_name"
                                value={details.batch_name}
                                onChange={handleChange}
                                className="w-full p-2 border-b-2"
                                placeholder="Batch Name"
                            />
                            {errors.batch_name && <p className="text-red-500 text-sm">{errors.batch_name}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="learners">
                                Learners
                            </label>
                            <input
                                type="text"
                                name="learners"
                                id="learners" // Added id for accessibility
                                value={details.learners}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.learners ? 'border-red-500' : ''}`} // Highlight border if there's an error
                                placeholder="Learners"
                            />
                            {errors.learners && <p className="text-red-500 text-sm">{errors.learners}</p>} {/* Error message */}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="location">
                                Location
                            </label>
                            <select
                                name="location"
                                id="location" // Added id for accessibility
                                value={details.location}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.location ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            >
                                <option value="" disabled>Select a location</option>
                                <option value="New York">New York</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="Chicago">Chicago</option>
                                <option value="Houston">Houston</option>
                                <option value="Phoenix">Phoenix</option>
                                {/* Add more options as needed */}
                            </select>
                            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>} {/* Error message */}
                        </div>


                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="stack">
                                Stack
                            </label>
                            <select
                                name="stack"
                                id="stack" // Added id for accessibility
                                value={details.stack}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.stack ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            >
                                <option value="" disabled>Select a stack</option>
                                <option value="MERN">MERN</option>
                                <option value="MEAN">MEAN</option>
                                <option value="LAMP">LAMP</option>
                                <option value="Django">Django</option>
                                <option value="Ruby on Rails">Ruby on Rails</option>
                                {/* Add more options as needed */}
                            </select>
                            {errors.stack && <p className="text-red-500 text-sm">{errors.stack}</p>} {/* Error message */}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="slot">
                                Slot
                            </label>
                            <select
                                name="slot"
                                id="slot" // Added id for accessibility
                                value={details.slot}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.slot ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            >
                                <option value="" disabled>Select a slot</option>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                                {/* Add more options as needed */}
                            </select>
                            {errors.slot && <p className="text-red-500 text-sm">{errors.slot}</p>} {/* Error message */}
                        </div>



                        <div className="flex flex-col">
                            <label className="font-medium text-base">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                value={details.start_date}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.start_date ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            />
                            {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>} {/* Error message */}
                        </div>


                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="trainer">
                                Trainer
                            </label>
                            <select
                                name="trainer"
                                id="trainer" // Added id for accessibility
                                value={details.trainer}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.trainer ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            >
                                <option value="" disabled>Select a trainer</option>
                                <option value="Trainer 1">Trainer 1</option>
                                <option value="Trainer 2">Trainer 2</option>
                                <option value="Trainer 3">Trainer 3</option>
                                <option value="Trainer 4">Trainer 4</option>
                                {/* Add more trainers as needed */}
                            </select>
                            {errors.trainer && <p className="text-red-500 text-sm">{errors.trainer}</p>} {/* Error message */}
                        </div>


                        <div className="flex flex-col">
                            <label className="font-medium text-base">Tentative End Date</label>
                            <input
                                type="date"
                                name="tentative_end_date"
                                value={details.tentative_end_date}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.tentative_end_date ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            />
                            {errors.tentative_end_date && <p className="text-red-500 text-sm">{errors.tentative_end_date}</p>} {/* Error message */}
                        </div>


                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="batch_status">
                                Batch Status
                            </label>
                            <select
                                name="batch_status"
                                id="batch_status" // Added id for accessibility
                                value={details.batch_status} // Fixed value reference
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.batch_status ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            >
                                <option value="" disabled>Select Batch Status</option> {/* Adjusted placeholder text */}
                                <option value="Life Skills">Life Skills</option>
                                <option value="Study Abroad">Study Abroad</option>
                                <option value="HR">HR</option>
                                {/* Add more options as needed */}
                            </select>
                            {errors.batch_status && <p className="text-red-500 text-sm">{errors.batch_status}</p>} {/* Error message */}
                        </div>


                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="class_mode">
                                Class Mode
                            </label>
                            <select
                                name="class_mode"
                                id="class_mode" // Added id for accessibility
                                value={details.class_mode}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.class_mode ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            >
                                <option value="" disabled>Select Class Mode</option> {/* Updated placeholder for clarity */}
                                <option value="International Online">International Online</option>
                                <option value="India Online">India Online</option>
                                <option value="BLR ClassRoom">BLR ClassRoom</option>
                                <option value="HYD ClassRoom">HYD ClassRoom</option>
                            </select>
                            {errors.class_mode && <p className="text-red-500 text-sm">{errors.class_mode}</p>} {/* Error message */}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="topic_status">
                                Topic Status
                            </label>
                            <select
                                name="topic_status"
                                id="topic_status" // Added id for accessibility
                                value={details.topic_status}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.topic_status ? 'border-red-500' : ''}`} // Highlight border if there's an error
                            >
                                <option value="" disabled>Select Topic Status</option> {/* Updated placeholder for clarity */}
                                <option value="International Online">International Online</option>
                                <option value="India Online">India Online</option>
                                <option value="BLR ClassRoom">BLR ClassRoom</option>
                                <option value="HYD ClassRoom">HYD ClassRoom</option>
                            </select>
                            {errors.topic_status && <p className="text-red-500 text-sm">{errors.topic_status}</p>} {/* Error message */}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium text-base text-blue-300" htmlFor="stage">
                                Stage
                            </label>
                            <input
                                type="text"
                                name="stage"
                                id="stage" // Added id for accessibility
                                value={details.stage}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.stage ? 'border-red-500' : ''}`} // Highlight border if there's an error
                                placeholder="Enter stage" // Optional placeholder for clarity
                            />
                            {errors.stage && <p className="text-red-500 text-sm">{errors.stage}</p>} {/* Error message */}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium text-base" htmlFor="no_of_students">
                                No Of Students
                            </label>
                            <textarea
                                name="no_of_students"
                                id="no_of_students" // Added id for accessibility
                                value={details.no_of_students}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.no_of_students ? 'border-red-500' : ''}`} // Highlight border if there's an error
                                placeholder="Enter number of students" // Updated placeholder for clarity
                            ></textarea>
                            {errors.no_of_students && <p className="text-red-500 text-sm">{errors.no_of_students}</p>} {/* Error message */}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium text-base" htmlFor="comment">
                                Comments
                            </label>
                            <textarea
                                name="comment"
                                id="comment" // Added id for accessibility
                                value={details.comment}
                                onChange={handleChange}
                                className={`w-full p-2 border-b-2 ${errors.comment ? 'border-red-500' : ''}`} // Highlight border if there's an error
                                placeholder="Enter your comments here" // Updated placeholder for clarity
                            ></textarea>
                            {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>} {/* Error message */}
                        </div>

                    </form>
                    <div>
    {/* Table for Sessions */}
  {/* Table for Sessions */}
<h3 className="text-lg font-semibold mb-2">Month 1</h3>

<div className="overflow-x-auto w-full">
    <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-center">Date</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Topic</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Start Time</th>
                <th className="px-4 py-2 border border-gray-300 text-center">End Time</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Attendance</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Video Upload</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Duration</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {month1Rows.map((row, index) => (
                <tr key={row.id} className="border-t">
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="date"
                            className="border p-2 w-full"
                            value={row.date} // Bind to row.date
                            onChange={(e) => handleRowChange(row.id, 'date', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Topic"
                            value={row.topic} // Bind to row.topic
                            onChange={(e) => handleRowChange(row.id, 'topic', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="time"
                            className="border p-2 w-full"
                            value={row.start_time} // Bind to row.start_time
                            onChange={(e) => handleRowChange(row.id, 'start_time', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="time"
                            className="border p-2 w-full"
                            value={row.end_time} // Bind to row.end_time
                            onChange={(e) => handleRowChange(row.id, 'end_time', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Attendance"
                            value={row.attendance} // Bind to row.attendance
                            onChange={(e) => handleRowChange(row.id, 'attendance', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="checkbox"
                            className="border p-2"
                            checked={row.video_upload} // Bind to row.video_upload
                            onChange={(e) => handleRowChange(row.id, 'video_upload', e.target.checked, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Duration"
                            value={row.duration} // Bind to row.duration
                            onChange={(e) => handleRowChange(row.id, 'duration', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <button onClick={() => handleDeleteRow(row.id, 1)} className="text-red-500 hover:text-red-700">
                            <FaTrash />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    <button type="button" onClick={handleAddRow} className="mb-2 p-2 bg-blue-500 text-white rounded">
        Add Row
    </button>
</div>
<div>
    {/* Table for Sessions */}
  {/* Table for Sessions */}
<h3 className="text-lg font-semibold mb-2">Month 1</h3>

<div className="overflow-x-auto w-full">
    <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-center">Date</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Topic</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Start Time</th>
                <th className="px-4 py-2 border border-gray-300 text-center">End Time</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Attendance</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Video Upload</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Duration</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {month1Rows.map((row, index) => (
                <tr key={row.id} className="border-t">
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="date"
                            className="border p-2 w-full"
                            value={row.date} // Bind to row.date
                            onChange={(e) => handleRowChange(row.id, 'date', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Topic"
                            value={row.topic} // Bind to row.topic
                            onChange={(e) => handleRowChange(row.id, 'topic', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="time"
                            className="border p-2 w-full"
                            value={row.start_time} // Bind to row.start_time
                            onChange={(e) => handleRowChange(row.id, 'start_time', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="time"
                            className="border p-2 w-full"
                            value={row.end_time} // Bind to row.end_time
                            onChange={(e) => handleRowChange(row.id, 'end_time', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Attendance"
                            value={row.attendance} // Bind to row.attendance
                            onChange={(e) => handleRowChange(row.id, 'attendance', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="checkbox"
                            className="border p-2"
                            checked={row.video_upload} // Bind to row.video_upload
                            onChange={(e) => handleRowChange(row.id, 'video_upload', e.target.checked, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Duration"
                            value={row.duration} // Bind to row.duration
                            onChange={(e) => handleRowChange(row.id, 'duration', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <button onClick={() => handleDeleteRow(row.id, 1)} className="text-red-500 hover:text-red-700">
                            <FaTrash />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    <button type="button" onClick={handleAddRow} className="mb-2 p-2 bg-blue-500 text-white rounded">
        Add Row
    </button>
</div>
<div>
    {/* Table for Sessions */}
  {/* Table for Sessions */}
<h3 className="text-lg font-semibold mb-2">Month 1</h3>

<div className="overflow-x-auto w-full">
    <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-center">Date</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Topic</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Start Time</th>
                <th className="px-4 py-2 border border-gray-300 text-center">End Time</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Attendance</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Video Upload</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Duration</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {month1Rows.map((row, index) => (
                <tr key={row.id} className="border-t">
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="date"
                            className="border p-2 w-full"
                            value={row.date} // Bind to row.date
                            onChange={(e) => handleRowChange(row.id, 'date', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Topic"
                            value={row.topic} // Bind to row.topic
                            onChange={(e) => handleRowChange(row.id, 'topic', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="time"
                            className="border p-2 w-full"
                            value={row.start_time} // Bind to row.start_time
                            onChange={(e) => handleRowChange(row.id, 'start_time', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="time"
                            className="border p-2 w-full"
                            value={row.end_time} // Bind to row.end_time
                            onChange={(e) => handleRowChange(row.id, 'end_time', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Attendance"
                            value={row.attendance} // Bind to row.attendance
                            onChange={(e) => handleRowChange(row.id, 'attendance', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="checkbox"
                            className="border p-2"
                            checked={row.video_upload} // Bind to row.video_upload
                            onChange={(e) => handleRowChange(row.id, 'video_upload', e.target.checked, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Duration"
                            value={row.duration} // Bind to row.duration
                            onChange={(e) => handleRowChange(row.id, 'duration', e.target.value, 1)} // Bind to row.id
                        />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                        <button onClick={() => handleDeleteRow(row.id, 1)} className="text-red-500 hover:text-red-700">
                            <FaTrash />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    <button type="button" onClick={handleAddRow} className="mb-2 p-2 bg-blue-500 text-white rounded">
        Add Row
    </button>
</div>
</div>'


                <div className="col-span-2 flex justify-center gap-4 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-12 py-2 bg-white text-blue-400 rounded-md border-blue-400 border"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-12 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>

    );

}