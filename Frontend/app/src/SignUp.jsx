import React from 'react';
import './SignUp.css';

const Signup = ({ toggleSignup }) => {
  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
      <p className="login-text">
        Already have an account?{' '}
        <span onClick={() => toggleSignup(false)} className="login-button">Sign In</span>
      </p>
    </div>
  );
};

export default Signup;
