import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

function Voice() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const [speaking, setSpeaking] = useState(false);
  const [mails, setmails] = useState(inputText);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
        if(inputText.includes("report by mail")){
            const res=await axios.post('https://aimailssender.onrender.com/user-chat',{
                user_chat:mails
            });

            console.log(res.data);
             const botMessage = {
        text: 'Your mail is sent to correct place',
        sender: 'bot',
        time: new Date().toLocaleTimeString(),
      };
      setmails('');
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        else{
const response = await fetch('https://cmr-1.onrender.com/run-flow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue: inputText }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
//    console.log(data);
      
      const botMessage = {
        text: data.output || 'Unable to analyze the news at this time.',
        sender: 'bot',
        time: new Date().toLocaleTimeString(),
      };
      setmails((v)=>(v+"User Input : "+inputText+"\n AI responce : "+data.output));
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Speak the bot's response
      speakText(botMessage.text);
        }
      
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const botErrorMessage = {
        text: 'An error occurred while analyzing the news. Please try again later.',
        sender: 'bot',
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botErrorMessage]);
    }

    setInputText('');
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInputText(speechText);
    };

    recognition.onerror = (event) => {
      console.error('Voice input error:', event.error);
    };

    recognition.onend = () => {
      console.log('Voice input ended.');
    };

    recognition.start();
  };

  const speakText = (text) => {
    if (synthRef.current.speaking) {
      console.error('Already speaking...');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => console.error('Speech synthesis error:', event.error);

    setSpeaking(true);
    synthRef.current.speak(utterance);
  };

  const stopVoice = () => {
    synthRef.current.cancel();
    setSpeaking(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Fake News Detective</h1>
        <p className="text-sm">Share any news and I'll help you verify its authenticity</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-end space-x-2 max-w-xs ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {message.sender === 'user' ? 'U' : 'B'}
              </div>
              <div>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">{message.time}</div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={startVoiceInput}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            🎤 Voice Input
          </button>
          <button
            onClick={stopVoice}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={!speaking}
          >
            🛑 Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default Voice;
