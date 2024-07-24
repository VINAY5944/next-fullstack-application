"use client";
import React, { useState } from "react";
import Dropdown from "../components/dropdown";
import Button from "../components/button";

const Page = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds the maximum limit of 5MB.");
    } else {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!file) {
      setError("Please select a file.");
      return;
    }
    if (!selectedUser) {
      setError("Please select a user.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("authorId", selectedUser);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
        setTitle("");
        setFile(null);
        setSelectedUser("");
        setError("");
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-200">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">File Upload Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full max-w-xs"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">Select User</label>
              <Dropdown api={"http://localhost:3000/api/user"} onSelectUser={handleUserSelect} />
            </div>
            <div className="mt-4">
              <Button placeholder={"Submit"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
