import React, { useState } from 'react';
import './Authenticate.css';
import lockIcon from './assets/lock.png'; 
import logo from './assets/maxx-energy-logo.png';

const Authenticate = ({ onSuccess }) => {
  const [token, setToken] = useState('');

  const handle2FASuccess = () => {
    if (token) {
      onSuccess();
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__logo">
          <img src={logo} alt="MAXX ENERGY" />
        </div> <br></br><br></br>
        <h2>Two-Factor Authentication</h2>
        <p>Enter token sent to email</p>
        <div className="input-container">
          <img src={lockIcon} alt="Lock Icon" />
          <input
            type="text"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button onClick={handle2FASuccess}>Verify</button>
      </div>
    </div>
  );
};

export default Authenticate;
