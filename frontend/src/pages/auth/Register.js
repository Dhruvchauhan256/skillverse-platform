import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.post(`${API}/api/auth/register`, {
        name: form.username,
        email: form.email,
        password: form.password,
        role: "freelancer",
      });

      setSuccess("Registration Successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create account</h2>
        <p>Join SkillVerse and start freelancing</p>

        <button className="google-btn">Continue with Google</button>
        <button className="facebook-btn">Continue with Facebook</button>
        <button className="apple-btn">Continue with Apple</button>

        <div className="divider">OR</div>

        {/* ERROR MESSAGE */}
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
