// components/CsvImportPage.jsx
"use client"
// components/CsvImportPage.jsx

import React, { useState } from 'react';
import Modal from '../components/modal';

const CsvImportPage = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleFileUpload = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/import-comments', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setModalMessage(`${data.message} total rows inserted ${data.totalRowsInserted}/${data.failedRowsCount}   ` );
        setModalOpen(true);
      } else {
        console.error('Error importing data:', response.statusText);
        setModalMessage('Error importing data');
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setModalMessage('Error uploading file');
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Import Comments from Excel (.xlsx)</h1>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        disabled={loading}
        className="mb-4"
      />
      {loading ? (
        <p className="text-blue-500">Importing data...</p>
      ) : (
        <p className="text-gray-500">Select an Excel (.xlsx) file to import</p>
      )}

      <Modal isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
};

export default CsvImportPage;
