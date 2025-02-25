import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TournamentExpo</Link>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/organize">Events</Link></li>
        <li className="navbar-item"><Link to="/signup">Signup</Link></li>
        <li className="navbar-item"><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;