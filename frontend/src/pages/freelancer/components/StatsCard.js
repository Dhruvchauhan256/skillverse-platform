import React from "react";

function StatsCard() {
  return (
    <>
      <div className="col-md-3">
        <div className="card p-3 text-center">
          ⭐ 4.8 Rating
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center">
          💰 ₹1.2L Earned
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center">
          ✅ 24 Jobs
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center">
          📩 98% Response
        </div>
      </div>
    </>
  );
}

export default StatsCard;
