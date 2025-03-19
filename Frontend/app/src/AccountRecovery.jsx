import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AccountRecovery.css";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import heroImage from "./assets/hero-image.jpeg";
import defaultProfilePic from "./assets/default-profile.jpg"; // Imported default profile image
import { Plus, Minus,Lock, Unlock } from 'react-feather';

const AccountRecovery = ({ isAdmin, isLoggedIn, user }) => {
  // Default user if no user is provided
  const defaultUser = {
    name: "Default User",
    role: "ROLE",
    email: "default@example.com",
    profilePic: defaultProfilePic,
  };

  const currentUser = user || defaultUser;

  // Profile picture handling
  const [editProfilePic, setEditProfilePic] = useState(false);
  const [currentProfilePic, setCurrentProfilePic] = useState(currentUser.profilePic);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCurrentProfilePic(currentUser.profilePic);
    }
  };

  return (
    <>
    <Navbar />
            {/* Hero Section */}
            <div
              className="hero-section"
              style={{
                backgroundImage: `url(${heroImage})`,
              }}
            ></div>
    
            {/* Profile Container */}
            <div className="profile-container">
              <div className="profile-wrapper">
                <div className="profile-image-container">
                  <img src={currentProfilePic} alt="Profile" className="profile-pic" />
                  <button
                    onClick={() => setEditProfilePic(!editProfilePic)}
                    className="edit-pic-btn"
                    aria-label="Edit Profile Picture"
                  >
                    ✎
                  </button>
                  {editProfilePic && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      className="profile-file-input"
                    />
                  )}
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{currentUser.name}</h2>
                  <p className="profile-role">{currentUser.role}</p>
                  <p className="profile-email">{currentUser.email}</p>
                </div>
              </div>
            </div>
    <h2 className="account-recovery-title">Account Recovery</h2>
    <div className="line"></div>
    <div className="account-recovery-container">
      <div className="form-container">
        <p>Add/update secondary contact information for account recovery</p>
        <form>
          <div className="email-confirm first-email">
          <label>Enter Email:</label>
          <input type="email" placeholder="Enter Email" />
          </div>
          <div className="email-confirm">
          <label>Confirm Email:</label>
          <input type="email" placeholder="Confirm Email" />
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AccountRecovery;
