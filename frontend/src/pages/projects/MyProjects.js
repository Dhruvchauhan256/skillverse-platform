import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

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
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="card p-3 mb-3"
          >
            <h4>{project.title}</h4>

            <p>{project.description}</p>

            <p>Budget: ₹{project.budget}</p>

            <p>Status: {project.status}</p>

            <a
              href={`/proposal-management?projectId=${project.id}`}
              className="btn btn-success"
            >
              View Proposals
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default MyProjects;
