import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <a className="navbar-brand fw-bold fs-3 text-info" href="/">
          SkillVerse
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <a className="nav-link" href="/">Find Work</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/">Find Talent</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/">Categories</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/">Login</a>
            </li>

            <li className="nav-item ms-2">
              <button className="btn btn-info fw-bold">
                Join Now
              </button>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
