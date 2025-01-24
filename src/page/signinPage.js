// import React, { useState } from 'react';
// import '../css/signin.css';
// import Footer from '../components/templetes/Footer';
// import Navbar from '../components/templetes/Navbar';
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import image from '../assets/login.png';

// function Signin() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null); // Error state for login issues

//     const navigate = useNavigate();

//     // Handle sign-in form submission
//     const handleSignIn = (e) => {
//         e.preventDefault();

//         if (!username || !password) {
//             setError("Invalid username and password.");
//             return;
//         }

//         // Simulate a successful login
//         if (username === "admin" && password === "admin123") {
//             toast.success("Sign in successful!");
//             setError(null); // Clear error if login is successful
//             navigate("/admin-dashboard");
//         } else {
//             setError("Invalid username and password.");
//         }
//     };

//     return (
//         <div className="page-container">
//             <Navbar />
//             <div className="signin-container">
//                 <main className="signin-main">
//                     <div className="signin-card">
//                         <div className="signin-form">
//                             <h2>LOG IN</h2>
//                             {/* Error Alert */}
//                             {error && (
//                                 <div className="alert alert-danger">
//                                     {error}
//                                 </div>
//                             )}
//                             <form onSubmit={handleSignIn}>
//                                 <input
//                                     type="text"
//                                     name="username"
//                                     placeholder="Username"
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                 />
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 <a href="#forgot" className="forgot-link">Forgot password?</a>
//                                 <button type="submit" className="signin-button">LOG IN</button>
//                             </form>
//                         </div>
//                         <div className="signin-image">
//                             <img src={image} alt="Meeting" />
//                         </div>
//                     </div>
//                 </main>
//             </div>
//             <div className="footer">
//                 <Footer />
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }

// export default Signin;


import React, { useState } from 'react';
import '../css/signin.css'; // Import your custom CSS styles
import Footer from '../components/templetes/Footer'; // Footer component
import Navbar from '../components/templetes/Navbar'; // Navbar component
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import image from '../assets/login.png'; // Login image

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Username and password are required.");
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            // Send HTTP POST request to the backend
            const response = await axios.post('http://localhost:8080/login', { username, password });

           

            // Handle successful login
            if (response.data === "Login Successful!") {
                toast.success("Login successful!");
                setError('');
                navigate("/admin-dashboard"); // Redirect to admin dashboard
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            setMessage('Invalid credentials');
            // Handle error response
            toast.error("An error occurred while logging in.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="signin-container">
                <main className="signin-main">
                    <div className="signin-card">
                        <div className="signin-form">
                            <h2>LOG IN</h2>
                            {/* Error Alert */}
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                            {message && (
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleLogin}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <a href="#forgot" className="forgot-link">Forgot password?</a>
                                <button type="submit" className="signin-button">Login</button>
                            </form>
                        </div>
                        <div className="signin-image">
                            <img src={image} alt="Login" />
                        </div>
                    </div>
                </main>
            </div>
            <div className="footer">
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;