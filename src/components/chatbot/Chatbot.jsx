import React, { useState } from "react";
import Bot from "../bot/Bot"; // Ensure the correct path

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Chatbot Icon (Button) */}
      <button 
        className="fixed bottom-6 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {/* Chatbot Popup with Speech Bubble Tail */}
      <div className={`fixed bottom-20 right-5 w-[350px] h-[600px] bg-white shadow-lg rounded-lg transition-all ease-in-out duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        {/* Speech Bubble Tail */}
        <div className="absolute -bottom-5 right-5 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-gray-800 border-r-[20px] border-r-transparent"></div>
        <div className="absolute -bottom-[18px] right-[21px] w-0 h-0 border-l-[18px] border-l-transparent border-t-[18px] border-t-white border-r-[18px] border-r-transparent"></div>

        {/* Chatbot Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-semibold">🤖 AI Chat Assistant</h2>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">
            ✖
          </button>
        </div>

        {/* Chatbot UI */}
        <div className="p-2 h-[calc(100%-60px)] overflow-y-auto rounded-b-lg">
          <Bot />
        </div>
      </div>
    </div>
  );
}
