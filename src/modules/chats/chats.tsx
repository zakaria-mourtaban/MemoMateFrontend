import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../core/components/navbar";
import "./styles/chats.css";
import axios from "axios";
import { getTokenFromCookie } from "../core/utils/api";

const Chats = () => {
  const [chats, setChats] = useState([]); // State to store chats
  const [currentChat, setCurrentChat] = useState(null); // State to track the currently selected chat
  const [newMessage, setNewMessage] = useState(""); // State to store the new message input
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  // Fetch chats for the current user when the component mounts
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = getTokenFromCookie();
        const response = await axios.post(
          "http://localhost:5000/api/chat/giveme",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.chats) {
          // Initialize messages as an empty array for each chat
          const chatsWithMessages = response.data.chats.map(chat => ({
            ...chat,
            messages: []
          }));
          setChats(chatsWithMessages);
          if (chatsWithMessages.length > 0) {
            setCurrentChat(chatsWithMessages[0]); // Set the first chat as the current chat
          }
        } else {
          setChats([]); // Ensure chats is an empty array if chats don't exist
        }
      } catch (err) {
        setError("Failed to fetch chats. Please try again.");
        console.error("Error fetching chats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Handle clicking on a chat in the chat tree
  const handleChatClick = (chat) => {
    setCurrentChat(chat);
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
	if (newMessage.trim()) {
	  try {
		// Make a POST request to the API endpoint
		const token = getTokenFromCookie();
		const response = await axios.post(
		  `/api/chat/${currentChat._id}/call`,
		  { query: newMessage },
		  {
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${token}`,
			},
		  }
		);
  
		// Update the current chat with the new message
		const updatedChat = {
		  ...currentChat,
		  messages: [
			...currentChat.messages,
			{ sender: "user", text: newMessage },
		  ],
		};
  
		// Update the chats state with the updated chat
		setChats((prevChats) =>
		  prevChats.map((chat) =>
			chat._id === updatedChat._id ? updatedChat : chat
		  )
		);
  
		// Set the updated chat as the current chat
		setCurrentChat(updatedChat);
		setNewMessage(""); // Clear the input field
	  } catch (err) {
		setError("Failed to send message. Please try again.");
		console.error("Error sending message:", err);
	  }
	}
  };

  // Render loading state
  if (loading) {
    return <div>Loading chats...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render the chat interface
  return (
    <div className="chats-page">
      <Navbar />
      <div className="chats-container">
        {/* Chat Tree */}
        <div className="chat-tree">
          {chats && chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`chat-item ${currentChat?._id === chat._id ? "active" : ""}`}
                onClick={() => handleChatClick(chat)}
              >
                {chat.name}
              </div>
            ))
          ) : (
            <div>No chats available</div>
          )}
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {currentChat ? (
            <>
              <div className="chat-messages">
                {currentChat.messages && currentChat.messages.length > 0 ? (
                  currentChat.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.sender}`}
                    >
                      {message.text}
                    </div>
                  ))
                ) : (
                  <div>No messages yet</div>
                )}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div>No chat selected</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;