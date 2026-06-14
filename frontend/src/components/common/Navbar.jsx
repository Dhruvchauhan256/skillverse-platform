import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      background: "#0a0f1c",
      color: "white",
      alignItems: "center",
      borderBottom: "1px solid #222"
    }}>

      {/* LOGO */}
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        SkillVerse 🚀
      </div>

      {/* CENTER LINKS */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/find-work" style={{ color: "white" }}>Find Work</Link>
        <Link to="/find-talent" style={{ color: "white" }}>Find Talent</Link>
        <Link to="/jobs" style={{ color: "white" }}>Jobs</Link>
        <Link to="/messages" style={{ color: "white" }}>Messages</Link>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "10px" }}>

        {!token ? (
          <>
            <Link to="/login">
              <button style={btn1}>Login</button>
            </Link>
            <Link to="/signup">
              <button style={btn2}>Join</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/freelancer-profile">
              <button style={btn1}>Profile</button>
            </Link>

            <Link to="/dashboard">
              <button style={btn2}>Dashboard</button>
            </Link>

            <button onClick={logout} style={btn3}>
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

const btn1 = {
  background: "transparent",
  color: "white",
  border: "1px solid white",
  padding: "6px 12px",
  cursor: "pointer"
};

const btn2 = {
  background: "#1dbf73",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer"
};

const btn3 = {
  background: "#ff4d4d",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer"
};

export default Navbar;
