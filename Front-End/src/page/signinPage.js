import React, { useState } from 'react';
import '../css/signin.css';
import Footer from '../components/templetes/Footer';
import Navbar from '../components/templetes/Navbar';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

import image from '../assets/login.png'; 

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); // For navigation

    // Handle sign-in form submission
    const handleSignIn = (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error("Please enter your username and password.");
            return;
        }

        // Dummy navigation logic for successful login
        toast.success("Sign in successful!");
        navigate("/admin-dashboard");
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="signin-container">
                <main className="signin-main">
                    <div className="signin-card">
                        <div className="signin-form">
                            <h2>LOG IN</h2>
                            <form onSubmit={handleSignIn}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <a href="#forgot" className="forgot-link">Forgot password?</a>
                                <button type="submit" className="signin-button">LOG IN</button>
                            </form>
                        </div> 
                        <div className="signin-image">
                            <img src={image} alt="Meeting" />
                        </div>
                    </div>
                </main>
            </div>
            <div className="footer">
                <Footer />
            </div>
            {/* Toast notification container */}
            <ToastContainer />
        </div>
    );
}

export default Signin;
