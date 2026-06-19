import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

      const res = await axios.post(`${API}/api/auth/register`, {
        name,
        email,
        password,
        role,
      });

      if (res.data.success) {
        setSuccess("✅ Registration successful! Redirecting to login...");
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
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            {/* HEADER */}
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">Join SkillVerse 🚀</h2>
              <p className="text-muted">
                India's #1 Freelance Marketplace - Only 8% Commission
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show">
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError("")}
                />
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="alert alert-success alert-dismissible fade show">
                {success}
              </div>
            )}

            <form onSubmit={handleRegister}>
              {/* NAME */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* ROLE SELECTION — NEW! */}
              <div className="mb-4">
                <label className="form-label fw-semibold mb-3">
                  I want to join as:
                </label>

                <div className="row g-3">
                  {/* FREELANCER OPTION */}
                  <div className="col-md-6">
                    <div
                      className={`card p-3 text-center cursor-pointer ${
                        role === "freelancer"
                          ? "border-success border-2 bg-success bg-opacity-10"
                          : "border-gray"
                      }`}
                      onClick={() => setRole("freelancer")}
                      style={{ cursor: "pointer" }}
                    >
                      <h5 className="fw-bold mb-2">💼 Freelancer</h5>
                      <p className="small text-muted mb-0">
                        Offer services & earn money
                      </p>
                      <div className="mt-2">
                        <small className="text-success fw-semibold">
                          Earn up to ₹5+ Lakhs/month
                        </small>
                      </div>
                      {role === "freelancer" && (
                        <div className="mt-2">
                          <span className="badge bg-success">✓ Selected</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CLIENT OPTION */}
                  <div className="col-md-6">
                    <div
                      className={`card p-3 text-center cursor-pointer ${
                        role === "client"
                          ? "border-primary border-2 bg-primary bg-opacity-10"
                          : "border-gray"
                      }`}
                      onClick={() => setRole("client")}
                      style={{ cursor: "pointer" }}
                    >
                      <h5 className="fw-bold mb-2">🎯 Client/Business</h5>
                      <p className="small text-muted mb-0">
                        Hire talented freelancers
                      </p>
                      <div className="mt-2">
                        <small className="text-primary fw-semibold">
                          Get projects done in days
                        </small>
                      </div>
                      {role === "client" && (
                        <div className="mt-2">
                          <span className="badge bg-primary">✓ Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 fw-bold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* LOGIN LINK */}
              <div className="text-center mt-3">
                <p className="text-muted">
                  Already have an account?{" "}
                  <a href="/login" className="text-success fw-bold">
                    Login here
                  </a>
                </p>
              </div>

              {/* BENEFITS */}
              <div className="mt-4 pt-3 border-top">
                <h6 className="fw-bold mb-3">Why join SkillVerse?</h6>
                <div className="d-flex gap-2 mb-2">
                  <span>✅</span>
                  <span className="small">
                    Only 8% commission (vs 20% on Upwork/Fiverr)
                  </span>
                </div>
                <div className="d-flex gap-2 mb-2">
                  <span>✅</span>
                  <span className="small">UPI payments - instant withdrawals</span>
                </div>
                <div className="d-flex gap-2 mb-2">
                  <span>✅</span>
                  <span className="small">
                    India-first platform built for Indian freelancers
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <span>✅</span>
                  <span className="small">
                    GST-compliant invoicing + TDS auto-calculated
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;