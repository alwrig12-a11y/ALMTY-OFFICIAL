import React, { useState } from 'react';
import axios from 'axios';

const WaitlistForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    // The logic to find your engine (Render vs Local)
    const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://almty-backend.onrender.com';

    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const body = JSON.stringify({ username, email, password });

            const res = await axios.post(`${API_URL}/api/users/register`, body, config);
            
            // On success, we save the token and show the waitlist status
            localStorage.setItem('token', res.data.token);
            setMessage(`✅ Welcome to the Protocol, ${res.data.username}. You are on the waitlist.`);
        } catch (err) {
            setMessage(err.response?.data?.message || '❌ Registration Failed. Try again.');
        }
    };

    return (
        <div className="waitlist-gate">
            <h2>JOIN THE ALMTY WAITLIST</h2>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    value={username} 
                    onChange={onChange} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email} 
                    onChange={onChange} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    required 
                    minLength="6"
                />
                <button type="submit">INITIALIZE IDENTITY</button>
            </form>
            {message && <p className="status-message">{message}</p>}
        </div>
    );
};

export default WaitlistForm;