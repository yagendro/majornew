import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = { name, type, date, location, description, createdBy: 'user_id' }; // Replace 'user_id' with actual user ID
    await axios.post('/api/events', event);
    // Reset form fields after submission
    setName('');
    setType('');
    setDate('');
    setLocation('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
      <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Event Type" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Event Location" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required></textarea>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;