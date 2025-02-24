import "./Features.css";
import Navbar from "../Navbar";
import Footer from "./Footer";
import React from 'react';
import workImage from "../assets/work.jpeg";
import waterImage from '../assets/watertank.jpeg';
import trucksImage from '../assets/trucks.jpeg';

function Features() {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />
      
      <div className="features-page">
        <div className="features-header">
        <h1>Features</h1>
        <p>
        Explore the powerful features of Maxx Potential to unlock data-driven insights and optimize your strategies.  
        Track key performance metrics in real time and generate customizable reports to uncover trends.  
        Our user-friendly dashboard helps you visualize complex data effortlessly and export insights with ease.  
        With robust security and scalability, Maxx Potential ensures your data remains protected as your business grows.  
        </p>
        </div>
        <div className="features-container">
          {/* First Feature */}
          <div className="feature-item">
            <img src={workImage} alt="Work in progress" />
            <div className="feature-text">
              <h2>Efficient Data Processing</h2>
              <p>
                Our platform ensures seamless data collection and processing, enabling businesses to gain insights in real-time.
                With high-speed data pipelines and powerful analytics, Maxx Potential helps you turn raw data into actionable strategies.
                Experience smooth integration with your existing infrastructure for a hassle-free experience.
              </p>
            </div>
          </div>

          {/* Second Feature */}
          <div className="feature-item">
            <img src={waterImage} alt="Water tank storage" />
            <div className="feature-text">
              <h2>Advanced Storage Solutions</h2>
              <p>
                Our cloud-based data storage is optimized for security and scalability, ensuring that your data remains protected and accessible.
                Maxx Potential provides automatic backups, redundancy, and encryption to safeguard critical business insights.
                With seamless accessibility, you can retrieve your data anytime, anywhere.
              </p>
            </div>
          </div>

          {/* Third Feature */}
          <div className="feature-item">
            <img src={trucksImage} alt="Logistics and supply chain" />
            <div className="feature-text">
              <h2>Smart Logistics & AI-Powered Analytics</h2>
              <p>
                With AI-driven predictive analytics, Maxx Potential enhances logistics efficiency, ensuring smooth operations and timely deliveries.
                Our intelligent tracking system optimizes resource allocation and minimizes operational costs.
                Gain a competitive edge with real-time analytics that help you anticipate and adapt to market trends.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Features;
