import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div id="gateway-overlay">
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <img id="logo-gateway" src="amltylogo.png" alt="ALMTY" />
                <span style={{ position: 'absolute', top: 0, right: '-25px', color: '#00FF00', fontSize: '14px' }}>
                    &trade;
                </span>
            </div>

            <div className="terminal-box">
                <div id="system-status">[SYSTEM]: NODE_502_ESTABLISHED (LOU_KY)</div>
                <div id="system-action">[SYSTEM]: PROVISIONING_HEAVYWEIGHT_ASSETS...</div>
                <div>[SYSTEM]: KERNEL_ENCRYPTION_ACTIVE.</div>
                
                <div className="status-alert" id="status-display">
                    {">> STATUS: REQUISITION_PHASE_LOCKED <<"}
                </div>

                <div id="login-inputs-area">
                    <div className="login-row">
                        <span className="terminal-prompt">PATRON_ID:</span>
                        <div className="input-wrapper">
                            {/* This is your classic login input */}
                            <input type="text" className="terminal-input-hidden" placeholder="_" autoFocus />
                        </div>
                    </div>
                </div>
            </div>

            {/* THE REDIRECT TRIGGER: This activates the page in your screenshot */}
            <button className="btn-signup" onClick={() => navigate('/join')}>
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
};

export default Home;