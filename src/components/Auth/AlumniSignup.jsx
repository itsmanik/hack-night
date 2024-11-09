import React, { useState } from "react";
import axios from "../../axios"; // Install axios with `npm install axios` if not installed
import styles from "./AlumniSignup.module.css";
import { useNavigate } from "react-router-dom";

const skillsOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "SQL",
  "HTML",
  "CSS",
  "Git",
  "Machine Learning",
  "Data Science",
  "UI/UX Design",
  "Blockchain",
  "Cloud Computing",
];

const AlumniSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resume: null,
    linkedin: "",
    selectedSkills: [],
    experience: "",
    openForMentorship: "No",
    position: "",
    company: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) =>
    setFormData({ ...formData, resume: e.target.files[0] });
  const handleLinkedInChange = (e) =>
    setFormData({ ...formData, linkedin: e.target.value });
  const handlePositionChange = (e) =>
    setFormData({ ...formData, position: e.target.value });
  const handleCompanyChange = (e) =>
    setFormData({ ...formData, company: e.target.value });
  const handleExperienceChange = (e) =>
    setFormData({ ...formData, experience: e.target.value });
  const handleMentorshipChange = (e) =>
    setFormData({ ...formData, openForMentorship: e.target.value });

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

    if (
      !formData.resume ||
      !formData.linkedin ||
      !formData.position ||
      !formData.company ||
      !formData.experience
    ) {
      setError("Please fill out all required fields");
      return;
    }

    const data = new FormData();
    data.append("resume", formData.resume);
    data.append(
      "json_data",
      JSON.stringify({
        linkedin: formData.linkedin,
        position: formData.position,
        company: formData.company,
        experience_years: formData.experience,
        skills: formData.selectedSkills,
        openForMentorship: formData.openForMentorship,
      })
    );

    try {
      const response = await axios.post("/api/profile/alumni", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`, // Assuming token stored in local storage
        },
      });

      if (response.status === 201) {
        setSuccess("Registration successful!");
        setError("");
        setFormData({
          resume: null,
          linkedin: "",
          selectedSkills: [],
          experience: "",
          openForMentorship: "No",
          position: "",
          company: "",
        });
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : "An error occurred");
    }
  };

  return (
    <div className={styles.registrationForm}>
      <h2 className={styles.heading}>Alumni Registration</h2>
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
            onChange={handleFileChange}
            required
            className={styles.input}
          />
        </div>

        {/* LinkedIn Profile URL */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="linkedin">
            LinkedIn Profile Username:
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleLinkedInChange}
            required
            placeholder="username"
            className={styles.input}
          />
        </div>

        {/* Position */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="position">
            Position:
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handlePositionChange}
            required
            placeholder="CEO, CTO, etc."
            className={styles.input}
          />
        </div>

        {/* Company */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="company">
            Company:
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleCompanyChange}
            required
            placeholder="Company Name"
            className={styles.input}
          />
        </div>

        {/* Experience Input */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="experience">
            Years of Experience:
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleExperienceChange}
            required
            min="1"
            className={styles.input}
          />
        </div>

        {/* Expertise Skills (Buttons) */}
        <div className={styles.skillsSection}>
          <label className={styles.label}>Expertise Skills:</label>
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

        {/* Open for Mentorship (Radio Buttons) */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Open for Mentorship:</label>
          <div>
            <label>
              <input
                type="radio"
                name="openForMentorship"
                value="Yes"
                checked={formData.openForMentorship === "Yes"}
                onChange={handleMentorshipChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="openForMentorship"
                value="No"
                checked={formData.openForMentorship === "No"}
                onChange={handleMentorshipChange}
              />
              No
            </label>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default AlumniSignup;
