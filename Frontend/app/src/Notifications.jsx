import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import "./Notifications.css";
import heroImage from "./assets/hero-image.jpeg";
import defaultProfilePic from "./assets/default-profile.jpg"; // Default profile image

const UserProfile = ({ isAdmin, isLoggedIn, user }) => {
  // Default user if no user is provided
  const defaultUser = {
    name: "Default User",
    role: "ROLE",
    email: "default@example.com",
    profilePic: defaultProfilePic,
  };

  const currentUser = user || defaultUser;

  // State for collapsible sections and sliders
  const [editProfilePic, setEditProfilePic] = useState(false);
  const [currentProfilePic, setCurrentProfilePic] = useState(currentUser.profilePic);

  // Slider states for notifications
  const [notifications, setNotifications] = useState({
    unusualLogin: false,
    dataBreach: false,
    roleChanges: false,
    accountChangesInApp: false,
    emailNotifications: false,
    newTasks: false,
    backlogProgress: false,
    projectMilestones: false,
  });

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

  const handleNotificationChange = (e) => {
    const { id, checked } = e.target;
    setNotifications((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>

        {/* Profile Container */}
        <div className="profile-container">
          <div className="profile-wrapper">
            <div className="profile-image-container">
              <img
                src={currentProfilePic}
                alt="Profile"
                className="profile-pic"
              />
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

          {/* Security Alerts Section */}
          <div className="headerS">
            <h2>Security Alerts</h2>
          </div>
          <hr className="section-dividerrs" />
          <div className="security-alerts-container">
            <div className="security-alerts-field">
              <label htmlFor="unusualLogin">
                Enable notifications for unusual login attempts, data breaches, or role changes:
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="unusualLogin"
                  checked={notifications.unusualLogin}
                  onChange={handleNotificationChange}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* In-app notifications */}
            <div className="security-alerts-field">
              <label htmlFor="accountChangesInApp">
                Enable in-app notifications for account changes:
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="accountChangesInApp"
                  checked={notifications.accountChangesInApp}
                  onChange={handleNotificationChange}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Email notifications */}
            <div className="security-alerts-field">
              <label htmlFor="emailNotifications">
                Enable email notifications for account changes:
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* General Notifications */}
            <div className="headerS">
              <h3>General Notifications</h3>
            </div>
            <hr className="section-dividerrs" />
            <div className="security-alerts-field">
              <label htmlFor="newTasks">
                Enable updates on new tasks:
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="newTasks"
                  checked={notifications.newTasks}
                  onChange={handleNotificationChange}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="security-alerts-field">
              <label htmlFor="backlogProgress">
                Enable updates on progress on backlogs:
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="backlogProgress"
                  checked={notifications.backlogProgress}
                  onChange={handleNotificationChange}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="security-alerts-field">
              <label htmlFor="projectMilestones">
                Enable updates on progress on project milestones:
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="projectMilestones"
                  checked={notifications.projectMilestones}
                  onChange={handleNotificationChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Spacer for footer */}
        <div className="spacer"></div>
      </div>
      <div className="spacer"></div>
      <Footer />
    </>
  );
};

export default UserProfile;
