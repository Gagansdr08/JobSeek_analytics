import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
// import "AdminDashboard.css"

const ViewJobPostings = ({ userId, onUpdate, onDelete }) => {
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/view-job-postings`, {
                    headers: { "Content-Type": "application/json" },
                    params: { user_id: userId },
                });
                console.log(response.data)
                setJobPostings(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobPostings();
    }, [userId]);

    if (loading) return <p>Loading job postings...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Job Postings</h1>
            {jobPostings.length === 0 ? (
                <p>No job postings found.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Job ID</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Location</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Schedule</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Posted Date</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Salary (Yearly Avg)</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobPostings.map((job) => (
                            <tr key={job.job_id}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{job.job_id}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{job.job_title}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{job.job_location}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{job.job_schedule_type}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {new Date(job.job_posted_date).toLocaleDateString()}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {job.salary_year_avg || "N/A"}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                                    <DropdownMenu
                                        onUpdate={() => onUpdate(job.job_id)}
                                        onDelete={() => onDelete(job.job_id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const DropdownMenu = ({ onUpdate, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <div style={{ position: "relative" }}>
            <button onClick={toggleMenu} style={dropdownButtonStyle}>
                Actions
            </button>
            {isOpen && (
                <div style={dropdownMenuStyle}>
                    <button onClick={onUpdate} style={dropdownItemStyle}>
                        Update
                    </button>
                    <button onClick={onDelete} style={dropdownItemStyle}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

const dropdownButtonStyle = {
    backgroundColor: "#3c009d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
};

const dropdownMenuStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    // backgroundColor: "#3c009d",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    zIndex: 1000,
};

const dropdownItemStyle = {
    padding: "10px 15px",
    textAlign: "left",
    backgroundColor: "#3c009d",
    border: "none",
    width: "100%",
    cursor: "pointer",
};

export default ViewJobPostings;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../apiConfig";

// const ViewJobPostings = ({ userId }) => {
//     const [jobPostings, setJobPostings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     console.log((userId))
//     useEffect(() => {
//         const fetchJobPostings = async () => {
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/view-job-postings`, {
//                     headers: { "Content-Type": "application/json" },
//                     params: { user_id: userId }
//                 });
                
//                 setJobPostings(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJobPostings();
//     }, [userId]);

//     if (loading) return <p>Loading job postings...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h1>Job Postings</h1>
//             {jobPostings.length === 0 ? (
//                 <p>No job postings found.</p>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Job ID</th>
//                             <th>Title</th>
//                             <th>Location</th>
//                             <th>Schedule</th>
//                             <th>Posted Date</th>
//                             <th>Salary (Yearly Avg)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {jobPostings.map((job) => (
//                             <tr key={job.job_id}>
//                                 <td>{job.job_id}</td>
//                                 <td>{job.job_title}</td>
//                                 <td>{job.job_location}</td>
//                                 <td>{job.job_schedule_type}</td>
//                                 <td>{new Date(job.job_posted_date).toLocaleDateString()}</td>
//                                 <td>{job.salary_year_avg || "N/A"}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default ViewJobPostings;
