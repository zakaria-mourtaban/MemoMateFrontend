import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../core/components/navbar"; // Assuming you have a Navbar component
import "./styles/chats.css";

const Chats = () => {
	const [chats, setChats] = useState([
		{
			id: 1,
			name: "Chat 1",
			messages: [
				{ sender: "user", text: "Hello" },
				{ sender: "bot", text: "Hi there!" },
			],
		},
		{
			id: 2,
			name: "Chat 2",
			messages: [
				{ sender: "user", text: "How are you?" },
				{ sender: "bot", text: "I am a bot, I do not have feelings." },
			],
		},
	]);

	const [currentChat, setCurrentChat] = useState(chats[0]);
	const [newMessage, setNewMessage] = useState("");

	const navigate = useNavigate();

	const handleChatClick = (chat) => {
		setCurrentChat(chat);
	};

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			const updatedChat = {
				...currentChat,
				messages: [
					...currentChat.messages,
					{ sender: "user", text: newMessage },
				],
			};
			setChats(
				chats.map((chat) =>
					chat.id === updatedChat.id ? updatedChat : chat
				)
			);
			setCurrentChat(updatedChat);
			setNewMessage("");
		}
	};

	return (
		<div className="chats-page">
			<Navbar />
			<div className="chats-container">
				<div className="chat-tree">
					{chats.map((chat) => (
						<div
							key={chat.id}
							className={`chat-item ${
								currentChat.id === chat.id ? "active" : ""
							}`}
							onClick={() => handleChatClick(chat)}
						>
							{chat.name}
						</div>
					))}
				</div>
				<div className="chat-window">
					<div className="chat-messages">
						{currentChat.messages.map((message, index) => (
							<div
								key={index}
								className={`message ${message.sender}`}
							>
								{message.text}
							</div>
						))}
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
				</div>
			</div>
		</div>
	);
};

export default Chats;