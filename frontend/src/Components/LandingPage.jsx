import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import AnimationComponent from "./AnimationComponent";

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className="landing-page">
    <AnimationComponent /> {/* Integrate the animation component */}
    <Navbar />
    <div className="landing-content">
    <div className="hero">
        <h1>Welcome to Jobseek</h1>
        <p>All the information in one place.</p>
        {/* <button className="get-started" onClick={() => navigate('/SignUp')}>Sign Up</button> */}
        <button className="get-started" onClick={() => navigate('/Userdashboard')}>Get Started</button>
        {/* <button className="get-started" onClick={() => navigate('/AdminDashboard')}>Admin Dashboard</button> */}
    </div>
    </div>
    
</div>
    </>
    
  )
}

export default LandingPage