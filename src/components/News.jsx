import React, { useState } from 'react';
import axios from 'axios';

const Newz = () => {
  const [text, setText] = useState(''); // State for input text
  const [output, setOutput] = useState(''); // State for server response
  const [status, setStatus] = useState(''); // State for "Fake" or "Real"

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/welcome', { text });

      // Assuming the server sends a response with `output` and `status` keys
      setOutput(response.data.output);
      setStatus(response.data.status); // Status can be "Fake" or "Real"
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Something went wrong';
      console.error('Error:', errorMessage);
      setOutput('Error: ' + errorMessage);
      setStatus(''); // Reset status on error
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Title and Description */}
      <div className="py-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
          AI That Fights Misinformation
        </h2>
        <p className="max-w-xl mx-auto mt-4 text-lg text-gray-700">
          Detect fake news, manipulated photos, and deepfake videos in seconds
        </p>
      </div>

      {/* Input Field and Button */}
      <div className="flex flex-col items-center justify-center mt-6 space-y-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full max-w-lg px-6 py-4 text-xl border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={handleSubmit}
          className="px-8 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none transition-all transform hover:scale-105"
        >
          Detect
        </button>
      </div>

      {/* Output Display in Card */}
      {output && (
        <div className="max-w-xl mx-auto mt-12 p-6 border border-gray-200 rounded-lg shadow-xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-600">Fake or Real:</span>
            <span
              className={`text-xl font-bold ${
                status === 'Fake' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {status}
            </span>
          </div>
          <p className="text-gray-800">
            <strong>Output:</strong> {output}
          </p>
        </div>
      )}
    </div>
  );
};

export default Newz;
