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
				<div>Workspace</div>
				<div>Chats</div>
				<div>Statistics</div>
			</div>
			<div className="pfp"></div>
		</nav>
	);
};

export default Navbar;
