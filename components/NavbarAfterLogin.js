// filepath: /d:/major texpo Project 3.0/frontend/src/components/NavbarAfterLogin.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavbarAfterLogin = () => {
  return (
    <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/">TournamentExpo</Link>
          </div>
          <ul className="navbar-list">
        <li className="navbar-item"><Link to="/home-after-login">Home</Link></li>
        <li className="navbar-item"><Link to="/events-after-login">Events</Link></li>
        <li className="navbar-item"><Link to="/about-after-login">About</Link></li>
        <li className="navbar-item"><Link to="/profile">Profile</Link></li>
      </ul>
        </nav>
  );
};

export default NavbarAfterLogin;