import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3 text-info" to="/">
          SkillVerse
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center">

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
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item ms-2">
              <Link to="/signup" className="btn btn-info fw-bold">
                Join Now
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
