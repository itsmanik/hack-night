import React from "react";

const Profile = () => {
  // User data defined within the component
  const user = {
    profilePicture: "img",
    name: "Suji19",
    username: "suji19",
    email: "suji19@example.com",
    phone: "123-456-7890",
    role: "Computer Science and Engineering Student",
    collegeName: "Tech University",
  };

  return (
    <div className="profile-container max-w-4xl mx-auto p-8 mt-10 border border-gray-200 shadow-lg rounded-lg bg-white">
      <Header user={user} />
      <DetailsSection user={user} />
    </div>
  );
};

const Header = ({ user }) => (
  <div className="header flex items-center space-x-6 mb-10">
    <img
      src={user.profilePicture || "/default-profile.png"}
      alt="Profile"
      className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600 shadow-md"
    />
    <div>
      <h1 className="text-4xl font-bold text-gray-800">{user.name}</h1>
      <p className="text-lg text-gray-500">{user.role}</p>
    </div>
  </div>
);

const DetailsSection = ({ user }) => (
  <div className="details-section grid grid-cols-2 gap-8">
    <Section title="Personal Details">
      <Detail label="Username" value={user.username} />
      <Detail label="Email" value={user.email} />
      <Detail label="Phone" value={user.phone} />
    </Section>
    <Section title="Professional Details">
      <Detail label="Role" value={user.role} />
      <Detail label="College" value={user.collegeName} />
    </Section>
  </div>
);

const Section = ({ title, children }) => (
  <div className="section">
    <h2 className="text-xl font-semibold text-indigo-600 mb-4">{title}</h2>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const Detail = ({ label, value }) => (
  <li className="flex items-center">
    <span className="w-32 font-medium text-gray-700">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </li>
);

export default Profile;
