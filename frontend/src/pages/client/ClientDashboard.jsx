import React from "react";
import "./ClientDashboard.css";

function ClientDashboard() {
  return (
    <div className="client-dashboard">

      <div className="dashboard-header">
        <h1>Client Dashboard</h1>
        <button className="post-btn">
          + Post New Project
        </button>
      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>12</h2>
          <p>Total Projects</p>
        </div>

        <div className="stat-card">
          <h2>4</h2>
          <p>Active Projects</p>
        </div>

        <div className="stat-card">
          <h2>17</h2>
          <p>Pending Proposals</p>
        </div>

        <div className="stat-card">
          <h2>3</h2>
          <p>Hired Freelancers</p>
        </div>

      </div>

      {/* PROJECTS */}

      <div className="dashboard-section">
        <h2>My Projects</h2>

        <div className="project-item">
          Build MERN SaaS Dashboard
        </div>

        <div className="project-item">
          E-Commerce Website Development
        </div>

        <div className="project-item">
          SEO Marketing Campaign
        </div>
      </div>

      {/* PROPOSALS */}

      <div className="dashboard-section">
        <h2>Received Proposals</h2>

        <div className="proposal-item">
          Rahul Sharma submitted a proposal
        </div>

        <div className="proposal-item">
          Priya Patel submitted a proposal
        </div>

        <div className="proposal-item">
          Amit Kumar submitted a proposal
        </div>
      </div>

      {/* SAVED */}

      <div className="dashboard-section">
        <h2>Saved Freelancers</h2>

        <div className="saved-item">
          React Developer
        </div>

        <div className="saved-item">
          UI/UX Designer
        </div>

        <div className="saved-item">
          SEO Expert
        </div>
      </div>

      {/* MESSAGES */}

      <div className="dashboard-section">
        <h2>Recent Messages</h2>

        <div className="message-item">
          New message from freelancer
        </div>

        <div className="message-item">
          Project update received
        </div>
      </div>

    </div>
  );
}

export default ClientDashboard;
