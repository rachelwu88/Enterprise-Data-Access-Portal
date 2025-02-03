// src/components/Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section 
      className="hero" 
      style={{ backgroundImage: 'url(/images/hero-img.jpeg)' }}
    >
      <div className="hero-content">
      </div>
    </section>
  );
};

export default Hero;
