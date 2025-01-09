import React, { useState } from "react";
import EventModal from "./EventModal"; // Import the modal component
import "./Event.css"; // Ensure custom CSS is loaded
import AuthContext from "../../context/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const EventCardsPage = ({ events }) => {
  const context = useContext(AuthContext);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCardClick = (event) => {
    setSelectedEvent(event); // Set the selected event to display in the modal
  };

  const closeModal = () => {
    setSelectedEvent(null); // Close the modal by resetting selectedEvent to null
  };

  return (
    <div className="min-h-screen bg-transparent p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-purple mb-6">
        {context.role == "alumni" ? (
          <Link
            to="/create-event"
            className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
          >
            Create Event
          </Link>
        ) : (
          "My Events"
        )}
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full max-w-5xl">
        {events.map((event, index) => (
          <div
            key={index}
            className="event-card bg-gray-900 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={() => handleCardClick(event)}
          >
            <img
              src={event.image || "https://via.placeholder.com/400x200"}
              alt={event.eventName}
              className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-200 transition-colors duration-300 group-hover:text-purple-500">
                {event.eventName}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                {event.location}
              </p>
              <p className="text-gray-400 text-sm">
                {event.eventDate} - {event.eventTime}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Event modal: display only if an event is selected */}
      {selectedEvent && (
        <EventModal event={selectedEvent} closeModal={closeModal} />
      )}
    </div>
  );
};

export default EventCardsPage;
