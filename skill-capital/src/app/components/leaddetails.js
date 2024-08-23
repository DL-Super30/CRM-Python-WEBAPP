import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/leads/${id}/`);
        setLead(response.data);
      } catch (error) {
        console.error('Error fetching lead details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Lead Details</h1>
        <div className="bg-white shadow rounded-md p-4 mt-4">
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Phone:</strong> {lead.contact_no}</p>
          <p><strong>Tech Stack:</strong> {lead.tech_stack}</p>
          <p><strong>Course:</strong> {lead.courses}</p>
          <p><strong>Status:</strong> {lead.lead_status}</p>
          <p><strong>Description:</strong> {lead.description}</p>
          {/* Add more fields as needed */}
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
