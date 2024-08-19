// components/Popup.js
"use client"
import React, { useEffect } from 'react';
export default function Popup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full text-center transform transition-all duration-300 ease-in-out scale-100">
        <p className="text-gray-900 text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-300 to-pink-500 text-white rounded hover:from-orange-400 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
