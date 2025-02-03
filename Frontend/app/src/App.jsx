import { useState } from 'react';
import './App.css';
import Navbar from './Navbar'; // Importing Navbar component

function App() {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />
      
      <h1>Welcome to MAXX ENERGY</h1>

      <div className="card">
        <p>Welcome to the MAXX ENERGY Portal. Please login to access more features.</p>
      </div>
    </>
  );
}

export default App;
