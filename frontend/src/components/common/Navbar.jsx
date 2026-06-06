import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="custom-navbar">
      <div className="nav-container">

        {/* BRAND */}
        <Link className="brand" to="/">
          SkillVerse
        </Link>

        {/* LINKS */}
        <div className="nav-links">

          <Link to="/find-work">Find Work</Link>
          <Link to="/find-talent">Find Talent</Link>
          <Link to="/jobs">Jobs</Link>

          {!token ? (
            <>
              <Link className="login-btn" to="/login">Login</Link>
              <Link className="signup-btn" to="/signup">Join</Link>
            </>
          ) : (
            <>
  <Link className="dashboard-btn" to="/dashboard">
    Dashboard
  </Link>

  <button
    className="logout-btn"
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }}
  >
    Logout
  </button>
</>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
