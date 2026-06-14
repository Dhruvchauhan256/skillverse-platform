import React from "react";
import { Link } from "react-router-dom";

function MobileNav() {
  return (
    <div className="d-md-none fixed-bottom bg-dark text-white d-flex justify-content-around p-2">

      <Link to="/" className="text-white">🏠</Link>
      <Link to="/find-work" className="text-white">🔍</Link>
      <Link to="/post-project" className="text-white">➕</Link>
      <Link to="/messages" className="text-white">💬</Link>
      <Link to="/freelancer-profile" className="text-white">👤</Link>

    </div>
  );
}

export default MobileNav;