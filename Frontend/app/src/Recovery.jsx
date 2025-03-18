import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import "./Recovery.css";
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

          {/* Account Recovery Section */}
          <div className="headerC">
            <h2>Account Recovery</h2>
          </div>
          <hr className="section-divider" />
          <div className="textA">
          <h3 >Add/update secondary contact information for account recovery</h3>
          </div>
          <div className="change-password-container">
            <div className="change-password-field">
              <label htmlFor="current-email">Enter Current Email:</label>
              <input type="email" id="current-email" className="input-field" />
            </div>
            <div className="change-password-field">
              <label htmlFor="new-email">Enter New Email:</label>
              <input type="email" id="new-email" className="input-field" />
            </div>
            <div className="change-password-field">
              <label htmlFor="confirm-new-email">Confirm New Email:</label>
              <input type="email" id="confirm-new-email" className="input-field" />
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
