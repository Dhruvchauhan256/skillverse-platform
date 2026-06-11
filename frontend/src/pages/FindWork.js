import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FindWork.css";

function FindWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      setProjects(res.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="findwork-page">

      <section className="findwork-hero">
        <h1>Find Work Opportunities</h1>

        <p>
          Discover projects from startups, businesses and
          clients across India.
        </p>

        <div className="findwork-search">
          <input
            type="text"
            placeholder="Search projects..."
          />
          <button>Search</button>
        </div>
      </section>

      <section className="projects-section">
        <h2>Latest Projects</h2>

        {loading ? (
          <h3>Loading Projects...</h3>
        ) : (
          <div className="projects-grid">

            {projects.map((project) => (
              <div
                className="project-card"
                key={project.id}
              >
                <h3>{project.title}</h3>

                <p>
                  {project.description}
                </p>

                <p className="budget">
                  💰 ₹{project.budget}
                </p>

                <p>
                  📂 {project.category}
                </p>

                <p>
                  📌 {project.status}
                </p>

                <button className="apply-btn">
                  Apply Now
                </button>
              </div>
            ))}

          </div>
        )}
      </section>

    </div>
  );
}

export default FindWork;
