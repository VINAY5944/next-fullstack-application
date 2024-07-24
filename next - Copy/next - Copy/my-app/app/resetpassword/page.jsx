"use client"
// components/ResetPasswordForm.jsx

import React, { useState } from "react";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/reset-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
      } else {
        const { message } = await response.json();
        setSuccessMessage(message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  );
};

export default ResetPasswordForm;
