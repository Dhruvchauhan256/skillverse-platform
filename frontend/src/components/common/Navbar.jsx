import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUnreadCount();

      // Poll every 30 seconds for new messages
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(`${API}/api/messages/unread/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadCount(res.data.count || 0);
    } catch (err) {
      console.log("UNREAD COUNT ERROR:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3 shadow-sm">

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

      {/* NAV CONTENT */}
      <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>

        {/* LEFT LINKS */}
        <ul className="navbar-nav me-auto gap-2">
          <li className="nav-item">
            <Link className="nav-link" to="/find-work">Find Work</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/find-talent">Find Talent</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/jobs">Jobs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link position-relative" to="/messages">
              Messages
              {unreadCount > 0 && (
                <span
                  className="badge bg-danger rounded-pill ms-1"
                  style={{ fontSize: "10px" }}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* CENTER SEARCH */}
        <form className="d-flex me-3 w-50" onSubmit={handleSearchSubmit}>
          <input
            name="search"
            className="form-control rounded-pill px-3"
            type="search"
            placeholder="Search freelancers, projects, skills..."
          />
        </form>

        {/* RIGHT SIDE */}
        <ul className="navbar-nav align-items-center gap-2">

          {/* NOTIFICATION BELL — now connected to backend */}
          <li className="nav-item">
            <span
              className="nav-link fs-5 position-relative"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/messages")}
            >
              🔔
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "10px" }}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </span>
          </li>

          {/* POST JOB */}
          <li className="nav-item">
            <Link className="btn btn-success btn-sm" to="/post-project">
              Post Job
            </Link>
          </li>

          {/* AUTH */}
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary btn-sm" to="/signup">
                  Join
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item dropdown position-relative">

              {/* USER BUTTON */}
              <div
                className="d-flex align-items-center gap-2 nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={user?.avatar || "https://via.placeholder.com/30"}
                  width="32"
                  height="32"
                  className="rounded-circle"
                  alt="user"
                />
                <span className="fw-semibold">
                  {user?.name || "User"}
                </span>
                <span className="d-flex align-items-center gap-1">
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: user?.is_online ? "green" : "gray",
                      display: "inline-block",
                    }}
                  />
                </span>
              </div>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <div
                  className="position-absolute bg-dark text-white p-2 rounded shadow"
                  style={{ right: 0, top: "45px", minWidth: "180px" }}
                >
                  <Link className="dropdown-item text-white" to="/freelancer-profile">
                    My Profile
                  </Link>
                  <Link className="dropdown-item text-white" to="/dashboard">
                    Dashboard
                  </Link>
                  <Link className="dropdown-item text-white" to="/my-projects">
                    My Projects
                  </Link>
                  <Link className="dropdown-item text-white" to="/messages">
                    Messages
                    {unreadCount > 0 && (
                      <span className="badge bg-danger ms-2">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  <hr className="bg-secondary" />
                  <button
                    onClick={logout}
                    className="btn btn-sm btn-danger w-100"
                  >
                    Logout
                  </button>
                </div>
              )}

            </li>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
