import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // THE LOGIC GATES
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginPhase, setLoginPhase] = useState('user'); // 'user' or 'key'
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [patronId, setPatronId] = useState('');

  // 1. Restore the "Auto-Focus" protocol from your original lab
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.getElementById(loginPhase === 'user' ? 'user-input' : 'key-input');
      if (input) input.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [loginPhase]);

  // 2. The Entry Sequence
  const handleEntry = (e) => {
    if (e.key === 'Enter') {
      if (loginPhase === 'user' && patronId.trim() !== '') {
        setLoginPhase('key');
      } else if (loginPhase === 'key') {
        // Here is where we'll plug in your 'almty' / '2024' logic later
        setIsAuthorized(true);
      }
    }
  };

  // --- VIEW A: THE GATEWAY OVERLAY (Your original index.html) ---
  if (!isAuthorized) {
    return (
      <div id="gateway-overlay">
        <img id="logo-gateway" src="amltylogo.png" alt="ALMTY" />
        <div className="terminal-box">
          <div>[SYSTEM]: NODE_502_ESTABLISHED (LOU_KY)</div>
          <div className="status-alert">{">> STATUS: REQUISITION_PHASE_LOCKED <<"}</div>
          
          <div className="login-row">
            <span className="terminal-prompt">PATRON_ID:</span>
            <input 
              id="user-input"
              type="text" 
              className="terminal-input-hidden" 
              value={patronId}
              onChange={(e) => setPatronId(e.target.value)}
              onKeyDown={handleEntry}
              autoComplete="off"
            />
          </div>
          
          {loginPhase === 'key' && (
            <div className="login-row">
              <span className="terminal-prompt">CLEARANCE_KEY:</span>
              <input id="key-input" type="password" className="terminal-input-hidden" onKeyDown={handleEntry} />
            </div>
          )}
        </div>
        
        <button className="btn-signup" onClick={() => window.location.href = '/join'}>
          JOIN_WAITLIST (REQUEST_ACCESS)
        </button>
      </div>
    );
  }

  // --- VIEW B: THE MAIN SITE (The dashboard/merch area) ---
  return (
    <div id="main-site" style={{ display: 'flex' }}>
      <h1>PROTOCOL_ACTIVE: Welcome, {patronId}</h1>
      {/* Rest of your main-site code will go here once the gate works */}
    </div>
  );
}

export default App;