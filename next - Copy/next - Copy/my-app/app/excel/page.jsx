"use client"
import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';
import * as XLSX from 'xlsx';

const ExcelPage = () => {
  const [loading, setLoading] = useState(false);

  const fetchDataAndExport = async () => {
    try {
      setLoading(true);
      // Fetch data from the API
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const posts = await response.json();

      // Prepare data for export
      const dataToExport = posts.map(post => ({
        Id: post.id,
        name: post.name,
        email: post.email,
        body :post.body
      }));

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Posts');

      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, 'post.xlsx');

      console.log('Excel file generated successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error exporting data:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Export Posts to Excel</h1>
      <button
        onClick={fetchDataAndExport}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Exporting...' : 'Export to Excel'}
      </button>
    </div>
  );
};

export default ExcelPage;
