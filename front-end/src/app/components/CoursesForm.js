import { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Make sure to import axios
import { faPencilAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CreateCourseModal() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [brochure, setBrochure] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setShowModal(true); // Open the modal when the component mounts
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBrochureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBrochure(e.target.files[0].name); // Displaying the file name
    }
  };

  const handleEditClick = async () => {
    try {
      fileInputRef.current.click(); // Trigger the file input click
      const updatedDetails = { image: selectedImage, brochure }; // Create an object with the updated details
      
      const response = await axios.post("http://127.0.0.1:8000/create_course", updatedDetails);
      if (response.status === 200) {
        setSuccessMessage("Batch created successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          setShowModal(false); // Close the modal after a few seconds
        }, 3000);
      } else {
        console.error("Unexpected response status:", response.status);
        alert(`Unexpected response: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred.";
      alert(`Error submitting form: ${errorMessage}`);
    }
  };



  return (
    <>
  {showModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Create Course</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setShowModal(false)}
          >
            &#x2715;
          </button>
        </div>

        {/* Flexbox for Image and Form Layout */}
        <div className="flex flex-col p-5">
          {/* Left Section for Image */}
          <div className="flex items-center flex-end  mb-4">
          <label className="cursor-pointer">
  <div className="w-24 h-24  rounded-full flex items-center justify-center">
    {selectedImage ? (
      <img
        src={selectedImage}
        alt="Profile"
        className="w-full h-full rounded-full object-cover"
      />
    ) : (
      <FontAwesomeIcon icon={faUserCircle} className="text-gray-500 text-7xl" /> // Font Awesome user icon
    )}
  </div>
  <input
    type="file"
    accept="image/*"
    className="hidden"
    ref={fileInputRef} // Attach ref to the input
    onChange={handleImageChange}
  />
</label>
  <div>
  <button
    className="flex items-center ml-8 cursor-pointer text-blue-500 hover:underline"
    onClick={handleEditClick} // Call handleEditClick on button click
  >
    <FontAwesomeIcon icon={faPencilAlt} className="mr-2" /> {/* Pencil icon */}
    Edit
  </button>
</div>
</div>


          {/* Form Section */}
          <h3 className="text-lg font-semibold">Course Information</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-700">Course Name</label>
              <input
                type="text"
                placeholder="Course Name"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">Course Fee</label>
              <input
                type="text"
                placeholder="Course Fee"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Description and Brochure side by side */}
            <div className="col-span-1">
              <label className="block text-gray-700">Description</label>
              <textarea
                placeholder="Description"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="col-span-1 flex flex-col">
              <label className="block text-gray-700">Course Brochure</label>
              <input
                type="file"
                className="hidden"
                onChange={handleBrochureChange}
                id="brochure-upload"
              />
              <label
                htmlFor="brochure-upload"
                className="cursor-pointer  text-gray-700 p-2 rounded border border-gray-300 hover:bg-gray-300 flex items-center justify-between mt-2"
              >
                {brochure ? brochure : "Click to select a brochure"}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-5 border-t">
          <button
            className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded mr-2"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  ) : null}
</>

  );
}
