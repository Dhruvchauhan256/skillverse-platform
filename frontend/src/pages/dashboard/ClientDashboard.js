import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClientDashboard.css"; // Import the CSS file

function ClientDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalProjects = projects.length;
  const activeProjects = projects.filter(
    (project) => project.status === "open"
  ).length;
  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  ).length;

  // Function to get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case "open":
        return "status-open";
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-in-progress";
      case "closed":
        return "status-closed";
      default:
        return "status-open";
    }
  };

  return (
    <div className="container mt-5">
      <h1>Client Dashboard</h1>

      {/* Stats Cards Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Total Projects</h5>
            <h2>{totalProjects}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Active Projects</h5>
            <h2>{activeProjects}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Completed Projects</h5>
            <h2>{completedProjects}</h2>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="card p-4 shadow-sm mb-4">
        <h4 className="mb-3">Quick Actions</h4>
        <div className="d-flex gap-3">
          <a href="/post-project" className="btn btn-primary">
            Post Project
          </a>
          <a href="/proposal-management" className="btn btn-success">
            Manage Proposals
          </a>
          <a href="/messages" className="btn btn-dark">
            Messages
          </a>
        </div>
      </div>

      {/* My Projects Section */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">My Projects</h4>
        {loading ? (
          <h5>Loading...</h5>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border rounded p-3 mb-3">
              <div className="d-flex" style={{ justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ flex: 1 }}>
                  <h5>{project.title}</h5>
                  <p>{project.description}</p>
                  <p>
                    <strong>Budget:</strong> ₹{project.budget}
                  </p>
                  <p>
                    <strong>Category:</strong> {project.category}
                  </p>
                </div>
                <span className={`status-badge ${getStatusClass(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <small>{new Date(project.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClientDashboard;
