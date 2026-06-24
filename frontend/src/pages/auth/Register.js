import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Step 1: Role, Step 2: Details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !role) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
const res = await axios.post(`${API}/api/auth/signup`, {
        name,
        email,
        password,
        role,
      });
if (res.data.token) {
  setSuccess("✅ Account created! Redirecting to login...");

  setTimeout(() => {
    navigate("/login");
  }, 2000);
}
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE - HERO */}
      <div className="auth-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            🚀 <span className="highlight">SkillVerse</span>
          </h1>
          <p className="hero-subtitle">
            India's #1 Freelance Marketplace
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">💰</span>
              <div>
                <strong>Only 8% Commission</strong>
                <p>Keep 92% of what you earn</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">🇮🇳</span>
              <div>
                <strong>India First</strong>
                <p>Built for Indian freelancers</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">📲</span>
              <div>
                <strong>UPI Payments</strong>
                <p>Instant withdrawals</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <div>
                <strong>Secure Escrow</strong>
                <p>Protection for both parties</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="auth-form-container">
        <div className="auth-form">
          {/* STEP 1: ROLE SELECTION */}
          {step === 1 ? (
            <>
              <h2 className="form-title">Join SkillVerse</h2>
              <p className="form-subtitle">Choose how you want to use SkillVerse</p>

              {error && <div className="alert alert-error">{error}</div>}

              <div className="role-grid">
                {/* FREELANCER */}
                <div
                  className="role-card freelancer-card"
                  onClick={() => handleRoleSelect("freelancer")}
                >
                  <div className="role-icon">💼</div>
                  <h3>I'm a Freelancer</h3>
                  <p>Offer skills & earn money</p>
                  <ul className="role-benefits">
                    <li>✓ Build your profile</li>
                    <li>✓ Get hired for projects</li>
                    <li>✓ Earn up to ₹5L+/month</li>
                    <li>✓ Flexible work schedule</li>
                  </ul>
                  <button className="role-btn">Get Started</button>
                </div>

                {/* CLIENT */}
                <div
                  className="role-card client-card"
                  onClick={() => handleRoleSelect("client")}
                >
                  <div className="role-icon">🎯</div>
                  <h3>I'm a Client</h3>
                  <p>Hire talented professionals</p>
                  <ul className="role-benefits">
                    <li>✓ Post your projects</li>
                    <li>✓ Get proposals fast</li>
                    <li>✓ Secure payments</li>
                    <li>✓ Only pay for quality</li>
                  </ul>
                  <button className="role-btn">Get Started</button>
                </div>
              </div>

              <div className="form-footer">
                Already have an account?{" "}
                <a href="/login" className="link">
                  Login
                </a>
              </div>
            </>
          ) : (
            <>
              {/* STEP 2: DETAILS */}
              <div className="form-header">
                <button
                  className="back-btn"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <h2 className="form-title">
                  {role === "freelancer" ? "Become a Freelancer" : "Create Your Account"}
                </h2>
              </div>

              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleRegister}>
                {/* NAME */}
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* PASSWORD */}
                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                  />
                  <small className="form-hint">
                    Use a combination of letters, numbers & symbols
                  </small>
                </div>

                {/* ROLE BADGE */}
                <div className="role-badge">
                  Signing up as:{" "}
                  <strong>
                    {role === "freelancer" ? "💼 Freelancer" : "🎯 Client"}
                  </strong>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="change-role"
                  >
                    Change
                  </button>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>

                {/* TERMS */}
                <p className="terms">
                  By signing up, you agree to our{" "}
                  <a href="#" className="link">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="link">
                    Privacy Policy
                  </a>
                </p>
              </form>

              <div className="form-footer">
                Already have an account?{" "}
                <a href="/login" className="link">
                  Login
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;