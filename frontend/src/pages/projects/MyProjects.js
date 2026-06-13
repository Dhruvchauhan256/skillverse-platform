import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log("TOKEN:", token);

      const res = await axios.get(
        "http://localhost:5000/api/projects/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "PROJECT RESPONSE:",
        res.data
      );

      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(
        "PROJECT FETCH ERROR:",
        error
      );

      if (error.response) {
        console.log(
          "SERVER RESPONSE:",
          error.response.data
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        My Projects
      </h2>

      {loading ? (
        <h4>Loading...</h4>
      ) : projects.length === 0 ? (
        <div className="alert alert-warning">
          No Projects Found
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="card p-3 mb-3 shadow-sm"
          >
            <h4>{project.title}</h4>

            <p>{project.description}</p>

            <p>
              <strong>Budget:</strong> ₹
              {project.budget}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {project.category}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {project.status}
            </p>

            <p>
              <strong>Project ID:</strong>{" "}
              {project.id}
            </p>

            <div className="mt-3">
              <a
                href="/proposal-management"
                className="btn btn-success me-2"
              >
                View Proposals
              </a>

              <button className="btn btn-warning me-2">
                Edit
              </button>

              <button className="btn btn-danger me-2">
                Delete
              </button>

              <button className="btn btn-secondary">
                Close Project
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyProjects;