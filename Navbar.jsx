import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';
import logo from './assets/maxx-energy-logo.png';
import sandwichIcon from './assets/sandwich-icon.png';
import mailbox from './assets/mail.png';
import lock from './assets/lock.png';
import Signup from './SignUp.jsx';
import homeIcon from './assets/home-icon.png';
import userIcon from './assets/user-icon.png';
import reportIcon from './assets/report-icon.png';
import featureIcon from './assets/features-icon.png';
import supportIcon from './assets/support-icon.png';
import settingsIcon from './assets/setting-icon.png';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSignup(false);
  };

  const toggleSignup = (signupState) => setIsSignup(signupState);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('content-pushed', !isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__left">
          <div className="navbar__logo">
            {/* Updated: Wrap logo in Link to navigate to home */}
            <Link to="/">
              <img src={logo} alt="MAXX ENERGY" className="navbar-logo" />
            </Link>
          </div>
        </div>

        <div className="navbar__center">
          <ul className="navbar__links">
            <li><a href="#features">Features</a></li>
            <li><a href="#support">Support</a></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="navbar__right">
          <div className="navbar__login">
            {!isLoggedIn ? (
              <button onClick={openModal}>Login</button>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal for login or signup */}
      {isModalOpen && (
        <div className="modal">
          {!isSignup ? (
            <div className="modal__content">
              <div className="modal__logo">
                <img src={logo} alt="MAXX ENERGY" className="navbar-logo" />
              </div><br /><br />
              <span className="modal__close" onClick={closeModal}>&times;</span>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div className="input-container">
                  <img src={mailbox} alt="Email" className="mailbox-img" />
                  <input type="email" placeholder="Email" required /><br />
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
                </div><br />
                <button type="submit">Login</button><br />
                <p className="signup-text">Don&apos;t have an account? <span onClick={() => toggleSignup(true)} className="signup-button">Register</span></p>
              </form>
            </div>
          ) : (
            <Signup toggleSignup={toggleSignup} />
          )}
        </div>
      )}

      {/* Sidebar component */}
      {isLoggedIn && (
        <div className={`navbar__sidenav ${isSidebarOpen ? 'expanded' : ''}`}>
          {/* Sandwich button to toggle sidebar */}
          <div className="navbar__menu-icon" onClick={toggleSidebar}>
            <img src={sandwichIcon} alt="Menu" />
          </div>
          <ul>
            {/* Updated: Wrap Home icon in Link to navigate to home */}
            <li><Link to="/"><img src={homeIcon} alt="Home" /> Home</Link></li>
            <li><a href="#user"><img src={userIcon} alt="User" /> User</a></li>
            <li><a href="#report"><img src={reportIcon} alt="Report" /> Report</a></li>
            <li><a href="#features"><img src={featureIcon} alt="Features" /> Features</a></li>
            <li><a href="#support"><img src={supportIcon} alt="Support" /> Support</a></li>
            <li><a href="#settings"><img src={settingsIcon} alt="Settings" /> Settings</a></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
