import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

const EventList = ({ events }) => {
  const [showModal, setShowModal] = useState(false);
  const [teamDetails, setTeamDetails] = useState({
    teamName: '',
    numberOfPlayers: 11,
    players: Array(11).fill({ name: '', number: '', email: '' })
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    // Show the modal for team registration
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPlayers = [...teamDetails.players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setTeamDetails({ ...teamDetails, players: updatedPlayers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the team details to local storage or an API
    const registrationDetails = { ...teamDetails, event: selectedEvent };
    localStorage.setItem('registrationDetails', JSON.stringify(registrationDetails));
    console.log('Registration Details:', registrationDetails);
    setShowModal(false);
    navigate('/profile');
  };

  return (
    <div className="event-list">
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <h2>{event.title}</h2>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p>{event.description}</p>
          <button onClick={() => handleRegister(event)}>Register</button>
        </div>
      ))}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Register Team</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="teamName">Team Name:</label>
                <input
                  type="text"
                  id="teamName"
                  value={teamDetails.teamName}
                  onChange={(e) => setTeamDetails({ ...teamDetails, teamName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="numberOfPlayers">Number of Players:</label>
                <input
                  type="number"
                  id="numberOfPlayers"
                  value={teamDetails.numberOfPlayers}
                  onChange={(e) => setTeamDetails({ ...teamDetails, numberOfPlayers: e.target.value })}
                  required
                />
              </div>
              {Array.from({ length: teamDetails.numberOfPlayers }).map((_, index) => (
                <div key={index} className="form-group">
                  <label>Player {index + 1}:</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={teamDetails.players[index].name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Number"
                    value={teamDetails.players[index].number}
                    onChange={(e) => handleInputChange(index, 'number', e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={teamDetails.players[index].email}
                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;