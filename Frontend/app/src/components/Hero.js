// src/components/Hero.js
import React from 'react';
import './Hero.css'; // Import the CSS file for styling

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Our Website!</h1>
        <p>Discover our amazing products and services.</p>
        <button className="hero-button">Learn More</button>
      </div>
    </section>
  );
};

export default Hero;
