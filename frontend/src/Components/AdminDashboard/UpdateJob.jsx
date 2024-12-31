import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const UpdateJob = ({ userId, jobId, setJobPostings }) => {
    const [jobData, setJobData] = useState({
        job_title_short: '',
        job_title: '',
        job_location: '',
        company_id: '',
        job_schedule_type: '',
        salary_year_avg: '',
        job_posted_date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/update-job-posting/${jobId}`, {
                ...jobData,
                user_id: userId,
            });
            alert(response.data.message);
            // Refresh the job postings list after updating
            // const updatedPostings = await fetchJobPostings();
            // setJobPostings(updatedPostings); // Update the state with the new list

        } catch (err) {
            console.error('Error updating job posting:', err);
        }
    };

    return (
        <div>
            <h2>Update Job Posting</h2>
            <input
                type="text"
                name="job_title_short"
                placeholder="Job Title Short"
                value={jobData.job_title_short}
                onChange={handleChange}
            />
            <input
                type="text"
                name="job_title"
                placeholder="Job Title"
                value={jobData.job_title}
                onChange={handleChange}
            />
            <input
                type="text"
                name="job_location"
                placeholder="Job Location"
                value={jobData.job_location}
                onChange={handleChange}
            />
            <input
                type="text"
                name="company_id"
                placeholder="Company ID"
                value={jobData.company_id}
                onChange={handleChange}
            />
            <input
                type="text"
                name="job_schedule_type"
                placeholder="Job Schedule Type"
                value={jobData.job_schedule_type}
                onChange={handleChange}
            />
            <input
                type="text"
                name="salary_year_avg"
                placeholder="Salary (Yearly Avg)"
                value={jobData.salary_year_avg}
                onChange={handleChange}
            />
            <input
                type="date"
                name="job_posted_date"
                value={jobData.job_posted_date}
                onChange={handleChange}
            />
            <button onClick={handleUpdate}>Update Job Posting</button>
        </div>
    );
};
export default UpdateJob;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import API_BASE_URL from '../apiConfig';

// const UpdateJob = ({ userId, jobId }) => {
//     const [jobData, setJobData] = useState({
//         job_title_short: '',
//         job_title: '',
//         job_location: '',
//         company_id: '',
//         job_schedule_type: '',
//         salary_year_avg: '',
//         job_posted_date: ''
//     });

//     useEffect(() => {
//         const fetchJobDetails = async () => {
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/view-job-postings`, {
//                     params: { user_id: userId, job_id: jobId }
//                 });
//                 setJobData(response.data[0]);  // Assuming only one job posting is returned for the job_id
//             } catch (err) {
//                 console.error('Error fetching job details:', err);
//             }
//         };

//         fetchJobDetails();
//     }, [userId, jobId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJobData({ ...jobData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`${API_BASE_URL}/update-job-posting/${jobId}`, {
//                 ...jobData,
//                 user_id: userId
//             });
//             alert(response.data.message);
//         } catch (err) {
//             console.error('Error updating job posting:', err);
//         }
//     };

//     return (
//         <div>
//             <h2>Update Job Posting</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="job_title_short" placeholder="Job Title Short" value={jobData.job_title_short} onChange={handleChange} required />
//                 <input type="text" name="job_title" placeholder="Job Title" value={jobData.job_title} onChange={handleChange} required />
//                 <input type="text" name="job_location" placeholder="Job Location" value={jobData.job_location} onChange={handleChange} required />
//                 <input type="text" name="company_id" placeholder="Company ID" value={jobData.company_id} onChange={handleChange} required />
//                 <input type="text" name="job_schedule_type" placeholder="Job Schedule Type" value={jobData.job_schedule_type} onChange={handleChange} required />
//                 <input type="text" name="salary_year_avg" placeholder="Salary (Yearly Avg)" value={jobData.salary_year_avg} onChange={handleChange} required />
//                 <input type="date" name="job_posted_date" value={jobData.job_posted_date} onChange={handleChange} required />
//                 <button type="submit">Update Job Posting</button>
//             </form>
//         </div>
//     );
// };

// export default UpdateJob;
