import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewChat = () => {
  const [chatName, setChatName] = useState('');
  const navigate = useNavigate();

  const handleCreateChat = () => {
    if (chatName.trim()) {
      // Here you would add the new chat to your chats state
      // For simplicity, we'll just navigate back to the chats page
      navigate('/chats');
    }
  };

  return (
    <div className="new-chat-page">
      <h1>Create a New Chat</h1>
      <input
        type="text"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
        placeholder="Enter chat name..."
      />
      <button onClick={handleCreateChat}>Create Chat</button>
    </div>
  );
};

export default NewChat;