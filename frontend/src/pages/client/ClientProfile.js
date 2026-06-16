import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ClientProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  // ---- FETCH USER FROM BACKEND ----
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.user;
      setUser(userData);

      setForm({
        name: userData.name || "",
        email: userData.email || "",
        companyName: userData.clientProfile?.companyName || "",
        description: userData.clientProfile?.description || "",
      });
    } catch (err) {
      console.log(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // ---- FETCH MY PROJECTS ----
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/api/projects/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.projects || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ---- HANDLE FORM CHANGE ----
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---- SAVE PROFILE ----
  const handleSave = async () => {
    try {
      setError("");

      await axios.put(
        `${API}/api/users/client/profile`,
        {
          name: form.name,
          companyName: form.companyName,
          description: form.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update localStorage
      const updatedUser = { ...user, name: form.name };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setEditing(false);
      fetchProfile();
    } catch (err) {
      console.log(err);
      setError("Failed to save profile");
    }
  };

  // ---- STATS ----
  const totalProjects = projects.length;
  const activeProjects = projects.filter(
    (p) => p.status === "open"
  ).length;
  const closedProjects = projects.filter(
    (p) => p.status === "closed"
  ).length;
  const totalBudget = projects.reduce(
    (sum, p) => sum + (p.budget || 0), 0
  );

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3 text-muted">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* PROFILE HEADER CARD */}
      <div className="card p-4 shadow-sm border-0 mb-4">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

          {/* LEFT — AVATAR + INFO */}
          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1dbf73, #0f172a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                color: "white",
                fontWeight: "800",
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "C"}
            </div>

            <div>
              <h4 className="fw-bold mb-1">
                {user?.name || "Client"}
              </h4>
              <p className="text-muted mb-1">
                {user?.email}
              </p>
              <span className="badge bg-primary">
                {user?.role?.toUpperCase() || "CLIENT"}
              </span>
              {user?.clientProfile?.companyName && (
                <p className="text-muted small mb-0 mt-1">
                  🏢 {user.clientProfile.companyName}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT — EDIT BUTTON */}
          <button
            className="btn btn-outline-primary"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* EDIT FORM */}
        {editing && (
          <div className="mt-4 border-top pt-4">
            <h6 className="fw-bold mb-3">Edit Profile</h6>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  disabled
                />
                <small className="text-muted">
                  Email cannot be changed
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  className="form-control"
                  placeholder="Your company name"
                  value={form.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Tell freelancers about your company..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="btn btn-success mt-3"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}

        {/* DESCRIPTION — show when not editing */}
        {!editing && user?.clientProfile?.description && (
          <div className="mt-3 border-top pt-3">
            <p className="text-muted mb-0">
              {user.clientProfile.description}
            </p>
          </div>
        )}
      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card p-3 text-center border-0 shadow-sm">
            <h2 className="fw-bold text-primary">{totalProjects}</h2>
            <p className="text-muted mb-0">Total Projects</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 text-center border-0 shadow-sm">
            <h2 className="fw-bold text-success">{activeProjects}</h2>
            <p className="text-muted mb-0">Active Projects</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 text-center border-0 shadow-sm">
            <h2 className="fw-bold text-secondary">{closedProjects}</h2>
            <p className="text-muted mb-0">Closed Projects</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 text-center border-0 shadow-sm">
            <h2 className="fw-bold text-warning">
              ₹{totalBudget.toLocaleString()}
            </h2>
            <p className="text-muted mb-0">Total Budget</p>
          </div>
        </div>
      </div>

      {/* RECENT PROJECTS */}
      <div className="card p-4 shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Recent Projects</h5>
          <button
            className="btn btn-success btn-sm"
            onClick={() => navigate("/post-project")}
          >
            + Post Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted mb-3">
              No projects posted yet.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/post-project")}
            >
              Post Your First Project
            </button>
          </div>
        ) : (
          projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              className="d-flex justify-content-between
                align-items-center border-bottom py-3"
            >
              <div>
                <h6 className="fw-bold mb-1">
                  {project.title}
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">
                    ₹{project.budget?.toLocaleString()}
                  </span>
                  <span className="badge bg-secondary">
                    {project.category}
                  </span>
                  <span
                    className={`badge ${
                      project.status === "open"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  navigate("/proposal-management", {
                    state: { projectId: project.id },
                  })
                }
              >
                View Proposals
              </button>
            </div>
          ))
        )}

        {projects.length > 5 && (
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate("/my-projects")}
            >
              View All Projects →
            </button>
          </div>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="card p-4 shadow-sm border-0 mt-4">
        <h5 className="fw-bold mb-3">Quick Actions</h5>
        <div className="d-flex gap-3 flex-wrap">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/post-project")}
          >
            Post Project
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate("/freelancers")}
          >
            Find Freelancers
          </button>
          <button
            className="btn btn-dark"
            onClick={() => navigate("/messages")}
          >
            Messages
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/client-dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>

    </div>
  );
}

export default ClientProfile;
