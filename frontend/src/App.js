// // import logo from './logo.svg';
// import './App.css';
// import LoginRegister from './Components/LoginRegister';

// function App() {
//   return (
//     <div>
//       <LoginRegister/>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import LoginRegister from './Components/login/LoginRegister';
// import TopPayingJobs from "./Components/UserDashboard/TopPayingJobs";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ViewJobPostings from './Components/AdminDashboard/ViewJobPostings';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/SignUp" element={<LoginRegister />} />
                <Route path="/Userdashboard" element={<UserDashboard />} />
                {/* <Route path="/AdminDashboard" element={<AdminDashboard />} /> */}
                    
                <Route path="/AdminDashboard" element={<AdminDashboard />}>
                <Route index element={<ViewJobPostings />} />
                <Route path="view-job-postings" element={<ViewJobPostings />} />
            </Route>
            </Routes>
        </Router>
    );
};

export default App;
