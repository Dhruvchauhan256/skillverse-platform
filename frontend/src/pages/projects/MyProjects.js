import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyProjects() {
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

      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Deleted Successfully");

      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const closeProject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/close/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Closed");

      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Close Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Projects</h2>

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

            <div className="mt-3">

              <Link
                to={`/edit-project/${project.id}`}
                className="btn btn-warning me-2"
              >
                Edit
              </Link>

              <button
                className="btn btn-danger me-2"
                onClick={() =>
                  deleteProject(project.id)
                }
              >
                Delete
              </button>

              {project.status !== "closed" && (
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    closeProject(project.id)
                  }
                >
                  Close Project
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyProjects;
