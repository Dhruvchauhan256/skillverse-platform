import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  // Generate avatar URL from user initials
  const getAvatarUrl = (userName, size = 32) => {
    if (!userName) return `https://ui-avatars.com/api/?name=User&background=1dbf73&color=fff&size=${size}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1dbf73&color=fff&size=${size}`;
  };

  // Fetch unread messages count
  const fetchUnreadCount = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API}/api/messages/unread/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadCount(res.data.count || 0);
    } catch (err) {
      console.log("Failed to fetch unread count");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [token, fetchUnreadCount]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const isFreelancer = user?.role === "freelancer";
  const isClient = user?.role === "client";

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">SkillVerse</span>
        </Link>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAVBAR CONTENT */}
        <div className={`navbar-content ${menuOpen ? "active" : ""}`}>
          {/* MAIN LINKS */}
          <div className="navbar-links">
            {!token ? (
              <>
                <Link to="/find-work" className="nav-link">
                  Find Work
                </Link>
                <Link to="/find-talent" className="nav-link">
                  Find Talent
                </Link>
              </>
            ) : (
              <>
                {isFreelancer && (
                  <>
                    <Link to="/find-work" className="nav-link">
                      📋 Find Work
                    </Link>
                    <Link to="/my-proposals" className="nav-link">
                      📝 Proposals
                    </Link>
                  </>
                )}

                {isClient && (
                  <>
                    <Link to="/find-talent" className="nav-link">
                      🔍 Find Talent
                    </Link>
                    <Link to="/my-projects" className="nav-link">
                      📊 My Projects
                    </Link>
                  </>
                )}

                <Link to="/messages" className="nav-link messages-link">
                  💬 Messages
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* SEARCH BAR */}
          {token && (
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search freelancers, projects, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>
          )}

          {/* RIGHT SIDE */}
          <div className="navbar-right">
            {!token ? (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-btn signup-btn">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {/* POST JOB / POST GIG BUTTON */}
                {isClient && (
                  <Link to="/post-project" className="nav-btn post-btn">
                    ➕ Post a Project
                  </Link>
                )}

                {isFreelancer && (
                  <Link to="/freelancer-profile" className="nav-btn post-btn">
                    ➕ Edit Profile
                  </Link>
                )}

                {/* NOTIFICATION BELL */}
                <div className="notification-container">
                  <button
                    className="notification-bell"
                    onClick={() => navigate("/messages")}
                    title="Messages"
                  >
                    🔔
                    {unreadCount > 0 && (
                      <span className="bell-badge">{unreadCount}</span>
                    )}
                  </button>
                </div>

                {/* USER DROPDOWN */}
                <div className="user-dropdown">
                  <button
                    className="user-btn"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <img
                      src={user?.avatar || getAvatarUrl(user?.name, 32)}
                      alt={user?.name || "User"}
                      className="user-avatar"
                      onError={(e) => {
                        e.target.src = getAvatarUrl(user?.name, 32);
                      }}
                    />
                    <span className="user-name">{user?.name || "User"}</span>
                    <span className="dropdown-icon">▼</span>
                  </button>

                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      {/* PROFILE SECTION */}
                      <div className="dropdown-header">
                        <div className="user-info">
                          <img
                            src={user?.avatar || getAvatarUrl(user?.name, 40)}
                            alt={user?.name || "User"}
                            className="user-avatar-lg"
                            onError={(e) => {
                              e.target.src = getAvatarUrl(user?.name, 40);
                            }}
                          />
                          <div>
                            <p className="user-name-large">{user?.name}</p>
                            <p className="user-role">
                              {isFreelancer ? "💼 Freelancer" : "🎯 Client"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <hr className="dropdown-divider" />

                      {/* MENU ITEMS */}
                      <Link
                        to={
                          isFreelancer
                            ? "/freelancer-profile"
                            : "/client-profile"
                        }
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        👤 View Profile
                      </Link>

                      <Link
                        to={
                          isFreelancer
                            ? "/dashboard"
                            : "/client-dashboard"
                        }
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        📈 Dashboard
                      </Link>

                      <Link
                        to="/messages"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        💬 Messages{" "}
                        {unreadCount > 0 && (
                          <span className="badge">{unreadCount}</span>
                        )}
                      </Link>

                      {isFreelancer && (
                        <>
                          <Link
                            to="/my-proposals"
                            className="dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            📝 My Proposals
                          </Link>

                          <Link
                            to="/my-projects"
                            className="dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            📊 Active Projects
                          </Link>
                        </>
                      )}

                      {isClient && (
                        <>
                          <Link
                            to="/my-projects"
                            className="dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            📊 My Projects
                          </Link>

                          <Link
                            to="/proposal-management"
                            className="dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            📋 Manage Proposals
                          </Link>
                        </>
                      )}

                      <hr className="dropdown-divider" />

                      {/* SETTINGS & LOGOUT */}
                      <a href="#" className="dropdown-item">
                        ⚙️ Settings
                      </a>

                      <a href="#" className="dropdown-item">
                        ❓ Help & Support
                      </a>

                      <hr className="dropdown-divider" />

                      <button
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;