import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import "./UserProfile.css";
import heroImage from "./assets/hero-image.jpeg"; // Corrected path
import { Lock, Plus, Minus } from "lucide-react";

const UserProfile = ({ isAdmin }) => {
  const [editProfilePic, setEditProfilePic] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  return (
    <>
      <Navbar />

      {/* Background Image Section */}
      <div className="relative flex items-center justify-center h-48 bg-black">
        <img src={heroImage} alt="User Profile Background" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <h1 className="relative z-10 text-white text-3xl font-bold">User Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="max-w-2xl mx-auto text-white mt-6">
        <div className="relative flex items-center gap-6 p-6 bg-gray-900 shadow-md rounded-lg">
          <div className="relative">
            <img src="/images/profile.jpg" alt="User" className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg" />
            <button 
              onClick={() => setEditProfilePic(!editProfilePic)}
              className="absolute bottom-2 right-2 bg-gray-800 p-1 rounded-full text-sm"
            >
              ✎
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">User Name</h2>
            <p className="text-sm text-gray-400">User Role</p>
            <p className="text-sm text-gray-400">user@maxxenergy.com</p>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 mt-6">
          
          {/* Password Management */}
          <div>
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <p>Change Password</p>
              <button onClick={() => setShowPassword(!showPassword)} className="toggle-btn">
                {showPassword ? <Minus size={20} /> : <Plus size={20} />}
              </button>
            </div>
            {showPassword && (
              <div className="mt-2 space-y-2">
                <input type="password" placeholder="New Password" className="input-field" />
                <input type="password" placeholder="Confirm Password" className="input-field" />
                <button className="btn">Update Password</button>
              </div>
            )}
          </div>

          {/* Recovery Email */}
          <div>
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <p>Add/Update Recovery Email</p>
              <button onClick={() => setShowRecovery(!showRecovery)} className="toggle-btn">
                {showRecovery ? <Minus size={20} /> : <Plus size={20} />}
              </button>
            </div>
            {showRecovery && (
              <div className="mt-2 space-y-2">
                <input type="email" placeholder="Recovery Email" className="input-field" />
                <button className="btn">Update Email</button>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="border-b border-gray-600 pb-2">
            <a href="/notification-preferences" className="text-blue-400">Notification Preferences</a>
          </div>
          <div className="border-b border-gray-600 pb-2">
            <a href="/downloaded-documents" className="text-blue-400">Downloaded Documents</a>
          </div>

          {/* Admin Section */}
          {isAdmin && (
            <div>
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <p>Admin Only</p>
                <button onClick={() => setAdminUnlocked(!adminUnlocked)} className="toggle-btn">
                  {adminUnlocked ? <Minus size={20} /> : <Lock size={20} />}
                </button>
              </div>
              {adminUnlocked && (
                <div className="mt-2 space-y-2">
                  <a href="/user-management" className="text-blue-400">User Management</a>
                  <a href="/audit-logs" className="text-blue-400">Audit Logs</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
