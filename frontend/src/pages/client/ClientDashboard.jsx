import React from "react";
import "./ClientDashboard.css";

function ClientDashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Client Dashboard</h1>
        <button className="post-btn">
          + Post New Project
        </button>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Active Projects</h3>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h3>Total Freelancers</h3>
          <p>37</p>
        </div>

        <div className="stat-card">
          <h3>Pending Proposals</h3>
          <p>15</p>
        </div>

        <div className="stat-card">
          <h3>Total Spend</h3>
          <p>$4,850</p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="dashboard-grid">

        <div className="panel">
          <h3>Recent Projects</h3>

          <div className="project-item">
            <strong>MERN Website Development</strong>
            <p>12 proposals received</p>
          </div>

          <div className="project-item">
            <strong>Mobile App UI Design</strong>
            <p>7 proposals received</p>
          </div>

          <div className="project-item">
            <strong>SEO Optimization</strong>
            <p>5 proposals received</p>
          </div>

        </div>

        <div className="panel">
          <h3>Recent Activity</h3>

          <p>✔ New proposal received</p>
          <p>✔ Freelancer hired</p>
          <p>✔ Project milestone completed</p>
          <p>✔ Payment released</p>
        </div>

      </div>

    </div>
  );
}

export default ClientDashboard;
