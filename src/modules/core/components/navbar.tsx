// src/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <div className="nav-links">
        <Link to="/workspace">Workspace</Link>
        <Link to="/chats">Chats</Link>
        <Link to="/statistics">Statistics</Link>
      </div>
      <div className="pfp">PFP</div>
    </nav>
  );
};

export default Navbar;