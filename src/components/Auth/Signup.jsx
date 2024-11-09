import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axios'; // Import axios instance

// Sample options for the role select box
const roleOptions = ["student", "college", "alumni"];

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    role: "student", // default role
    collegeName: "", // new college name field
    password: "", // new password field
    profilePicture: null, // file for profile picture
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: files[0], // Handle file uploads
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Update state for other form inputs
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.username ||
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.collegeName ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    // Validate email format
    if (!/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    const data = new FormData();
    data.append("json_data", JSON.stringify({
      username: formData.username,
      password: formData.password,
      name: formData.name,
      phone_number: formData.phone,
      email: formData.email,
      role: formData.role,
      college_name: formData.collegeName,
    }));

    // Append the profile picture if it exists
    if (formData.profilePicture) {
      data.append("profile_picture", formData.profilePicture);
    }

    try {
      // Make a request to the Flask API to register the user
      const response = await axiosInstance.post("/api/register", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to handle form data
        },
      });

      console.log(response.data.message);
      alert("Sign-up successful!");
      navigate(`/login/${formData.role}`);
    } catch (error) {
      console.error("There was an error registering the user!", error);
      setError(error.response?.data?.message || "An error occurred during registration");
    }

    setError("");
    console.log("Form data submitted:", formData);

    // Reset form after successful submission
    setFormData({
      username: "",
      name: "",
      phone: "",
      email: "",
      role: "student",
      collegeName: "",
      password: "",
      profilePicture: null,
    });
  };

  return (
    <div className="signup text-black max-w-4xl mx-auto p-6 border-[1px] border-[#4d4d4d] rounded-xl">
      <h2 className="text-3xl font-bold mb-4 text-center text-lightWhite">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Row 1: Username & Full Name */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-400" htmlFor="username">
              Username:
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-900 rounded-md"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-400" htmlFor="name">
              Full Name:
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-900 rounded-md"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 2: Phone & Email */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-400" htmlFor="phone">
              Phone Number:
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-900 rounded-md"
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g., 1234567890"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-400" htmlFor="email">
              Email Address:
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-900 rounded-md"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 3: College Name & Role */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-400" htmlFor="collegeName">
              College Name:
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-900 rounded-md"
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-400" htmlFor="role">
              Role:
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-900 rounded-md"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4: Profile Picture & Password */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-white text-sm font-medium" htmlFor="profilePicture">
              Profile Picture:
            </label>
            <input
              className="mt-1 block w-full p-2 border text-white border-gray-900 rounded-md"
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-400" htmlFor="password">
              Password:
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-900 rounded-md"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="mt-6 w-full bg-purple hover:bg-darkPurple text-white p-2 rounded-md" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
