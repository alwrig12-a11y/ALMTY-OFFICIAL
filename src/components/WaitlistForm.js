import React, { useState } from 'react';
import axios from 'axios';

const WaitlistForm = () => {
    // THE SWITCH: False = Home Gate (index.html), True = Typewriter Protocol
    const [showProtocol, setShowProtocol] = useState(false);
    
    // WAITLIST STATE
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const { username, email, password } = formData;

    const onFormChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleExecute = async (e) => {
        e.preventDefault();
        setLoading(true);
        let interval = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 100 : prev + 10));
        }, 150);

        try {
            const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://almty-backend.onrender.com';
            const res = await axios.post(`${API_URL}/api/users/register`, formData);
            setTimeout(() => {
                setLoading(false);
                setMessage(`[SUCCESS] IDENTITY_INITIALIZED: ${res.data.username}`);
            }, 2000);
        } catch (err) {
            setLoading(false);
            setMessage(`[ERROR] UPLINK_FAILED`);
        }
    };

    // --- VIEW A: THE CLASSIC HOME GATEWAY (From your index.html) ---
    if (!showProtocol) {
        return (
            <div id="gateway-overlay">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img id="logo-gateway" src="amltylogo.png" alt="ALMTY" />
                    <span style={{ position: 'absolute', top: 0, right: '-25px', color: '#00FF00', fontSize: '14px' }}>&trade;</span>
                </div>
                <div className="terminal-box">
                    <div id="system-status">[SYSTEM]: NODE_502_ESTABLISHED (LOU_KY)</div>
                    <div id="system-action">[SYSTEM]: PROVISIONING_HEAVYWEIGHT_ASSETS...</div>
                    <div className="status-alert">{">> STATUS: REQUISITION_PHASE_LOCKED <<"}</div>
                    <div className="login-row">
                        <span className="terminal-prompt">PATRON_ID:</span>
                        <input type="text" className="terminal-input-hidden" placeholder="_" autoFocus />
                    </div>
                </div>
                <button className="btn-signup" onClick={() => setShowProtocol(true)}>
                    JOIN_WAITLIST (REQUEST_ACCESS)
                </button>
            </div>
        );
    }

    // --- VIEW B: THE GREEN TYPEWRITER PROTOCOL ---
    return (
        <div className="waitlist-gate" style={{paddingTop: '100px'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span className="prompt">system@almty:~$</span>
                <div className="typewriter-text">join --waitlist</div>
            </div>

            {!loading && !message ? (
                <form onSubmit={handleExecute} style={{ marginTop: '30px' }}>
                    <div className="terminal-line"><span className="prompt">USER_ID:</span><input name="username" className="terminal-input" onChange={onFormChange} required /></div>
                    <div className="terminal-line"><span className="prompt">EMAIL_ADDR:</span><input name="email" className="terminal-input" onChange={onFormChange} required /></div>
                    <div className="terminal-line"><span className="prompt">ACCESS_KEY:</span><input type="password" name="password" className="terminal-input" onChange={onFormChange} required /></div>
                    <button type="submit" className="terminal-btn">[ EXECUTE_INITIALIZATION ]</button>
                </form>
            ) : null}

            {loading && (
                <div className="progress-container">
                    <p className="progress-bar-text">ESTABLISHING_SECURE_LINK... {progress}%</p>
                    <div className="progress-bar-wrapper"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
                </div>
            )}
            {message && <p className="status-message" style={{ color: '#32CD32', marginTop: '20px' }}>{message}</p>}
            <button className="btn-signup" style={{marginTop: '40px', borderColor: '#333'}} onClick={() => setShowProtocol(false)}>RETURN_TO_GATEWAY</button>
        </div>
    );
};

export default WaitlistForm;