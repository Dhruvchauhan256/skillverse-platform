import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerCard.css";

function FreelancerCard({ user }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleViewProfile = (e) => {
    e.stopPropagation();
    navigate(`/freelancer/${user.name}`);
  };

  const toggleSave = (e) => {
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <div
      className="freelancer-card"
      onClick={handleViewProfile}
    >
      
      {/* TOP SECTION */}
      <div className="freelancer-top">
        <img
          className="freelancer-avatar"
          src={user.avatar || "https://via.placeholder.com/80"}
          alt={user.name}
        />

        <div className="freelancer-info">
          <h3 className="freelancer-name">{user.name}</h3>
          <p className="freelancer-title">
            {user.title || "Freelancer"}
          </p>

          <div className="freelancer-rating">
            ⭐ {user.rating || 4.5} ({user.reviews || 120})
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          className={`save-btn ${saved ? "active" : ""}`}
          onClick={toggleSave}
        >
          {saved ? "💖" : "🤍"}
        </button>
      </div>

      {/* SKILLS */}
      <div className="freelancer-skills">
        {(user.skills || ["React", "Node.js", "UI/UX"]).map(
          (skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          )
        )}
      </div>

      {/* FOOTER */}
      <div className="freelancer-footer">
        <button
          className="view-btn"
          onClick={handleViewProfile}
        >
          View Profile
        </button>

        <span className="price">
          ${user.hourlyRate || 20}/hr
        </span>
      </div>
    </div>
  );
}

export default FreelancerCard;
