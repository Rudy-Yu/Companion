import React, { useState } from 'react';
import PlayfulInput from '../components/PlayfulInput';
import PlayfulButton from '../components/PlayfulButton';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory((prev) => [...prev, { text: message, sender: 'user' }]);
      setMessage('');
      // Mock response
      setTimeout(() => {
        setChatHistory((prev) => [...prev, { text: 'This is a mock response.', sender: 'companion' }]);
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="border rounded p-4 mb-4 h-64 overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-gray-200 rounded p-2">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <PlayfulInput
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <PlayfulButton onClick={handleSendMessage}>Send</PlayfulButton>
      </div>
    </div>
  );
};

export default ChatPage; 