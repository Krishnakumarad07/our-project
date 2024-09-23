import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAccount.css';
import axios from 'axios';

const CreateAccount = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = form;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Make the POST request
        axios.post('http://localhost:8081/auth/signup', { username, email, password })
            .then(res => {
                console.log('Response:', res.data);
                localStorage.setItem('token', res.data.token);
                alert('Account created successfully!');
                navigate("/loginpage")
            })
            .catch(err => {
                console.error('Error:', err.response ? err.response.data : err.message);
                alert('Failed to create account. Please try again.');
            });
    };

    return (
        <div className="body">
            <div className="signup-page">
                <div className="form-container">
                    <div className="sign-form">
                        <h3>Create Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group1">
                                <label>Username</label>
                                <input id='in'
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Type Here"
                                    required
                                />
                            </div>
                            <div className="form-group1">
                                <label>Email</label>
                                <input id='in'
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email@example.com"
                                    required
                                />
                            </div>
                            <div className="form-group1">
                                <label>Password</label>
                                <input id='in'
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Type Here"
                                    required
                                />
                            </div>
                            <div className="form-group1">
                                <label>Confirm Password</label>
                                <input id='in'
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Type Here"
                                    required
                                />
                            </div>
                            <button id="btn-signup" type="submit">Register</button>
                        </form>
                        <p>
                            Already have an account? <Link to="/loginpage">Login Now</Link>
                        </p>
                    </div>
                </div>
                <div className="login-image">
                    <img src="backdrop.png" alt="Login Illustration" />
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
