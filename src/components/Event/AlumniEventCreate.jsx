import React, { useState } from "react";
import axiosInstance from "../../axios"; // assuming axios instance is correctly set

const AlumniEventCreate = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    location: "",
    description: "",
    image: null,
    maxParticipants: "",
  });

  // Handle changes for text and number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (image)
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setEventData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Simple validation (optional)
    if (
      !eventData.eventName ||
      !eventData.description ||
      !eventData.maxParticipants ||
      !eventData.location ||
      !eventData.eventDate ||
      !eventData.eventTime
    ) {
      setError("All fields are required");
      return;
    }

    // Create FormData to send data in multipart format
    const formData = new FormData();

    // Append event details to FormData
    // formData.append('event_name', eventData.eventName);
    // formData.append('event_description', eventData.description);
    // formData.append('max_participants', eventData.maxParticipants);
    // formData.append('event_venue', eventData.location);
    // formData.append('event_date', eventData.eventDate);
    // formData.append('event_time', `${eventData.eventTime}:00`); // Ensure the time format is "HH:MM:00"

    formData.append(
      "json_data",
      JSON.stringify({
        event_name: eventData.eventName,
        event_description: eventData.description,
        max_participants: eventData.maxParticipants,
        event_venue: eventData.location,
        event_date: eventData.eventDate,
        event_time: `${eventData.eventTime}:00`,
      })
    );
    // Check if image exists and append it to FormData
    if (eventData.image) {
      formData.append("event_image", eventData.image);
    }

    try {
      // Send POST request to the backend API with FormData
      const response = await axiosInstance.post(
        "/api/alumni/create_event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to handle form data
          },
        }
      );

      // Handle success
      console.log("Event created successfully:", response.data);
      alert("Event created successfully!");
      // Redirect or navigate to another page if needed, or display a success message
    } catch (error) {
      // Handle error
      console.error(
        "Error creating event:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response?.data?.message ||
          "An error occurred while creating the event"
      );
    }

    setError(""); // Clear any previous errors
    console.log("Form data submitted:", eventData);

    // Reset form data after successful submission (if needed)
    setEventData({
      eventName: "",
      description: "",
      maxParticipants: "",
      location: "",
      eventDate: "",
      eventTime: "",
      image: null,
    });
  };

  return (
    <div className="flex justify-center items-center transparent">
      <div className="max-w-lg w-full bg-gray-950 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple mb-6 text-center">
          Create an Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              placeholder="Enter event name"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Event Date and Time */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400">
                Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={eventData.eventDate}
                onChange={handleChange}
                className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400">
                Time
              </label>
              <input
                type="time"
                name="eventTime"
                value={eventData.eventTime}
                onChange={handleChange}
                className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>

          {/* Max Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Max Participants
            </label>
            <input
              type="number"
              name="maxParticipants"
              value={eventData.maxParticipants}
              onChange={handleChange}
              placeholder="Enter maximum participants"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Event Location */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              placeholder="Event location"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Description
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Brief event description"
              rows="4"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Event Image */}
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Event Image (optional)
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 w-full text-sm text-gray-400"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-purple text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlumniEventCreate;
