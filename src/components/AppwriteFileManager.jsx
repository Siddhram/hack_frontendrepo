import React, { useState } from 'react';
import { Client, Storage } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const AppwriteFileManager = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // Fake or Real

  // Initialize Appwrite client
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('6786b37a000e1a5e8c68'); // Replace with your Project ID

  const storage = new Storage(client);

  // Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle File Upload
  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select an image to upload.');
      return;
    }

    try {
      const generatedFileId = uuidv4();
      const response = await storage.createFile(
        '6786b6e90012a9d714fd', // Replace with your Bucket ID
        generatedFileId,
        file
      );

      const fileViewUrl = await storage.getFileView(
        '6786b6e90012a9d714fd',
        response.$id
      );

      setFileUrl(fileViewUrl);
      setMessage(`Image uploaded successfully!`);

      // Send File URL to the API
      const apiResponse = await axios.post('http://localhost:3000/welcome', {
        text: "" + fileViewUrl,
      });

      setStatus(apiResponse.data.status);
    } catch (error) {
      console.error(error);
      setMessage('Image upload failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Appwrite Image Manager</h2>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-gray-500 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-lg">Upload Image</span>
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          onClick={handleFileUpload}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Image
        </button>

        {/* Display Uploaded Image */}
        {fileUrl && (
          <div className="mt-6 border border-gray-200 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Uploaded Image:</h3>
            <img
              src={fileUrl}
              alt="Uploaded"
              className="w-full max-w-xs mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Result Section */}
        {status && (
          <div className="mt-6 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Analysis Result:</h3>
            <p
              className={`text-xl font-bold ${
                status === 'Fake' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {status === 'Fake' ? 'Fake' : 'Real'}
            </p>
          </div>
        )}

        {/* Message Section */}
        {message && (
          <div className="mt-4 text-center text-gray-700">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppwriteFileManager;
