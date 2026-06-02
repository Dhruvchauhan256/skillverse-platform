import React from "react";
import "../styles/auth.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Create Account 🚀</h2>
        <p className="auth-subtitle">
          Join <span>SkillVerse</span> and start earning
        </p>

        <form className="auth-form">
          <input
            type="text"
            placeholder="Enter Name"
            className="auth-input"
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            className="auth-input"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="auth-input"
            required
          />

          <button type="submit" className="auth-btn">
            Signup
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
