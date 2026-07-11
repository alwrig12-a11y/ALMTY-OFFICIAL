import React, { useState } from 'react';
import AuthGateway from './components/AuthGateway'; // Imports from the components folder

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      {!currentUser ? (
        // Displays the login/signup terminal if user is logged out
        <AuthGateway onAuthSuccess={(userDossier) => setCurrentUser(userDossier)} />
      ) : (
        // Displays the main app layout once authenticated
        <div style={{ color: '#fff', padding: '40px', fontFamily: 'monospace' }}>
          <h1>WELCOME, OPERATIVE {currentUser.username.toUpperCase()}</h1>
          <p>RANK: {currentUser.role}</p>
          <p>RESPETO: {currentUser.respeto} | AURA: {currentUser.aura}</p>
        </div>
      )}
    </div>
  );
}