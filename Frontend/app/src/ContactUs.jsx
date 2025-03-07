import React from "react";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import "./ContactUs.css";
import userIcon from "./assets/user-icon.png";
import emailIcon from "./assets/email-icon.png";
import callIcon from "./assets/call-icon.png"; // Add call icon image
import locationIcon from "./assets/location-icon.png"; // Add location icon image
import timeIcon from "./assets/time-icon.png"; // Add clock icon image

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="outer-container">
          <img src="/images/Contact.jpeg" alt="Contact Section" className="contact-image" />
          <h1 className="contact-title">Contact Us</h1>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h2 className="contact-title-info">
              <img src={callIcon} alt="Call" className="contact-icon" /> Call Us
            </h2>
            <p className="info">1-234-567-8910</p>

            <h2 className="contact-title-info">
              <img src={emailIcon} alt="Email" className="contact-icon" /> Email Us
            </h2>
            <p className="info">max@maxxenergy.com</p>

            <h2 className="contact-title-info">
              <img src={locationIcon} alt="Location" className="contact-icon" /> Location
            </h2>
            <p className="info">1234 Maple Street, Stamford, CT 06831</p>

            <h2 className="contact-title-info">
              <img src={timeIcon} alt="Clock" className="time-icon" /> Business Hours
            </h2>
            <ul className="open-times">
              <li>Monday: 9AM - 5PM</li>
              <li>Tuesday: 9AM - 5PM</li>
              <li>Wednesday: 9AM - 5PM</li>
              <li>Thursday: 9AM - 5PM</li>
              <li>Friday: 9AM - 5PM</li>
              <li>Saturday: Closed</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

          <div className="contact-form">
            <h2 className="help">How Can We Help You?</h2>
            <div className="input-icons">
              <img src={userIcon} alt="user" className="input-icon user-icon" />
              <input type="text" placeholder="Full Name" />
            </div>
            <div className="input-icons">
              <img src={emailIcon} alt="email" className="input-icon email-icon" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-icons">
              <div className="subject">
                <textarea className="message" placeholder="Message"></textarea>
              </div>
            </div>
            <button className="submit" type="submit">Submit</button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
