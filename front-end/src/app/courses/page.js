"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaTable, FaThLarge, FaIdCard, FaAngleDown, FaAngleUp, FaSearch, FaPaperPlane } from "react-icons/fa";
import Navbar from '@/app/components/navbar';
import CoursesForm from '@/app/components/CoursesForm'; // Ensure this is correct

const Dashboard = () => {
    const router = useRouter();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("table");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Courses');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const toggleModal = () => setIsModalOpen(prev => !prev);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    
    const handleDeleteClick = async () => {
        if (selectedLeads.length === 0) {
            alert('No Opportunity selected for deletion');
            return;
        }

        if (!window.confirm("Are you sure you want to delete the selected leads?")) {
            return;
        }

        try {
            await Promise.all(
                selectedLeads.map(async (leadId) => {
                    if (!leadId) {
                        console.error('Invalid OpportunityId:', leadId);
                        return;
                    }
                    const response = await fetch(`http://127.0.0.1:8000/delete_course/${leadId}/`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to delete lead with ID: ${leadId}`);
                    }
                })
            );
            await fetchData(); // Refresh data after deletion
            setSelectedLeads([]); // Clear selected leads
            alert('Leads deleted successfully');
        } catch (error) {
            console.error('Error deleting leads:', error);
            alert('Failed to delete leads. Please check console for details.');
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/get_courses');
            if (!response.ok) throw new Error('Failed to fetch courses');
            const result = await response.json();
            if (Array.isArray(result)) {
                setData(result);
                setFilteredData(result);
            } else {
                console.error('Fetched data is not an array:', result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert('Error fetching data. Please try again later.');
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const filtered = data.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    const handleSearch = (event) => setSearchTerm(event.target.value);

    const handleQuerySubmit = (event) => {
        event.preventDefault();
        if (!query.trim()) {
            setError('Please provide an input.');
        } else {
            setError('');
            console.log('Submitted query:', query);
            // Optionally, reset the query after submission
            setQuery("");
        }
    };


    return (
        <div className="min-h-screen bg-white-100">
        <Navbar />
        <div className="mx-auto p-4 flex">
            <div className="border-2 rounded-xl border-gray-200 mt-4 shadow-md shadow-gray-400 w-2/3 mr-4">
                <div className="p-4 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 ">
                        <div className="flex items-center space-x-2 mb-4 sm:mb-0 relative">
                            <FaIdCard className="text-white text-3xl sm:text-4xl bg-blue-500 p-2 rounded-md" />
                            <div className="relative">
                                <button
                                    className="text-lg sm:text-xl flex items-center space-x-1"
                                    onClick={toggleDropdown}
                                >
                                    <span>{selectedOption}</span>
                                    {isDropdownOpen ? (
                                        <FaAngleUp className="text-gray-600 font-semibold" />
                                    ) : (
                                        <FaAngleDown className="text-gray-600 font-semibold" />
                                    )}
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                                        <button
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setSelectedOption('Option 1')}
                                        >
                                            Option 1
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setSelectedOption('Option 2')}
                                        >
                                            Option 2
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setSelectedOption('Option 3')}
                                        >
                                            Option 3
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center space-x-2">
                            <button
                                onClick={toggleModal}
                                className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-2 border border-white rounded-lg mb-2 sm:mb-0"
                            >
                                <span>Create Courses</span>
                            </button>
                            <div className="relative">
                                <button className="flex items-center justify-center space-x-2 text-black px-4 py-2 border border-black rounded">
                                    <span>Actions</span>
                                    {isDropdownOpen ? (
                                        <FaAngleUp className="text-gray-600" />
                                    ) : (
                                        <FaAngleDown className="text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mb-4 relative">
    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <FaSearch className="text-gray-500" />
    </div>
    <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded-md px-4 pl-8 p-1.5 py-2 w-full min-w-[50px] sm:w-2/4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
    />
</div>

{viewMode === 'table' ? (
    <div className="overflow-hidden border border-gray-300 shadow-md sm:rounded-lg">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 h-96">
                {/* Table header */}
                <thead className="bg-gray-100 sticky top-0">
                    <tr className="flex w-full">
                        <th className="w-16 text-center p-2 py-4">
                            <input
                                type="checkbox"
                                className="h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={selectedLeads.length === filteredData.length}
                                onChange={() =>
                                    setSelectedLeads(
                                        selectedLeads.length === filteredData.length
                                            ? []
                                            : filteredData.map((lead) => lead.id)
                                    )
                                }
                            />
                        </th>
                        <th className="w-32 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Course</th>
                        <th className="w-48 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Description</th>
                        <th className="w-48 px-2 py-4 text-center text-xs font-bold text-gray-600 uppercase">Course Fee</th>
                    </tr>
                </thead>

                {/* Table body with vertical scroll */}
                <tbody className="bg-white">
                    {Array.isArray(filteredData) && filteredData.length > 0 ? (
                        filteredData.map((lead) => (
                            <tr key={lead.id} className="flex w-full hover:bg-gray-50 border-b border-gray-200">
                                <td className="w-16 text-center p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedLeads.includes(lead.id)}
                                        onChange={() => handleCheckboxChange(lead.id)}
                                    />
                                </td>
                                <td className="w-32 py-1 text-center text-sm text-gray-800">{lead.course || 'N/A'}</td>
                                <td className="w-48 px-2 ml-4 py-4 text-center text-sm rounded-full">{lead.description || 'N/A'}</td>
                                <td className="w-40 py-1 text-center text-sm text-gray-800">{lead.course_fee || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr className="flex w-full justify-center" style={{ height: '100%' }}>
                            <td colSpan="4" className="px-4 py-2 text-center text-sm text-gray-500">
                                Courses data not found
                            </td>
                        </tr>
                    )}
                </tbody>

                {/* Table footer with pagination */}
                <tfoot>
                    <tr className="flex w-full justify-between items-center px-4 py-2 bg-gray-100">
                        <td className="text-sm text-gray-600">0 to 0 of 0</td>
                        <td className="flex space-x-2">
                            <button className="text-sm text-gray-600">|&lt;</button>
                            <button className="text-sm text-gray-600">&lt;</button>
                            <span className="text-sm text-gray-600">Page 0 of 0</span>
                            <button className="text-sm text-gray-600">&gt;</button>
                            <button className="text-sm text-gray-600">&gt;|</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
) : null}

                </div>
            </div>
    
            {/* New Section on the right */}
            <div className="mt-4 bg-gray-100 px-2 py-12 rounded-md shadow-inner h-96 w-1/3 ">
                <Image
                    src="/Boat2.gif"
                    alt="A description of the image"
                    width={500}
                    height={300}
                />
      <div className="flex flex-col mt-20">
    <form onSubmit={handleQuerySubmit} className="mb-4 relative">
        <input
            type="text"
            className="w-full p-2 border rounded-l pr-16" // Add padding to the right to make space for the button
            placeholder="Ask me anything related to our course"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <button
            type="submit"
            className="absolute right-2 top-2 p-2 bg-blue-500 text-white flex items-center rounded-full"
        >
            <FaPaperPlane className="mr-1" />
        </button>
    </form>
    {error && <p className="text-red-500 text-sm">{error}</p>}
</div>
</div>
        </div>
        {isModalOpen && <CoursesForm toggleModal={toggleModal} />} {/* Ensure CourseForm is used correctly */}
        </div>
    
    );
};

export default Dashboard;
