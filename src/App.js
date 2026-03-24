import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';
import WaitlistForm from './components/WaitlistForm';

function App() {
  // This state controls which "Layer" of the site is visible
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="almty-logo-glow" alt="ALMTY Logo" />

        {!showWaitlist ? (
          /* --- YOUR ORIGINAL HOME PAGE CONTENT (from index.html) --- */
          <div className="home-content">
            <p className="protocol-text">ALMTY SOVEREIGN CLOTHING & PROTOCOL</p>
            <p className="description">Louisville, KY | Established 2026</p>
            
            {/* THIS BUTTON TRIGGERS THE REACT APP */}
            <button 
              className="terminal-btn" 
              onClick={() => setShowWaitlist(true)}
            >
              [ INITIALIZE_JOIN_SEQUENCE ]
            </button>
            
            {/* ADMIN ACCESS (The "Overseer" Entry) */}
            <div className="admin-link">
               <a href="/login" style={{color: '#32CD32', fontSize: '10px', marginTop: '20px', display: 'block'}}>
                 OVERSEER_LOGIN
               </a>
            </div>
          </div>
        ) : (
          /* --- THE TERMINAL WAITLIST GATE --- */
          <div className="waitlist-view">
             <WaitlistForm />
             <button 
               className="back-btn" 
               onClick={() => setShowWaitlist(false)}
             >
               RETURN_TO_HOME
             </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;