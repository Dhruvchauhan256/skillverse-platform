import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // Store token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("userRole", response.data.user.role);
      localStorage.setItem("userName", response.data.user.name);

      // Redirect based on role
      const redirectUrl = response.data.user.role === "freelancer" ? "/dashboard" : "/client-dashboard";
      navigate(redirectUrl);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your SkillVerse account</p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="form-input"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="password-header">
              <label className="form-label">Password</label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-btn"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me for 30 days</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="signup-link">
          Don't have an account?{" "}
          <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}