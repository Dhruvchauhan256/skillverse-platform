import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FreelancerDashboard.css"; // Import the CSS file

function FreelancerDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/profile/freelancer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data.profile);
      console.log("PROFILE DATA:", res.data);
    } catch (error) {
      console.log("PROFILE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Freelancer Profile Section */}
      {user ? (
        <div className="panel mb-4">
          <h2>{user.title}</h2>
          <p>
            <strong>Country:</strong> {user.country}
          </p>
          <p>
            <strong>Skills:</strong> {user.skills}
          </p>
          <p>
            <strong>Hourly Rate:</strong> ₹{user.hourlyRate}/hr
          </p>
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
        </div>
      ) : (
        <div className="alert alert-warning">
          Freelancer profile not created yet. <a href="/setup-profile">Create Profile</a>
        </div>
      )}

      {/* Stats Grid Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p>₹0</p>
        </div>
        <div className="stat-card">
          <h3>Active Proposals</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Completed Jobs</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Profile Views</h3>
          <p>0</p>
        </div>
      </div>

      {/* Dashboard Grid Section */}
      <div className="dashboard-grid">
        {/* Recent Activity Panel */}
        <div className="panel">
          <h3>Recent Activity</h3>
          <p>Dashboard Connected Successfully</p>
          <p>Freelancer Profile Loaded</p>
          <p>SkillVerse Backend Connected</p>
        </div>

        {/* Profile Completion Panel */}
        <div className="panel">
          <h3>Profile Completion</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: "80%",
              }}
            ></div>
          </div>
          <p>80% Complete</p>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboard;
