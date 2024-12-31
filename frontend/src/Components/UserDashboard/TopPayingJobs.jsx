import React, { useEffect, useState } from "react";
import axios from "axios";
import DropdownFilters from "./DropdownFilters";
import JobSalaryChart from "./JobSalaryChart";
import Navbar from '../NavBar';
import "./TopPayingJobs.css"

const UserDashboard = () => {
  const [topJobs, setTopJobs] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("Data Analyst");
  const [selectedLocation, setSelectedLocation] = useState("India");

  // Fetch dropdown options (job titles and locations)
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/dropdown-options")
      .then((response) => {
        setJobTitles(response.data.job_titles);
        setLocations(response.data.locations);
      })
      .catch((error) => console.error("Error fetching dropdown options:", error));
  }, []);

  // Fetch top-paying jobs based on selected filters
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/top-paying-jobs", {
        params: {
          job_title: selectedJobTitle,
          location: selectedLocation,
        },
      })
      .then((response) => setTopJobs(response.data))
      .catch((error) => console.error("Error fetching top jobs:", error));
  }, [selectedJobTitle, selectedLocation]);

  return (
    <div className="userDashboard" style={{ padding: "50px" }}>
      <h1>Top Paying Jobs</h1>
      <Navbar />
      <DropdownFilters
        jobTitles={jobTitles}
        locations={locations}
        selectedJobTitle={selectedJobTitle}
        setSelectedJobTitle={setSelectedJobTitle}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <JobSalaryChart jobs={topJobs} />
    </div>
  );
};

export default UserDashboard;
