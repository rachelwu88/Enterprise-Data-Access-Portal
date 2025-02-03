<<<<<<< HEAD
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Hero from './components/Hero';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Hero />

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 2fb7043f2369eaa5160d9c8303224b985c124858
