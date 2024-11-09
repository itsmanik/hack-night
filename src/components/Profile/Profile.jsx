import React, { useEffect, useState } from "react";
import axios from "../../axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch profile data using Axios
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/profile");
        console.log("Profile data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container max-w-4xl mx-auto p-8 mt-10 border-[1px] border-[#353535] shadow-lg rounded-lg text-white">
      <Header user={user} />
      <DetailsSection user={user} />
    </div>
  );
};

const Header = ({ user }) => (
  <div className="header flex items-center space-x-6 mb-10">
    <img
      src={user.profile_picture || "/default-profile.png"}
      alt="Profile"
      className="w-32 h-32 rounded-full object-cover border-4 border-darkPurple shadow-md"
    />
    <div>
      <h1 className="text-4xl font-bold text-white">{user.name}</h1>
      <p className="text-lg text-white">{user.role}</p>
    </div>
  </div>
);

const DetailsSection = ({ user }) => (
  <div className="details-section grid grid-cols-2 gap-8">
    <Section title="Personal Details">
      <Detail label="Username" value={user.username} />
      <Detail label="Email" value={user.email} />
      <Detail label="Phone" value={user.phone_number} />
    </Section>
    <Section title="Professional Details">
      <Detail label="Role" value={user.role} />
      <Detail label="College" value={user.college} />
    </Section>
  </div>
);

const Section = ({ title, children }) => (
  <div className="section">
    <h2 className="text-xl font-semibold text-purple mb-4">{title}</h2>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const Detail = ({ label, value }) => (
  <li className="flex items-center">
    <span className="w-32 font-medium text-lightWhite">{label}:</span>
    <span className="text-lightWhite">{value}</span>
  </li>
);

export default Profile;
