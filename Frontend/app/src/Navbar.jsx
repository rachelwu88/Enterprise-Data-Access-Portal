import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Navbar.css';
import logo from './assets/maxx-energy-logo.png';
import sandwichIcon from './assets/sandwich-icon.png';
import mailbox from './assets/mail.png';
import lock from './assets/lock.png';
import Signup from './SignUp.jsx';
import Authenticate from './Authenticate.jsx';
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
  const [is2FAOpen, setIs2FAOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
    document.body.classList.remove('content-pushed');
  }, [location]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSignup(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIs2FAOpen(true);  // Open the 2FA modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('content-pushed', !isSidebarOpen);
  };

  const toggleDropdown = (dropdownId) => {
    if (isSidebarOpen && activeDropdown === dropdownId) {
      setActiveDropdown(null); // Close the active dropdown if clicked again
    } else {
      setActiveDropdown(dropdownId); // Open the new dropdown and close others
    }
  };

  const handleHomeClick = () => {
    if (isSidebarOpen) {
      toggleSidebar(); // Collapse the sidebar when home is clicked
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__left">
          <div className="navbar__logo">
            <Link to="/" onClick={handleHomeClick}>
              <img src={logo} alt="MAXX ENERGY" className="navbar-logo" />
            </Link>
          </div>
        </div>

        <div className="navbar__center">
          <ul className="navbar__links">
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/contact">Support</Link></li>
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
                <p className="signup-text">Don&apos;t have an account? <span onClick={() => setIsSignup(true)} className="signup-button">Register</span></p>
              </form>
            </div>
          ) : (
            <Signup toggleSignup={setIsSignup} />
          )}
        </div>
      )}

      {is2FAOpen && (
        <Authenticate onSuccess={() => {
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true');
          setIs2FAOpen(false);
        }} />
      )}

      {isLoggedIn && (
        <div className={`navbar__sidenav ${isSidebarOpen ? 'expanded' : ''}`}>
          <div className="navbar__menu-icon" onClick={toggleSidebar}>
            <img src={sandwichIcon} alt="Menu" />
          </div>
          <ul>
            <li>
              <div className="dropdown">
                <div className="dropdown-header" onClick={() => isSidebarOpen && toggleDropdown('homeDropdown')}>
                  <Link to="/" onClick={handleHomeClick}>
                    <img src={homeIcon} alt="Home" /> Home
                  </Link>
                  <div className="triangle-container">
                    <div className={`triangle ${activeDropdown === 'homeDropdown' ? 'rotated' : ''}`}></div>
                  </div>
                </div>
                {activeDropdown === 'homeDropdown' && isSidebarOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/home/Comparison">Comparison Page</Link></li>
                    <li><Link to="/home/Performance">Performance Metrics</Link></li>
                    <li><Link to="/home/data">Data Search & API Access</Link></li>
                    <li><Link to="/home/DataExport">Data Export & Download</Link></li>
                  </ul>
                )}
              </div>
            </li>
            <li><Link to="/user"><img src={userIcon} alt="User" /> User</Link></li>
            <li><Link to="/report"><img src={reportIcon} alt="Report" /> Report</Link></li>
            <li><Link to="/features"><img src={featureIcon} alt="Features" /> Features</Link></li>
            <li><Link to="/contact"><img src={supportIcon} alt="Support" /> Support</Link></li>
            <li><a href="#settings"><img src={settingsIcon} alt="Settings" /> Settings</a></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
