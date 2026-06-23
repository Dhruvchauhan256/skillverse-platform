import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import "./ProjectList.css"; // Import the CSS file

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [search, categoryFilter, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("Project")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setProjects(data || []);
      setFilteredProjects(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let temp = [...projects];

    if (search) {
      temp = temp.filter(
        (project) =>
          project.title?.toLowerCase().includes(search.toLowerCase()) ||
          project.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      temp = temp.filter((project) => project.category === categoryFilter);
    }

    setFilteredProjects(temp);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading Projects...</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🚀 Browse Projects</h2>
        <span className="badge bg-success fs-6">
          {filteredProjects.length} Projects
        </span>
      </div>

      {/* Filter Section */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row">
          <div className="col-md-8 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search projects by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="SEO">SEO</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="alert alert-warning">
          No projects found. Try adjusting your search or filters.
        </div>
      ) : (
        filteredProjects.map((project) => (
          <div key={project.id} className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              {/* Title & Budget */}
              <div className="d-flex justify-content-between">
                <h4>{project.title}</h4>
                <span className="badge bg-primary">₹{project.budget}</span>
              </div>

              {/* Category */}
              <p className="text-muted">{project.category}</p>

              {/* Description */}
              <p>{project.description}</p>

              {/* Footer - Status, Client, Button */}
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge bg-success me-2">
                    {project.status}
                  </span>
                  <small className="text-muted">
                    Client ID: {project.clientId}
                  </small>
                </div>

                <a href={`/project/${project.id}`} className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectList;
