import React, { useState } from 'react';
import './Navbar.css';
import logo from './assets/maxx-energy-logo.png'; 
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <div className="modal__content">
            <span className="modal__close" onClick={closeModal}>&times;</span>
            <h2>Login</h2>
            <form>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
