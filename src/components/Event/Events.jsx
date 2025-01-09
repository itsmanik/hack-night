import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios'; // Assuming you have axiosInstance already configured
import EventCardsPage from './EventCardsPage';

const Events = () => {
  const [events, setEvents] = useState([]); // To store fetched events
  const [error, setError] = useState(""); // For error handling
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/api/alumni/get_events');
        setEvents(response.data); // Set events data to state
        console.log('Fetched events:', response.data);
        setLoading(false); // Stop loading when data is fetched
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this runs only once on component mount

  if (loading) {
    return <div>Loading events...</div>; // Loading state UI
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  return <EventCardsPage events={events} />; // Pass events to EventCardsPage component
};

export default Events;
