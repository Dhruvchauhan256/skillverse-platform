import React from "react";

function ProfileHeader({ profile, onEdit }) {
  return (
    <div className="card p-4 d-flex flex-row justify-content-between align-items-center shadow-sm">

      {/* LEFT SIDE */}
      <div className="d-flex gap-3 align-items-center">

        <img
          src={profile?.avatar_url || "https://via.placeholder.com/80"}
          width="85"
          height="85"
          className="rounded-circle border"
          alt="avatar"
        />

        <div>

          <h4 className="mb-1">
            {profile?.name || "Freelancer"}
          </h4>

          <p className="text-muted mb-1">
            {profile?.title || "No title set"}
          </p>

          {/* ONLINE STATUS */}
          <span className="d-flex align-items-center gap-2">
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: profile?.is_online ? "green" : "gray"
              }}
            />
            {profile?.is_online ? "Online" : "Offline"}
          </span>

          <div className="mt-2 fw-bold">
            💰 ₹{profile?.hourly_rate || 0}/hr
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <button className="btn btn-primary" onClick={onEdit}>
        Edit Profile
      </button>

    </div>
  );
}

export default ProfileHeader;
