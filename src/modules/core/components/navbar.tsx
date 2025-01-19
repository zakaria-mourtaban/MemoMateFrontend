// src/Navbar.tsx
import React from "react";
import "../styles/navbar.css";
import Logo from "./logo";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {

	const navigate = useNavigate()
	return (
		<nav className="navbar">
			<div className="logo">
				<Logo/>
			</div>
			<div className="nav-divs">
				<p onClick={()=>{navigate("/workspaces")}}>Workspace</p>
				<p onClick={() => { navigate("/chats") }}>Chats</p>
			</div>
			<div className="pfp"></div>
		</nav>
	);
};

export default Navbar;
