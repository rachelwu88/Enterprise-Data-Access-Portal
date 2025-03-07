import "./Report.css";
import Navbar from "../Navbar";
import Footer from "./Footer";
import React from 'react';
import background from "../assets/lookaway.jpeg";
import userIcon from "../assets/user-icon.png";
import emailIcon from "../assets/email-icon.png";

function Report() {
    return (
        <>
            <Navbar />
            <div className="report-page">
                <div className="form-container" style={{ backgroundImage: `url(${background})` }}>
                    <h1>Report an Issue</h1>
                    <form>
                        <div className="input-icons">
                            <img src={userIcon} alt="user" className="input-icon user-icon" />
                            <input className="input-field" type="text" id="full-name" name="full-name" placeholder="Enter your full name" required />
                        </div>
                        <div className="input-icons">
                            <img src={emailIcon} alt="email" className="input-icon email-icon" />
                            <input className="input-field" type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="input-icons">
                            <textarea className="input-field" id="message" name="message" placeholder="Enter your message" rows="4" required></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div className="footer-container">
                <Footer />
            </div>
        </>
    );
}

export default Report;
