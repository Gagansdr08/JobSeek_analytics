import React from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const DeleteJob = ({ userId, jobId, setJobPostings }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/delete-job-posting/${jobId}`, {
                data: { user_id: userId }
            });
            alert(response.data.message);

            // Refresh the job postings list after deletion
            const updatedPostings = await fetchJobPostings();
            setJobPostings(updatedPostings); // Update the state with the new list
        } catch (err) {
            console.error('Error deleting job posting:', err);
        }
    };

    return (
        <div>
            <h2>Delete Job Posting</h2>
            <p>Are you sure you want to delete this job posting?</p>
            <button onClick={handleDelete}>Confirm Delete</button>
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

export default DeleteJob;


// import React, { useState } from 'react';
// import axios from 'axios';
// import API_BASE_URL from '../apiConfig';

// const DeleteJob = ({ userId, jobId }) => {
//     const [confirmDelete, setConfirmDelete] = useState(false);

//     const handleDelete = async () => {
//         try {
//             const response = await axios.delete(`${API_BASE_URL}/delete-job-posting/${jobId}`, {
//                 data: { user_id: userId }
//             });
//             alert(response.data.message);
//         } catch (err) {
//             console.error('Error deleting job posting:', err);
//         }
//     };

//     return (
//         <div>
//             <h2>Delete Job Posting</h2>
//             {!confirmDelete ? (
//                 <>
//                     <p>Are you sure you want to delete this job posting?</p>
//                     <button onClick={() => setConfirmDelete(true)}>Yes, Delete</button>
//                     <button onClick={() => setConfirmDelete(false)}>No, Cancel</button>
//                 </>
//             ) : (
//                 <button onClick={handleDelete}>Confirm Delete</button>
//             )}
//         </div>
//     );
// };

// export default DeleteJob;
