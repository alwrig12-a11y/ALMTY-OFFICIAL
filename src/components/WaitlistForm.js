import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WaitlistForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const { username, email, password } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        // 1. SIMULATE TERMINAL PROGRESS
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);

        try {
            const API_URL = window.location.hostname === 'localhost' 
                ? 'http://localhost:5000' 
                : 'https://almty-backend.onrender.com';

            // 2. ACTUAL DATA TRANSFER
            const res = await axios.post(`${API_URL}/api/users/register`, formData);
            
            // Wait for visual progress to hit 100% before showing success
            setTimeout(() => {
                setLoading(false);
                setMessage(`[SUCCESS] IDENTITY_INITIALIZED: Welcome, ${res.data.username}.`);
                setProgress(0);
            }, 1800);

        } catch (err) {
            setLoading(false);
            setMessage(`[ERROR] ${err.response?.data?.message || 'UPLINK_FAILED'}`);
            setProgress(0);
        }
    };

    return (
        <div className="waitlist-gate">
            <div style={{ display: 'flex' }}>
                <span className="prompt">system@almty:~$</span>
                <div className="typewriter-text">join --waitlist</div>
            </div>

            {!loading && !message ? (
                <form onSubmit={onSubmit} style={{ marginTop: '30px' }}>
                    {/* ... (Your terminal-line inputs here) ... */}
                    <button type="submit" className="terminal-btn">[ EXECUTE_INITIALIZATION ]</button>
                </form>
            ) : null}

            {loading && (
                <div className="progress-container">
                    <p className="progress-bar-text">ESTABLISHING_SECURE_LINK... {progress}%</p>
                    <div className="progress-bar-border">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}

            {message && <p className="status-message" style={{ marginTop: '20px' }}>{message}</p>}
        </div>
    );
};

export default WaitlistForm;