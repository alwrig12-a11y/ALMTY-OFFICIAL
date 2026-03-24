import React from 'react';
import './App.css';
import logo from './logo.png'; // 1. Import your logo here
import WaitlistForm from './components/WaitlistForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* 2. Replace the <h1> with your image */}
        <img src={logo} className="almty-logo-glow" alt="ALMTY Logo" />
        
        <p className="protocol-text">INITIALIZING IDENTITY PHASE...</p>
        <WaitlistForm />
      </header>
    </div>
  );
}

export default App;