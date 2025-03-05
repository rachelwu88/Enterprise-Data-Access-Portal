import React, { useState } from "react";
import { Link } from "react-router-dom"; // For internal navigation
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import "./ChangePassword.css";
import heroImage from "./assets/hero-image.jpeg";
import defaultProfilePic from "./assets/default-profile.jpg"; // Imported default profile image
import { Plus, Minus, Lock, Unlock } from "react-feather";

const UserProfile = ({ isAdmin, isLoggedIn, user }) => {
  // Default user if no user is provided
  const defaultUser = {
    name: "Default User",
    role: "ROLE",
    email: "default@example.com",
    profilePic: defaultProfilePic,
  };

  const currentUser = user || defaultUser;

  // State for collapsible sections
  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

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
      <div className="main-content">
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

          {/* Change Password Section */}
          <div className="headerC">
            <h2>Change Password</h2>
          </div>
          <hr className="section-dividerrs" />
          <div className="change-password-container">
            <div className="change-password-field">
              <label htmlFor="current-password">Enter Current Password:</label>
              <textarea id="current-password"  rows="1" />
            </div>
            <div className="change-password-field">
              <label htmlFor="new-password">Enter New Password:</label>
              <textarea id="new-password"  rows="1" />
            </div>
            <div className="change-password-field">
              <label htmlFor="confirm-password">Confirm New Password:</label>
              <textarea id="confirm-password"  rows="1" />
            </div>
          </div>
        </div>
        {/* Spacer for big gap between content and footer */}
        <div className="spacer"></div>
      </div>
      <div className="spacer"></div>

      <Footer />
    </>
  );
};

export default UserProfile;