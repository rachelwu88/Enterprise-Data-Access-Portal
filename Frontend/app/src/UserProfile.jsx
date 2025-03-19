import React, { useState } from "react";
import { Link } from "react-router-dom"; // For internal navigation
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import "./UserProfile.css";
import heroImage from "./assets/hero-image.jpeg";
import defaultProfilePic from "./assets/default-profile.jpg"; // Imported default profile image
import { Plus, Minus,Lock, Unlock } from 'react-feather';
import AccountRecovery from "./AccountRecovery";

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

          {/* Account Settings / Collapsible Sections */}
          <div className="account-settings">
            {/* Password Management */}
            <div className="collapsible-section">
              <div className="section-header">
                <span>Password Management</span>
                <button
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle Password Management"
                >
                  {showPassword ? <Minus size={20} /> : <Plus size={20} />}
                </button>
              </div>
              {showPassword && (
                <div className="section-content">
                  <Link to="/change-password" className="section-link">
                    Change Password
                  </Link>
                </div>
              )}
            </div>
            <hr className="section-divider" />

            {/* Account Recovery */}
            <div className="collapsible-section">
              <div className="section-header">
                <span>Account Recovery</span>
                <button
                  className="toggle-btn"
                  onClick={() => setShowRecovery(!showRecovery)}
                  aria-label="Toggle Account Recovery"
                >
                  {showRecovery ? <Minus size={20} /> : <Plus size={20} />}
                </button>
              </div>
              {showRecovery && (
                <div className="section-content">
                  <Link to="/update-recovery-email" className="section-link">
                    Add/Update Recovery Email
                  </Link>
                </div>
              )}
            </div>
            <hr className="section-divider" />

            {/* Notification Preferences (Always Visible) */}
            <div className="collapsible-section">
              <div className="section-header">
                <Link to="/notification-preferences" className="section-link">
                  Notification Preferences
                </Link>
              </div>
            </div>
            <hr className="section-divider" />

            {/* Downloaded Documents (Always Visible) */}
            <div className="collapsible-section">
              <div className="section-header">
                <Link to="/downloaded-documents" className="section-link">
                  Downloaded Documents
                </Link>
              </div>
            </div>
            <hr className="section-divider" />

            {/* Admin Only Section */}
            {isLoggedIn && isAdmin && (
              <div className="collapsible-section">
                <div className="section-header">
                  <span>Admin Only</span>
                  <button
                    className="toggle-btn"
                    onClick={() => setShowAdmin(!showAdmin)}
                    aria-label="Toggle Admin Only Section"
                  >
                    {showAdmin ? <Unlock size={20} /> : <Lock size={20} />}
                  </button>
                </div>
                {showAdmin && (
                  <div className="section-content">
                    <Link to="/user-management" className="section-link">
                      User Management
                    </Link>
                    <div className="section-content">
                      <Link to="/audit-logs" className="section-link">
                        Audit Logs
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Admin Test Section */}
            {isLoggedIn && isAdmin && (
              <div className="admin-test-message">
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

// For testing, let's simulate logged-in admin and non-admin states
UserProfile.defaultProps = {
  isAdmin: true, // Set to true for testing admin view, change to false to test regular user view
  isLoggedIn: true, // Set to true for testing logged-in state, change to false to test logged-out view
};

export default UserProfile;
