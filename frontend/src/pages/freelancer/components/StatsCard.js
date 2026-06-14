import React from "react";

function StatsCard({ profile }) {
  return (
    <div className="row g-3 mt-3">

      <div className="col-md-3">
        <div className="card p-3 text-center shadow-sm">
          <h6>⭐ Rating</h6>
          <h4>{profile?.rating || 0}</h4>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center shadow-sm">
          <h6>💰 Earnings</h6>
          <h4>₹{profile?.earnings || 0}</h4>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center shadow-sm">
          <h6>✅ Jobs</h6>
          <h4>{profile?.jobs_completed || 0}</h4>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center shadow-sm">
          <h6>📩 Response</h6>
          <h4>{profile?.response_rate || 0}%</h4>
        </div>
      </div>

    </div>
  );
}

export default StatsCard;
