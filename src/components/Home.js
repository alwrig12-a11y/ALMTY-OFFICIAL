import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [patronId, setPatronId] = useState('');

    return (
        <div id="gateway-overlay">
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <img id="logo-gateway" src="amltylogo.png" alt="ALMTY" />
                <span style={{ position: 'absolute', top: 0, right: '-25px', color: '#32CD32', fontSize: '14px' }}>
                    &trade;
                </span>
            </div>

            <div className="terminal-box">
                <div id="system-status">[SYSTEM]: NODE_502_ESTABLISHED (LOU_KY)</div>
                <div id="system-action">[SYSTEM]: PROVISIONING_HEAVYWEIGHT_ASSETS...</div>
                <div>[SYSTEM]: KERNEL_ENCRYPTION_ACTIVE.</div>
                <div className="status-alert" id="status-display">
                     STATUS: REQUISITION_PHASE_LOCKED
                </div>

                <div id="login-inputs-area">
                    <div className="login-row">
                        <span className="terminal-prompt">PATRON_ID:</span>
                        <input 
                            type="text" 
                            className="terminal-input" 
                            onChange={(e) => setPatronId(e.target.value)}
                            placeholder="_"
                            autoFocus 
                        />
                    </div>
                </div>
            </div>

            {/* THIS BUTTON NOW TRIGGERS THE NEW REACT PROTOCOL */}
            <button className="btn-signup" onClick={() => navigate('/join')}>
                JOIN_WAITLIST (REQUEST_ACCESS)
            </button>

            <div className="footer-legal">
                ALMTY LLC // EIN: 33-2507723 // &copy; 2026 ALL RIGHTS RESERVED
            </div>
        </div>
    );
};

export default Home;