import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";

const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosInstance.get("/api/announcements");
        setAnnouncements(response.data);
        console.log(response.data);
        if (response.data.length === 0) {
          setFeedback("No announcements currently");
        }
      } catch (error) {
        setFeedback(
          "Only alumni can view announcements or no announcements currently"
        );
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-100">
        Announcements
      </h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-grap-200 outline p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-violet-800">
                {announcement.title}
              </h3>
              <p className="text-gray-200 mt-2">{announcement.message}</p>
              <div className="mt-4 text-sm text-gray-300">
                <p>
                  <strong>Posted by:</strong> {announcement.user_name}
                </p>
                <p>
                  <strong>Created at:</strong>{" "}
                  {new Date(announcement.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsList;
