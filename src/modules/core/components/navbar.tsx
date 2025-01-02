// src/Navbar.tsx
import React from "react";
import "../styles/navbar.css";
const Navbar: React.FC = () => {
	return (
		<nav className="navbar">
			<div className="logo">
				<img
					src={require("../../../assets/icons/Zakaria Mourtaban_NoText.png")}
					alt="Logo"
				/>
			</div>
			<div className="nav-divs">
				<h4>Workspace</h4>
				<h4>Chats</h4>
				<h4>Statistics</h4>
			</div>
			<div className="pfp"></div>
		</nav>
	);
};

export default Navbar;
