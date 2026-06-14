import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3">

      {/* BRAND */}
      <Link className="navbar-brand fw-bold" to="/">
        🚀 SkillVerse
      </Link>

      {/* MOBILE TOGGLE */}
      <button
        className="navbar-toggler"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* NAV LINKS */}
      <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>

        {/* LEFT MENU */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <Link className="nav-link" to="/find-work">
              Find Work
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/find-talent">
              Find Talent
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/projects">
              Projects
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/messages">
              Messages
            </Link>
          </li>

        </ul>

        {/* SEARCH BAR (FIVERR STYLE) */}
        <form className="d-flex me-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search freelancers, jobs..."
          />
        </form>

        {/* RIGHT SIDE */}
        <ul className="navbar-nav align-items-center gap-2">

          {/* NOTIFICATIONS */}
          <li className="nav-item">
            <span className="nav-link">🔔</span>
          </li>

          {/* CREATE BUTTON */}
          <li className="nav-item">
            <Link className="btn btn-success btn-sm" to="/post-project">
              Post Job
            </Link>
          </li>

          {/* USER DROPDOWN */}
          {user ? (
            <li className="nav-item dropdown">

              <span
                className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://via.placeholder.com/30"
                  className="rounded-circle"
                  width="30"
                  height="30"
                  alt="avatar"
                />
                {user.name || "User"}
              </span>

              <ul className={`dropdown-menu ${menuOpen ? "show" : ""}`}>

                <li>
                  <Link className="dropdown-item" to="/freelancer-profile">
                    My Profile
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/my-projects">
                    My Projects
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button className="dropdown-item text-danger" onClick={logout}>
                    Logout
                  </button>
                </li>

              </ul>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-primary btn-sm" to="/signup">
                  Join
                </Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
