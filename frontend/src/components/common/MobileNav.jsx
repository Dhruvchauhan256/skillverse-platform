import React from "react";
import { Link } from "react-router-dom";

function MobileNav() {
  return (
    <div
      className="d-lg-none position-fixed bottom-0 w-100 bg-dark text-white d-flex justify-content-around py-2 border-top"
      style={{ zIndex: 999 }}
    >

      <Link to="/" className="text-white text-center">
        🏠
        <div style={{ fontSize: "10px" }}>Home</div>
      </Link>

      <Link to="/find-work" className="text-white text-center">
        🔍
        <div style={{ fontSize: "10px" }}>Work</div>
      </Link>

      <Link to="/post-project" className="text-white text-center">
        ➕
        <div style={{ fontSize: "10px" }}>Post</div>
      </Link>

      <Link to="/messages" className="text-white text-center">
        💬
        <div style={{ fontSize: "10px" }}>Chat</div>
      </Link>

      <Link to="/freelancer-profile" className="text-white text-center">
        👤
        <div style={{ fontSize: "10px" }}>Profile</div>
      </Link>

    </div>
  );
}

export default MobileNav;
