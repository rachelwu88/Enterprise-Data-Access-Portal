// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import logo from './assets/maxx-energy-logo.png';
import mailbox from './assets/mail.png';
import lock from './assets/lock.png';
import Signup from './SignUp.jsx';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSignup(false); // Reset to login view when modal closes
  };

  const toggleSignup = (signupState) => {
    setIsSignup(signupState); // Toggle between login and signup
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="MAXX ENERGY" className="navbar-logo" />
      </div>
      <div className="navbar__links">
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#support">Support</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>
      <div className="navbar__login">
        <button onClick={openModal}>Login</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          {!isSignup ? (
            <div className="modal__content">
              <div className="modal__logo">
                <img src={logo} alt="MAXX ENERGY" className="navbar-logo" />
              </div><br></br><br></br>
              <span className="modal__close" onClick={closeModal}>&times;</span>
              <h2>Login</h2>
              <form>
                <div className="input-container">
                  <img src={mailbox} alt="Email" className="mailbox-img" />
                  <input type="email" placeholder="Email" required /><br></br>
                </div>
                <div className="input-container password-container">
                  <img src={lock} alt="Password" className="lock-img" />
                  <input type="password" placeholder="Password" required />
                </div>
                <div className="remember-forgot">
                  <label className="remember-me">
                    <input type="checkbox" />Remember Me
                  </label>
                  <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
                </div><br></br>
                <button type="submit">Login</button><br></br>
                <p className="signup-text">Don't have an account? <span onClick={() => toggleSignup(true)} className="signup-button">Register</span></p>
              </form>
            </div>
          ) : (
            <Signup toggleSignup={toggleSignup} />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
