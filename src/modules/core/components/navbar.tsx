// src/Navbar.tsx
import React from "react";
import "../styles/navbar.css";
import Logo from "./logo";
const Navbar: React.FC = () => {
	return (
		<nav className="navbar">
			<div className="logo">
				<Logo/>
			</div>
			<div className="nav-divs">
				<p>Workspace</p>
				<p>Chats</p>
				<p>Statistics</p>
			</div>
			<div className="pfp"></div>
		</nav>
	);
};

export default Navbar;
