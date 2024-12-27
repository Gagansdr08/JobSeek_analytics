import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const AddJob = ({ userId, setJobPostings }) => {
    const [jobData, setJobData] = useState({
        job_title_short: '',
        job_title: '',
        job_location: '',
        company_id: '',
        job_schedule_type: '',
        salary_year_avg: '',
        job_posted_date: '',
        job_id: ''
    });
    const [jobId, setJobId] = useState('');

    useEffect(() => {
        const fetchLastJobId = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/get-last-job-id`);
                setJobId(response.data.lastJobId + 1); // Assuming job IDs are consecutive numbers
            } catch (err) {
                console.error('Error fetching last job ID:', err);
            }
        };

        fetchLastJobId();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/add-job-posting`, {
                ...jobData,
                user_id: userId,
                job_id: jobId  // Use the dynamically fetched job ID
            });
            // Refresh the job postings list after adding a new job
            const updatedPostings = await fetchJobPostings();
            setJobPostings(updatedPostings); // Update the state with the new list
            alert(response.data.message);
        } catch (err) {
            console.error('Error adding job posting:', err);
        }
    };

    return (
        <div>
            <h2>Add Job Posting</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="job_title_short" placeholder="Job Title Short" value={jobData.job_title_short} onChange={handleChange} required />
                <input type="text" name="job_title" placeholder="Job Title" value={jobData.job_title} onChange={handleChange} required />
                <input type="text" name="job_location" placeholder="Job Location" value={jobData.job_location} onChange={handleChange} required />
                <input type="text" name="company_id" placeholder="Company ID" value={jobData.company_id} onChange={handleChange} required />
                <input type="text" name="job_schedule_type" placeholder="Job Schedule Type" value={jobData.job_schedule_type} onChange={handleChange} required />
                <input type="text" name="salary_year_avg" placeholder="Salary (Yearly Avg)" value={jobData.salary_year_avg} onChange={handleChange} required />
                <input type="date" name="job_posted_date" value={jobData.job_posted_date} onChange={handleChange} required />
                <button type="submit">Add Job Posting</button>
            </form>
        </div>
    );
};
const fetchJobPostings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/job-postings`);
        return response.data.jobPostings;
    } catch (err) {
        console.error('Error fetching job postings:', err);
    }
};
export default AddJob;


// import React, { useState } from 'react';
// import axios from 'axios';
// import API_BASE_URL from '../apiConfig';

// const AddJob = ({ userId }) => {
//     const [jobData, setJobData] = useState({
//         job_title_short: '',
//         job_title: '',
//         job_location: '',
//         company_id: '',
//         job_schedule_type: '',
//         salary_year_avg: '',
//         job_posted_date: '',
//         job_id: '123456'
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJobData({ ...jobData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${API_BASE_URL}/add-job-posting`, {
//                 ...jobData,
//                 user_id: userId,
//             });
//             alert(response.data.message);
//         } catch (err) {
//             console.error('Error adding job posting:', err);
//         }
//     };

//     return (
//         <div>
//             <h2>Add Job Posting</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="job_title_short" placeholder="Job Title Short" value={jobData.job_title_short} onChange={handleChange} required />
//                 <input type="text" name="job_title" placeholder="Job Title" value={jobData.job_title} onChange={handleChange} required />
//                 <input type="text" name="job_location" placeholder="Job Location" value={jobData.job_location} onChange={handleChange} required />
//                 <input type="text" name="company_id" placeholder="Company ID" value={jobData.company_id} onChange={handleChange} required />
//                 <input type="text" name="job_schedule_type" placeholder="Job Schedule Type" value={jobData.job_schedule_type} onChange={handleChange} required />
//                 <input type="text" name="salary_year_avg" placeholder="Salary (Yearly Avg)" value={jobData.salary_year_avg} onChange={handleChange} required />
//                 <input type="date" name="job_posted_date" value={jobData.job_posted_date} onChange={handleChange} required />
//                 <button type="submit">Add Job Posting</button>
//             </form>
//         </div>
//     );
// };

// export default AddJob;
