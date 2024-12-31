import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Link,useNavigate } from 'react-router-dom';
import logo_icon from './Assets/jobseek_logo.jpg'
import './LandingPage.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="logo">
                 <Link to="/" ><img src={logo_icon} alt="logo" /></Link> 
            </div>
            <div className="nav-links">
                {/* <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link> */}
                <button className="login-register-btn" onClick={() => navigate('/SignUp')}>
                    Login/Register
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
