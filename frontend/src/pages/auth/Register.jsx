import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.name || !formData.email || !formData.password) {
    setError("Please fill all required fields");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords don't match");
    return;
  }

  if (formData.password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  if (!agreeTerms) {
    setError("Please agree to the Terms & Conditions");
    return;
  }

  setLoading(true);

  try {
    console.log("Sending signup data:", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: role,
      bio: formData.bio || "",
    });

    const response = await axios.post("http://localhost:5000/api/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: role,
      bio: formData.bio || "",
    });

    console.log("Signup response:", response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("userRole", response.data.user.role);
    localStorage.setItem("userName", response.data.user.name);

    navigate("/onboarding");
  } catch (err) {
    console.error("Signup error:", err.response?.data);
    setError(err.response?.data?.error || "Signup failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="register-container">
      <div className="register-box">
        {step === 1 ? (
          <>
            <div className="register-header">
              <h1>Join SkillVerse</h1>
              <p>What role best describes you?</p>
            </div>

            <div className="role-cards">
              <button
                onClick={() => setRole("freelancer")}
                className={`role-card ${role === "freelancer" ? "selected" : ""}`}
              >
                <div className="role-emoji">🎯</div>
                <h3>I'm a Freelancer</h3>
                <p>I offer services and earn by completing projects</p>
              </button>

              <button
                onClick={() => setRole("client")}
                className={`role-card ${role === "client" ? "selected" : ""}`}
              >
                <div className="role-emoji">💼</div>
                <h3>I'm a Client</h3>
                <p>I hire freelancers to work on my projects</p>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!role}
              className="continue-btn"
            >
              Continue
            </button>

            <p className="login-link">
              Already have an account?{" "}
              <a href="/login">Sign in</a>
            </p>
          </>
        ) : (
          <>
            <div className="register-header">
              <button
                onClick={() => setStep(1)}
                className="back-btn"
              >
                ← Back
              </button>
              <h1>Create Your Account</h1>
              <p>
                {role === "freelancer"
                  ? "Start earning with your skills"
                  : "Start hiring talented freelancers"}
              </p>
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="you@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {role === "freelancer" ? "Professional Summary" : "Company Description"}{" "}
                  <span>(Optional)</span>
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleFormChange}
                  placeholder="Tell us about yourself..."
                  rows="3"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
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
                <p className="password-hint">Minimum 8 characters</p>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  placeholder="••••••••"
                  className="form-input"
                  required
                />
              </div>

              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <a href="#">Terms & Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? "Creating account..." : `Create ${role === "freelancer" ? "Freelancer" : "Client"} Account`}
              </button>
            </form>

            <p className="login-link">
              Already have an account?{" "}
              <a href="/login">Sign in</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}