import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // --- STATE PROTOCOLS ---
  const [view, setView] = useState('home'); // 'home' or 'join'
  const [patronId, setPatronId] = useState('');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- VIEW A: THE ORIGINAL HOME GATEWAY (from your index.html) ---
  if (view === 'home') {
    return (
      <div id="gateway-overlay">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img id="logo-gateway" src="amltylogo.png" alt="ALMTY" />
          <span style={{ position: 'absolute', top: 0, right: '-25px', color: 'var(--socio-green)', fontSize: '14px' }}>&trade;</span>
        </div>
        
        <div className="terminal-box">
          <div>[SYSTEM]: NODE_502_ESTABLISHED (LOU_KY)</div>
          <div>[SYSTEM]: PROVISIONING_HEAVYWEIGHT_ASSETS...</div>
          <div>[SYSTEM]: KERNEL_ENCRYPTION_ACTIVE.</div> 
          <div className="status-alert">{">> STATUS: REQUISITION_PHASE_LOCKED <<"}</div>
          <div className="login-row">
            <span className="terminal-prompt">PATRON_ID:</span>
            <input 
              type="text" 
              className="terminal-input-hidden" 
              style={{ color: 'white', position: 'relative', opacity: 1 }}
              onChange={(e) => setPatronId(e.target.value)}
              placeholder="_"
              autoFocus 
            />
          </div>
        </div>

        <button className="btn-signup" onClick={() => setView('join')}>
          JOIN_WAITLIST (REQUEST_ACCESS)
        </button>

        <div style={{ position: 'absolute', bottom: '20px', fontSize: '8px', color: '#555', textAlign: 'center', width: '100%' }}>
          <div>ALMTY LLC // EIN: 33-2507723 // © 2026 ALL RIGHTS RESERVED</div>
          <div style={{ marginTop: '5px', color: '#333', fontSize: '7px' }}>
            NOTICE: ALL ASSETS, PROTOCOLS, AND VISUAL IDENTITIES ARE THE EXCLUSIVE INTELLECTUAL PROPERTY OF ALMTY LLC.
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW B: THE TYPEWRITER WAITLIST PROTOCOL ---
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let interval = setInterval(() => setProgress(p => p >= 100 ? 100 : p + 10), 150);
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

  return (
    <div id="gateway-overlay" style={{ background: '#050505' }}>
      <div className="terminal-box" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ color: 'var(--socio-green)', marginRight: '10px' }}>system@almty:~$</span>
          <div className="typewriter-text" style={{ color: 'var(--socio-green)' }}>join --waitlist</div>
        </div>

        {!loading && !message ? (
          <form onSubmit={handleWaitlistSubmit} style={{ marginTop: '30px' }}>
            <div className="login-row">
              <span className="terminal-prompt">USER_ID:</span>
              <input className="terminal-input-hidden" style={{color: 'white', position: 'relative'}} onChange={e => setFormData({...formData, username: e.target.value})} required />
            </div>
            <div className="login-row">
              <span className="terminal-prompt">EMAIL_ADDR:</span>
              <input className="terminal-input-hidden" style={{color: 'white', position: 'relative'}} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="login-row">
              <span className="terminal-prompt">ACCESS_KEY:</span>
              <input type="password" className="terminal-input-hidden" style={{color: 'white', position: 'relative'}} onChange={e => setFormData({...formData, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn-signup" style={{borderColor: 'var(--socio-green)', color: 'var(--socio-green)'}}>
              [ EXECUTE_INITIALIZATION ]
            </button>
          </form>
        ) : null}

        {loading && (
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: 'var(--socio-green)', fontSize: '10px' }}>ESTABLISHING_SECURE_LINK... {progress}%</p>
            <div className="progress-bar-wrapper"><div className="progress-fill" style={{ width: `${progress}%`, height: '100%', background: 'var(--socio-green)' }}></div></div>
          </div>
        )}
        {message && <p style={{ color: 'var(--socio-green)', marginTop: '20px' }}>{message}</p>}
        <button className="btn-signup" style={{ marginTop: '40px' }} onClick={() => {setView('home'); setMessage(''); setProgress(0);}}>RETURN_TO_GATEWAY</button>
      </div>
    </div>
  );
}

export default App;