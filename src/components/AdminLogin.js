import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        // Here you would use your existing login logic to hit the Render backend
        console.log("Overseer Access Requested:", credentials.username);
    };

    return (
        <div className="admin-login-vault">
            <h2 className="terminal-green">OVERSEER_AUTH_REQUIRED</h2>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="ADMIN_ID" 
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    className="terminal-input"
                />
                <input 
                    type="password" 
                    placeholder="ADMIN_KEY" 
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="terminal-input"
                />
                <button type="submit" className="terminal-btn">UNLOCK_VAULT</button>
            </form>
        </div>
    );
};

export default AdminLogin;