// src/app/components/BatchesForm.js
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const BatchesForm = ({ onClose }) => {
    const [month1Rows, setMonth1Rows] = useState([{ id: 1, date: '', topic: '', start_time: '', end_time: '', attendance: '', video_upload: false, duration: '' }]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleRowChange = (id, field, value) => {
        setMonth1Rows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    };

    const handleDeleteRow = (id) => {
        setMonth1Rows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleAddRow = () => {
        const newRow = { id: month1Rows.length ? month1Rows[month1Rows.length - 1].id + 1 : 1, date: '', topic: '', start_time: '', end_time: '', attendance: '', video_upload: false, duration: '' };
        setMonth1Rows((prevRows) => [...prevRows, newRow]);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('YOUR_API_URL_HERE', { month1Rows });
            if (response.status === 200) {
                setSuccessMessage('Table submitted successfully!');
                setMonth1Rows([]);
                onClose(); // Close the modal after successful submission
            }
        } catch (error) {
            console.error('Error submitting data', error);
            setSuccessMessage('Failed to submit data.');
        }
    };

    return (
        <div>
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
                        {month1Rows.map((row) => (
                            <tr key={row.id} className="border-t">
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <input type="date" className="border p-2 w-full" value={row.date} onChange={(e) => handleRowChange(row.id, 'date', e.target.value)} />
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <input type="text" className="border p-2 w-full" placeholder="Topic" value={row.topic} onChange={(e) => handleRowChange(row.id, 'topic', e.target.value)} />
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <input type="time" className="border p-2 w-full" value={row.start_time} onChange={(e) => handleRowChange(row.id, 'start_time', e.target.value)} />
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <input type="time" className="border p-2 w-full" value={row.end_time} onChange={(e) => handleRowChange(row.id, 'end_time', e.target.value)} />
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <input type="text" className="border p-2 w-full" placeholder="Attendance" value={row.attendance} onChange={(e) => handleRowChange(row.id, 'attendance', e.target.value)} />
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <input type="checkbox" className="border p-2" checked={row.video_upload} onChange={(e) => handleRowChange(row.id, 'video_upload', e.target.checked)} />
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <input type="text" className="border p-2 w-full" placeholder="Duration" value={row.duration} onChange={(e) => handleRowChange(row.id, 'duration', e.target.value)} />
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button onClick={() => handleDeleteRow(row.id)} className="text-red-500 hover:text-red-700">
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
            <button type="button" onClick={handleSubmit} className="mb-2 p-2 bg-green-500 text-white rounded">
                Submit
            </button>
            {successMessage && <div className="mt-2 text-green-600">{successMessage}</div>}
        </div>
    );
};

export default BatchesForm;
