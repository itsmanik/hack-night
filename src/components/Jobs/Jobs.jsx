import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios"; // Use your axios instance
import JobListingsPage from "./JobListingsPage";


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/api/alumni/get_jobs");
        const jobData = response.data.map((job) => ({
          company: job.company,
          title: job.title,
          location: job.location,
          requirements: job.required_skills,
          description: job.description,
        }));
        setJobs(jobData);
        console.log(jobData);
      } catch (err) {
        setError("Error fetching jobs. Please try again.");
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      {error && <span>{error}</span>}
      <JobListingsPage jobs={jobs} />
    </>
  );
};

export default Jobs;
