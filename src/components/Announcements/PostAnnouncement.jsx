import React, { useState } from "react";
import axiosInstance from "../../axios";

const PostAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [passoutYear, setPassoutYear] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/post_announcement", {
        title,
        message,
        passout_year: passoutYear,
      });
      setFeedback(response.data.message);
    } catch (error) {
      console.log(error);
      setFeedback(
        "Only alumni can view announcements or no announcements currently"
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-950 rounded-lg shadow-lg outline">
      <h2 className="text-3xl font-semibold mb-6 text-gray-200">
        Post Announcement
      </h2>
      <form onSubmit={handlePostAnnouncement} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-200 bg-black"
          />
        </div>
        <div>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-200 bg-black"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Passout Year"
            value={passoutYear}
            onChange={(e) => setPassoutYear(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-200 bg-black"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            Post Announcement
          </button>
        </div>
      </form>
      {feedback && (
        <p
          className={`mt-4 text-sm ${
            feedback.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
};

export default PostAnnouncement;
