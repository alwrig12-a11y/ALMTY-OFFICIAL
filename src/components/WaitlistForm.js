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
    <p className="status-message">alwrig12@almty:~$ join --waitlist</p>
    
    <form onSubmit={onSubmit}>
      <div className="terminal-line">
        <span className="prompt">USER_ID:</span>
        <input 
          type="text" 
          name="username" 
          className="terminal-input"
          value={username} 
          onChange={onChange} 
          required 
          autoComplete="off"
        />
      </div>

      <div className="terminal-line">
        <span className="prompt">EMAIL_ADDR:</span>
        <input 
          type="email" 
          name="email" 
          className="terminal-input"
          value={email} 
          onChange={onChange} 
          required 
          autoComplete="off"
        />
      </div>

      <div className="terminal-line">
        <span className="prompt">ACCESS_KEY:</span>
        <input 
          type="password" 
          name="password" 
          className="terminal-input"
          value={password} 
          onChange={onChange} 
          required 
        />
      </div>

      <button type="submit" className="terminal-btn">
        [ EXECUTE_INITIALIZATION ]
      </button>
    </form>
    
    {message && <p className="status-message" style={{marginTop: '20px'}}>{message}</p>}
  </div>
    );
};

export default WaitlistForm;