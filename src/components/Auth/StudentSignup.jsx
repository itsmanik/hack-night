import React, { useState } from "react";
import axiosInstance from "../../axios"; // Assuming you have your axios instance
import styles from "./StudentSignup.module.css"; // CSS module for styling
import { useNavigate } from "react-router-dom";

const skillsOptions = [
  "JavaScript", "React", "Node.js", "Python", "Java", "C++", "SQL", "HTML", "CSS",
  "Git", "Machine Learning", "Data Science", "UI/UX Design", "Blockchain", "Cloud Computing"
];

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resume: null,
    linkedin: "",
    selectedSkills: [],
    bio: "",
    learning_years: 0,
    interests: "",

  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleLinkedInChange = (e) => {
    setFormData({
      ...formData,
      linkedin: e.target.value,
    });
  };

  const handleSkillToggle = (skill) => {
    setFormData((prevData) => {
      const newSkills = prevData.selectedSkills.includes(skill)
        ? prevData.selectedSkills.filter((s) => s !== skill)
        : [...prevData.selectedSkills, skill];
      return { ...prevData, selectedSkills: newSkills };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic Validation
    if (!formData.resume) {
      setError("Resume is required");
      return;
    }
  
    if (!formData.linkedin) {
      setError("LinkedIn profile URL is required");
      return;
    }
  
    if (
      !/^https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+(?:\/|$)/.test(
        formData.linkedin
      )
    ) {
      setError("Please enter a valid LinkedIn URL");
      return;
    }
  
    setError("");
  
    // Prepare FormData
    const data = new FormData();
    data.append("resume", formData.resume);  // File data
    data.append("json_data", JSON.stringify({
      linkedin: formData.linkedin,
      skills: formData.selectedSkills, 
      bio: formData.bio,
      learning_years: formData.learning_years,
      interests: formData.interests,
    }));
    console.log(data);
    try {
      const response = await axiosInstance.post("/api/profile/student", data, {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data", // Ensure the correct content type
          "Accept": "application/json",  // Ensure the correct content type
        },
      });
      console.log(response.data.error);
      setSuccess(response.data.message);  // On success, show success message
  
      // Clear form after successful submission
      setFormData({
        resume: null,
        linkedin: "",
        selectedSkills: [],
      });
      navigate("/profile");
    } catch (err) {
      setError("There was an error creating the student profile");
      console.error(err);
    }
  };
  
  

  return (
    <div className={styles.registrationForm}>
      <h2 className={styles.heading}>Student Registration</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Resume Upload */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="resume">
            Upload Resume:
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className={styles.input}
          />
        </div>

        {/* LinkedIn Profile URL */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="linkedin">
            LinkedIn Profile URL:
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleLinkedInChange}
            required
            placeholder="https://www.linkedin.com/in/username"
            className={styles.input}
          />
        </div>

        {/* Interested Skills (Buttons) */}
        <div className={styles.skillsSection}>
          <label className={styles.label}>Interested Skills:</label>
          <div className={styles.skillsButtons}>
            {skillsOptions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`${styles.skillButton} ${
                  formData.selectedSkills.includes(skill) ? styles.selected : ""
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentSignup;
