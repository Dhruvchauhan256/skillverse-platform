import React from "react";

function ProfileHeader() {
  return (
    <div className="card p-4 mb-3">
      <div className="d-flex gap-3 align-items-center">

        <img
          src="https://via.placeholder.com/80"
          className="rounded-circle"
          alt="profile"
        />

        <div>
          <h4>Dhruv Chauhan</h4>
          <p className="text-muted">
            Full Stack Developer | MERN Expert
          </p>
          <span className="badge bg-success">
            Online
          </span>
        </div>

      </div>
    </div>
  );
}

export default ProfileHeader;
