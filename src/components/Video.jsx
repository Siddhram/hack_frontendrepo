import React, { useState } from 'react';
import { Client, Storage } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Video = () => {
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
      setMessage('Please select a video to upload.');
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
      setMessage(`Video uploaded successfully!`);

      // Send File URL to the API
      const apiResponse = await axios.post('https://hack-backrepo.onrender.com/welcome', {
        text: ""+fileViewUrl,
      });

      setStatus(apiResponse.data.status);
    } catch (error) {
      console.error(error);
      setMessage('Video upload failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 text-white flex flex-col items-center justify-center py-10 px-4">
      <div className="max-w-2xl w-full bg-white text-gray-900 rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
          AI Video Analyzer
        </h2>
        <p className="text-lg text-center text-gray-700 mb-6">
          Detect deepfake videos and manipulated content in just a few seconds.
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 bg-gray-50 hover:bg-gray-100">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-gray-600 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto mb-4"
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
              <span className="text-xl font-semibold">Click to Upload Video</span>
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          onClick={handleFileUpload}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          Upload Video
        </button>

        {/* Display Uploaded Video */}
        {fileUrl && (
          <div className="mt-8 border border-gray-200 rounded-lg p-4 text-center bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Uploaded Video:</h3>
            <video
              src={fileUrl}
              controls
              className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Result Section */}
        {status && (
          <div className="mt-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Analysis Result:</h3>
            <p
              className={`text-xl font-bold text-center ${
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

export default Video;
