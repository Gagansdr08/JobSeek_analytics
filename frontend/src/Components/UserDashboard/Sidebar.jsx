import React, { useState } from "react";
// import "./Sidebar.css";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: "Top Paying Jobs", value: "Top Paying Jobs" },
    { label: "Reports", value: "Reports" },
    { label: "Settings", value: "Settings" },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h3 className="sidebar-title">
        <button onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? (
            <span className="menu-icon">⋮</span> // Kebab menu
          ) : (
            <span className="menu-icon">☰</span> // Hamburger menu
          )}
        </button>
      </h3>
      
      <ul className={`sidebar-menu ${collapsed ? "hidden" : ""}`}>
      <h3 className="sidebar-title">User Dashboard Menu</h3>
        {menuItems.map((item) => (
          <li
            key={item.value}
            className={`sidebar-item ${selectedOption === item.value ? "active" : ""}`}
            onClick={() => setSelectedOption(item.value)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
