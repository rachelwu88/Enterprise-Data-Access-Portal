import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from './assets/maxx-energy-logo.png';
import sandwichIcon from './assets/sandwich-icon.png';  // Import your sandwich icon

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);  // Toggle the menu state
    if (!isMenuOpen) {
      document.body.classList.add('content-pushed'); // Add class to body when menu opens
    } else {
      document.body.classList.remove('content-pushed'); // Remove class when menu closes
    }
  };

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

  return (
    <>
      <nav className="navbar">
        <div className="navbar__left">
          {isLoggedIn && (
            <div className="navbar__menu-icon" onClick={toggleMenu}>
              <img src={sandwichIcon} alt="Menu" className="menu-icon" />
            </div>
          )}
          <div className="navbar__logo">
            <img src={logo} alt="MAXX ENERGY" className="navbar-logo" />
          </div>
        </div>

        <div className="navbar__center">
          <ul className="navbar__links">
            <li><a href="#features">Features</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#faq">FAQ</a></li>
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

      {/* Modal for login */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <span className="modal__close" onClick={closeModal}>&times;</span>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar component */}
      {isLoggedIn && (
        <Sidebar isOpen={isMenuOpen} toggleSidebar={toggleMenu} />
      )}
    </>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`navbar__sidenav ${isOpen ? 'open' : ''}`}>
      <div className={`sidebar ${isOpen ? 'expanded' : ''}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;