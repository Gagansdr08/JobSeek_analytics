import React from "react";
import "./TopPayingJobs.css" // Make sure to include the CSS file for styling

const DropdownFilters = ({
  jobTitles,
  locations,
  selectedJobTitle,
  setSelectedJobTitle,
  selectedLocation,
  setSelectedLocation,
}) => {
  return (
    <div className="dropdown-filters">
      <div className="dropdown-group">
        <label htmlFor="jobTitleDropdown">Job Title:</label>
        <div className="custom-dropdown">
          <select
            id="jobTitleDropdown"
            value={selectedJobTitle}
            onChange={(e) => setSelectedJobTitle(e.target.value)}
          >
            {jobTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="dropdown-group">
        <label htmlFor="locationDropdown">Location:</label>
        <div className="custom-dropdown">
          <select
            id="locationDropdown"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DropdownFilters;
