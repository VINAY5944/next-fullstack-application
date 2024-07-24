// components/ForgotPasswordForm.jsx
"use client"
import React, { useState } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Password reset email sent successfully.');
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      alert('Error sending password reset email. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 px-2 py-1 rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Send otp to email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
