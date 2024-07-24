import React from 'react';

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Import Result</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
