import React from "react";

function FreelancerCard({ user }) {
  return (
    <div className="card p-3 shadow-sm mb-3">
      <div className="d-flex justify-content-between">
        <h5>{user.name}</h5>
        <span>⭐ {user.rating}</span>
      </div>

      <p className="text-muted">{user.role}</p>

      <div className="mb-2">
        {user.skills.map((skill, i) => (
          <span key={i} className="badge bg-primary me-1">
            {skill}
          </span>
        ))}
      </div>

      <button className="btn btn-sm btn-dark">
        View Profile
      </button>
    </div>
  );
}

export default FreelancerCard;
