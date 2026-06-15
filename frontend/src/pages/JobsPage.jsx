import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function JobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, category, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API}/api/projects`);
      setJobs(res.data.projects || []);
      setFiltered(res.data.projects || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let temp = [...jobs];

    if (search.trim()) {
      temp = temp.filter(
        (j) =>
          j.title?.toLowerCase().includes(search.toLowerCase()) ||
          j.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      temp = temp.filter((j) => j.category === category);
    }

    setFiltered(temp);
  };

  const handleApply = (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/proposal", { state: { projectId } });
  };

  return (
    <div className="container mt-4 mb-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Browse Jobs & Projects</h2>
        <p className="text-muted">
          Find the perfect project matching your skills
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="card p-3 shadow-sm mb-4 border-0">
        <div className="row g-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search jobs by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select form-select-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="SEO">SEO</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-success w-100 h-100"
              onClick={fetchJobs}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="text-muted mb-0">
          {filtered.length} jobs found
        </h6>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/post-project")}
        >
          + Post a Job
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* JOBS LIST */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
          <p className="mt-3 text-muted">Loading jobs...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="alert alert-warning text-center">
          No jobs found. Try a different search.
        </div>
      ) : (
        filtered.map((job) => (
          <div
            key={job.id}
            className="card p-4 mb-3 shadow-sm border-0"
          >
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div style={{ flex: 1 }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <h5 className="fw-bold mb-0">{job.title}</h5>
                  <span
                    className={`badge ${
                      job.status === "open"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <p className="text-muted mb-3">{job.description}</p>

                <div className="d-flex gap-3 flex-wrap">
                  <span className="text-success fw-bold">
                    💰 ₹{job.budget?.toLocaleString()}
                  </span>
                  <span className="text-muted">
                    📂 {job.category}
                  </span>
                  <span className="text-muted">
                    🕐{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                {job.status === "open" ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleApply(job.id)}
                  >
                    Apply Now
                  </button>
                ) : (
                  <button className="btn btn-secondary" disabled>
                    Closed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JobsPage;
