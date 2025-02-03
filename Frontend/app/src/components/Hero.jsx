// src/components/Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section 
      className="hero" 
      style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
    >
      <div className="hero-content">
        <h1>Welcome to Our Website!</h1>
        <p>Discover our amazing products and services.</p>
        <button className="hero-button">Learn More</button>
      </div>
    </section>
  );
};

export default Hero;
