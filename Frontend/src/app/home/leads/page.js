"use client"
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaPen, FaAngleLeft, FaIdCard } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../../component/navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function LeadDetails(props) {
  
  const [activeTab, setActiveTab] = useState('Details');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editableField, setEditableField] = useState({ label: '', value: '' });
  const [details, setDetails] = useState({
    name: 'Gokula Sukanya Reddy',
    leadStatus: 'Attempted',
    cc: '+91',
    leadSource: 'Website',
    phone: '9502655018',
    stack: 'Study Abroad',
    email: 'sukanyareddy5018@gmail.com',
    course: 'PTE',
    feeQuoted: 'Fee Quoted',
    classMode: 'Online',
    batchTiming: 'Batch Timing',
    nextFollowUp: '14/06/2024',
    description: 'Abida:Need to cb later',
  });
  const router = useRouter(); // Initialize useRouter
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleEditClick = (label) => {
    setEditableField({ label, value: details[label] });
    setEditDialogOpen(true);
  };
  const handleSave = () => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [editableField.label]: editableField.value,
    }));
    setEditDialogOpen(false);
  };
  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
  };
  return (

    <main>
      <Navbar Navbar={Navbar}/>
      <div className="max-h-screen bg-gray-100 p-4">
      <div className="w-full bg-white shadow-xl rounded-lg">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handleBackClick} className="text-sm text-gray-600 hover:underline flex items-center space-x-2">
              <FaAngleLeft />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <FaIdCard className='text-white text-2xl bg-blue-500 ' />
              <h2 className="text-lg font-semibold">{details.name}</h2>
            </div>
          </div>
          <button className="flex justify-end bg-blue-700 text-white p-1 border rounded">Convert</button>
        </div>
        {/* Contact Details */}
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
            <div className="text-sm">
              <p className="text-gray-500 font-bold">Lead Source</p>
              <p className="flex items-center space-x-2 text-blue-500 hover:underline">{details.leadSource}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">Phone</p>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-blue-500" />
                <a href={`tel:${details.phone}`} className="text-blue-500 hover:underline">
                  {details.phone}
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">Email</p>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-500" />
                <a href={`mailto:${details.email}`} className="text-blue-500 hover:underline">
                  {details.email}
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold ml-20">Lead Status</p>
              <p className="text-green-400 ml-20 border-b border-gray-300 pb-2">{details.leadStatus}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Buttons with a full-width border underneath */}
      <div className="pt-2">
        <div className="p-8 bg-white border-b border-gray-300">
          {['Details', 'Activity', 'Notes', 'Ask Ai'].map((tab) => (
            <Link key={tab} href={`/${tab.toLowerCase()}`}>
              <button
                onClick={() => handleTabClick(tab)}
                className={`text-sm font-semibold pb-2 mr-4 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : ''
                  }`}
              >
                {tab}
              </button>
            </Link>
          ))}
        </div>
        {/* Details Grid */}
        <div className="p-2 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {Object.keys(details).map((key, index) => (
              key !== 'description' && (
                <DetailItem
                  key={index}
                  label={key}
                  value={details[key]}
                  onEdit={() => handleEditClick(key)}
                />
              )
            ))}
          </div>
          {/* Full-width description without a top border */}
          <div className="mt-4 pt-2">
            <DetailItem
              label="description"
              value={details.description}
              fullWidth
              onEdit={() => handleEditClick('description')}
            />
          </div>
        </div>
      </div>
      {/* Edit Dialog Box */}
      {editDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit {editableField.label}</h3>
            <input
              type="text"
              value={editableField.value}
              onChange={(e) => setEditableField({ ...editableField, value: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
    </main>
  );
}
function DetailItem({ label, value, fullWidth, onEdit }) {
  return (
    <div
      className={`flex items-start justify-between pb-2 border-b border-gray-300 p-4 rounded ${fullWidth ? 'col-span-2' : ''
        }`}
    >
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 capitalize">{label.replace(/([A-Z])/g, ' $1')}</p>
        <p className="text-gray-800">{value}</p>
      </div>
      <FaPen className="text-black-400 cursor-pointer" onClick={onEdit} />
    </div>
  );
}