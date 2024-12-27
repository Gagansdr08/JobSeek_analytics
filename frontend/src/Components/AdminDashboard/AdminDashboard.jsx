import React,{ useState } from "react";
import { useLocation} from "react-router-dom";
import ViewJobPostings from "./ViewJobPostings";
import Navbar from "../NavBar";
import AddJob from './AddJob';
import UpdateJob from './UpdateJob';
import DeleteJob from './DeleteJob';
import Modal from './Modal';

const AdminDashboard = ({ user_id }) => {
    const location = useLocation();
    // Extract the user_id from the query parameter
    const params = new URLSearchParams(location.search);
    const userId = params.get('user_id') || user_id;

    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return (
        <div>
            <Navbar />

            <h1>Admin Dashboard</h1>
            <div>
                {/* <button onClick={() => openModal(<ViewJobPostings userId={userId} />)}>
                    View Job Postings
                </button> */}
                {/* <button onClick={() => openModal(<AddJob userId={userId} />)}>
                    Add Job Posting
                </button>
                <button onClick={() => openModal(<UpdateJob userId={userId} />)}>
                    Update Job Posting
                </button>
                <button onClick={() => openModal(<DeleteJob userId={userId} />)}>
                    Delete Job Posting
                </button> 
                <ViewJobPostings userId={userId} /> */}

                <button onClick={() => openModal(<AddJob userId={userId} onClose={closeModal}/>)}>
                Add Job Posting
                 </button>

                <ViewJobPostings
                userId={userId}
                onUpdate={(jobId) =>
                    openModal(<UpdateJob jobId={jobId} userId={userId} onClose={closeModal} />)
                }
                onDelete={(jobId) =>
                    openModal(<DeleteJob jobId={jobId} userId={userId} onClose={closeModal} />)
                }
            />


            </div>

            {/* Modal component */}
            {modalContent && (
                <Modal onClose={closeModal}>
                    {modalContent}
                </Modal>
            )}
        </div>
    );
};

export default AdminDashboard;

// const AdminDashboard = ({ user_id }) => {
//     const location = useLocation();
//     // Extract the user_id from the query parameter
//     const params = new URLSearchParams(location.search);
//     const userId = params.get('user_id') || user_id;
//     console.log(typeof(userId))

//     const [modalContent, setModalContent] = useState(null);

//     const openModal = (content) => {
//         setModalContent(content);
//     };

//     const closeModal = () => {
//         setModalContent(null);
//     };

//     return (
//         <div>
//             {/* <Navbar />
//             <h1>Admin Dashboard</h1>
//             <p>Welcome, Admin {userId}!</p>
//             <ViewJobPostings userId={userId}/> */}
//             <Navbar />

//             <h1>Admin Dashboard</h1>
//             <div>
//                 <button onClick={() => openModal(<ViewJobPostings userId={userId} />)}>
//                     View Job Postings
//                 </button>
//                 <button onClick={() => openModal(<AddJob userId={userId} />)}>
//                     Add Job Posting
//                 </button>
//                 <button onClick={() => openModal(<UpdateJob userId={userId} />)}>
//                     Update Job Posting
//                 </button>
//                 <button onClick={() => openModal(<DeleteJob userId={userId} />)}>
//                     Delete Job Posting
//                 </button>
//             </div>

//             {/* Modal component */}
//             {modalContent && (
//                 <Modal onClose={closeModal}>
//                     {modalContent}
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;
