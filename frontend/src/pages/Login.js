import React from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function Login() {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">
          Login to continue to <span>SkillVerse</span>
        </p>

        <form className="auth-form">

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
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
