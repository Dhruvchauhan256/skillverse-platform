import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.role === "freelancer") {
          navigate("/dashboard");
        } else {
          navigate("/client-dashboard");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
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

          <div className="hero-stats">
            <div className="stat">
              <h3>10,000+</h3>
              <p>Verified Freelancers</p>
            </div>
            <div className="stat">
              <h3>500+</h3>
              <p>Active Projects</p>
            </div>
            <div className="stat">
              <h3>₹50Cr+</h3>
              <p>Total Value</p>
            </div>
          </div>

          <div className="hero-testimonial">
            <p>
              "SkillVerse helped me earn ₹2L in just 3 months. Best platform
              for Indian freelancers!" ⭐⭐⭐⭐⭐
            </p>
            <small>- Rahul Patel, React Developer</small>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="auth-form-container">
        <div className="auth-form">
          <h2 className="form-title">Welcome Back! 👋</h2>
          <p className="form-subtitle">
            Login to your SkillVerse account
          </p>

          {error && (
            <div className="alert alert-error">
              <strong>Login Failed:</strong> {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* EMAIL */}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-password">
              <a href="#" className="link">
                Forgot password?
              </a>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* DIVIDER */}
            <div className="divider">OR</div>

            {/* SOCIAL LOGIN (Optional) */}
            <div className="social-login">
              <button type="button" className="social-btn google">
                <span>🔍</span> Google
              </button>
              <button type="button" className="social-btn github">
                <span>💻</span> GitHub
              </button>
            </div>
          </form>

          <div className="form-footer">
            Don't have an account?{" "}
            <a href="/signup" className="link fw-bold">
              Sign up free
            </a>
          </div>

          {/* BENEFITS */}
          <div className="login-benefits">
            <h6>Why SkillVerse?</h6>
            <ul>
              <li>✓ 8% commission (lowest in India)</li>
              <li>✓ Instant UPI withdrawals</li>
              <li>✓ Secure escrow protection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;