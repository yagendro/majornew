import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleEventsClick = () => {
    navigate('/organize');
  };

  const handleExploreClick = () => {
    // Redirect to the signup page
    navigate('/signup');
  };

  return (
    <div>
      <section className="hero">
        <h1>Welcome to TournamentExpo</h1>
        <p>Experience and manage thrilling sports events, including international, national games, and many more.</p>
        <div className="buttons">
          <button id="event-btn" onClick={handleEventsClick}>Events</button>
          <button onClick={handleExploreClick}>Explore</button>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2025 TournamentExpo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
