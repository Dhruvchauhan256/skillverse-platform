import React from "react";
import { Link } from "react-router-dom";

function FreelancerDropdown({ user }) {
  return (
    <div className="p-3" style={{ width: "260px" }}>

      <h6 className="mb-2">{user?.name}</h6>

      <div className="small text-muted">
        Freelancer
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <span>⭐ Rating</span>
        <b>{user?.rating || 0}</b>
      </div>

      <div className="d-flex justify-content-between">
        <span>💰 Earnings</span>
        <b>₹{user?.earnings || 0}</b>
      </div>

      <div className="d-flex justify-content-between">
        <span>📦 Jobs</span>
        <b>{user?.jobs_completed || 0}</b>
      </div>

      <hr />

      <Link to="/freelancer-profile" className="btn btn-sm btn-primary w-100">
        View Profile
      </Link>
    </div>
  );
}

export default FreelancerDropdown;