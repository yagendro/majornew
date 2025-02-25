import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from '../components/EventList';

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Upcoming and Ongoing Events</h1>
      <EventList events={events} />
    </div>
  );
};

export default EventPage;