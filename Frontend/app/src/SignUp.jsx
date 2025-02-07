// src/components/Signup.js
import React from 'react';
import mailbox from './assets/mail.png';
import lock from './assets/lock.png';

const Signup = ({ toggleSignup }) => {
  return (
    <div className="modal__content">
      <div className="modal__logo">
        <img src={require('../assets/maxx-energy-logo.png').default} alt="MAXX ENERGY" className="navbar-logo" />
      </div><br></br><br></br>
      <span className="modal__close" onClick={() => toggleSignup(false)}>&times;</span>
      <h2>Sign Up</h2>
      <form>
        <div className="input-container">
          <img src={mailbox} alt="Email" className="mailbox-img" />
          <input type="email" placeholder="Email" required /><br></br>
        </div>
        <div className="input-container password-container">
          <img src={lock} alt="Password" className="lock-img" />
          <input type="password" placeholder="Password" required />
        </div>
        <div className="input-container password-container">
          <img src={lock} alt="Confirm Password" className="lock-img" />
          <input type="password" placeholder="Confirm Password" required />
        </div>
        <button type="submit">Sign Up</button><br></br>
        <p className="signup-text">Already have an account? <span onClick={() => toggleSignup(false)} className="signup-button">Login</span></p>
      </form>
    </div>
  );
};

export default Signup;
