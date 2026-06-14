import React, { useState } from "react";

function FreelancerProfile() {
  const [profile, setProfile] = useState({
    name: "Dhruv Chauhan",
    title: "Full Stack Developer | MERN Expert",
    bio: "I build scalable web applications using MERN stack.",
    location: "India",
    hourlyRate: 800,
    isOnline: true,
    skills: ["React", "Node.js", "MongoDB", "Express"],
    rating: 4.8,
    jobsCompleted: 24,
    earnings: 120000,
    responseRate: 98,
  });

  const [editMode, setEditMode] = useState(false);

  const toggleStatus = () => {
    setProfile({
      ...profile,
      isOnline: !profile.isOnline,
    });
  };

  const removeSkill = (skill) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="card p-4 mb-3">
        <div className="d-flex justify-content-between">

          <div className="d-flex gap-3 align-items-center">
            <img
              src="https://via.placeholder.com/90"
              className="rounded-circle"
            />

            <div>
              <h4>{profile.name}</h4>
              <p className="text-muted">{profile.title}</p>

              <span className={`badge ${profile.isOnline ? "bg-success" : "bg-secondary"}`}>
                {profile.isOnline ? "Online" : "Offline"}
              </span>

              <div className="mt-2">
                💰 ₹{profile.hourlyRate}/hr
              </div>
            </div>
          </div>

          <div>
            <button
              className="btn btn-primary me-2"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>

            <button
              className="btn btn-outline-success"
              onClick={toggleStatus}
            >
              Toggle Status
            </button>
          </div>

        </div>
      </div>

      {/* STATS */}
      <div className="row mb-3">

        <div className="col-md-3">
          <div className="card p-3 text-center">
            ⭐ {profile.rating} Rating
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            💰 ₹{profile.earnings.toLocaleString()}
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            ✅ {profile.jobsCompleted} Jobs
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            📩 {profile.responseRate}% Response
          </div>
        </div>

      </div>

      {/* ABOUT */}
      <div className="card p-3 mb-3">
        <h5>About Me</h5>
        <p>{profile.bio}</p>
      </div>

      {/* SKILLS */}
      <div className="card p-3 mb-3">
        <h5>Skills</h5>

        <div className="d-flex flex-wrap gap-2">
          {profile.skills.map((skill, i) => (
            <span
              key={i}
              className="badge bg-primary p-2"
              style={{ cursor: "pointer" }}
              onClick={() => removeSkill(skill)}
            >
              {skill} ❌
            </span>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <div className="card p-3">
        <h5>Portfolio</h5>
        <p className="text-muted">
          Add your projects (GitHub / Live links / Screenshots)
        </p>
      </div>

      {/* EDIT MODAL (simple placeholder) */}
      {editMode && (
        <div className="card p-4 mt-3 border-primary">
          <h5>Edit Profile (Future Upgrade)</h5>
          <p>This will become full backend + form system next step.</p>

          <button
            className="btn btn-danger"
            onClick={() => setEditMode(false)}
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
}

export default FreelancerProfile;
