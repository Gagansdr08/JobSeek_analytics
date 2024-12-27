import React, { useState } from "react";
import Navbar from '../NavBar';
import Sidebar from "./Sidebar";
import TopPayingJobs from "./TopPayingJobs";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Top Paying Jobs");

  const renderContent = () => {
    switch (selectedOption) {
      case "Top Paying Jobs":
        return <TopPayingJobs />;
      case "Reports":
        return <div className="content">Reports Component Coming Soon</div>;
      case "Settings":
        return <div className="content">Settings Component Coming Soon</div>;
      default:
        return <div className="content">Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="user-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
      />
        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
