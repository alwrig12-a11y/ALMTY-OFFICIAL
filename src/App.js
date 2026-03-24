import React from 'react';
import './App.css';
import WaitlistForm from './components/WaitlistForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ALMTY SOVEREIGN PROTOCOL</h1>
        <p>INITIALIZING IDENTITY PHASE...</p>
        <WaitlistForm />
      </header>
    </div>
  );
}

export default App;