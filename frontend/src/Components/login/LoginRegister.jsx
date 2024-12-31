import React,{useState} from 'react'
import './LoginRegister.css' 
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import pasword_icon from '../Assets/password.png'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'; // For toast notifications
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../NavBar'
import API_BASE_URL from "../apiConfig";
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const navigate = useNavigate();
    const [action,setAction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user'); // Default to 'user'

    const validateEmail = (email) => {
        // Regular expression for validating an email address
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        // Password must be at least 8 characters long and contain at least one number and one letter
        return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    };

    const handleSubmit = async () => {
        if (action==="Sign Up") {
            toast.warning("Please select Login or Register before submitting", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        if (action==="Register"){
            if (!validateEmail(email)) {
                toast.error("Invalid email format", {
                    position: "top-center",
                    autoClose: 3000,
                });
                return;
            }
    
            if (!validatePassword(password)) {
                toast.error("Password must be at least 8 characters long and include both letters and numbers", {
                    position: "top-center",
                    autoClose: 3000,
                });
                return;
            }
        }
        
        
        try {
            // const endpoint = action === "Login" ? 'http://127.0.0.1:5000/login' : 'http://127.0.0.1:5000/register';
            const endpoint = `${API_BASE_URL}/${action === "Login" ? "login" : "register"}`;

            const response = await axios.post(endpoint, {
                username,
                email,
                password,
                user_type: userType
            });
            // const requestData = { username, password };
            
            // if (action === "Register") {
            //     requestData.email = email;
            //     requestData.user_type = userType; // Include userType for registration
            // }

            // const response = await axios.post(endpoint, requestData);
    
            if (response.data && response.data.message) {
                if (response.data.message.includes("successful")) {
                    const successMessage = action === "Login" ? "Login Successful!" : "Registration Successful!";
                    toast.success(successMessage, {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    if (action === "Register") {
                        setAction("Login");
                    }

                    // const user_id = response.data.user_id;
                    const user_type = response.data.user_type;

                    if (user_type === 'user') {
                        // Redirect to user dashboard
                        // Replace this with actual navigation logic (e.g., React Router)
                        // alert("Welcome to the user dashboard!");
                        navigate("/Userdashboard");
                        toast.info("Welcome to the user dashboard!", {
                            position: "top-center",
                            autoClose: 3000,
                        });
                    } 
                    else if (user_type === 'recruiter') {
                        // Redirect to recruiter/admin dashboard
                        // Replace this with actual navigation logic (e.g., React Router)
                        // alert("Welcome to the recruiter/admin dashboard!");
                        navigate(`/AdminDashboard?user_id=${response.data.user_id}`);
                        toast.info("Welcome to the recruiter/admin dashboard!", {
                            position: "top-center",
                            autoClose: 3000,
                        });
                        // navigate("/AdminDashboard");
                    }
                } else {
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
                if (action === "Register" && response.data.message.includes("successful")) {
                    setAction("Login");
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.", {
                position: "top-center",
                autoClose: 3000,
            });
            console.error(error);
        }
    };
    
  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <ToastContainer />
        <Navbar />
                <div className="login-register-buttons">
                    <div className={action === "Login" ? "button active" : "button"} onClick={() => setAction("Login")}>Login</div>
                    <div className={action === "Register" ? "button active" : "button"} onClick={() => setAction("Register")}>Register</div>
                </div>

            <div className="inputs">
                {action === 'Register' ? (
                    <div className="input">
                        
                        <img src={email_icon} alt="email" />
                {/* <input type="email" placeholder='Email Address' /> */}
                <input 
                        type="email" 
                        placeholder='Email Address' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    </div>
                ) : <div></div>}

                
            <div className="input">
            <img src={user_icon} alt="user" />
                        <input 
                            type="text" 
                            placeholder='User Name' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
            </div>

            <div className="input">
                <img src={pasword_icon} alt="password" />
                {/* <input type="password" placeholder='Password'/> */}
                <input 
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
        </div>
        
        {action === 'Register' && (
                <div className="login-register-buttons">
                    <div className={`button ${userType === 'user' ? 'active' : ''}`} onClick={() => setUserType('user')}>User</div>
                    <div className={`button ${userType === 'recruiter' ? 'active' : ''}`} onClick={() => setUserType('recruiter')}>Recruiter</div>
                </div>
            )}

        {action==='Register'?<div></div>:
        <div className="forgotpass">Lost Password <span>Click Here!</span></div>}

      
        <div className="submit-container">              
                <div className="submit" onClick={handleSubmit}>
                    {action}
                </div>
            </div>
    </div>
  )
}

export default LoginRegister