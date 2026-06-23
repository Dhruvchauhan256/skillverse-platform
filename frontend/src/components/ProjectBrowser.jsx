import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProjectBrowser() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    minBudget: "",
    maxBudget: "",
    search: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.minBudget) params.append("minBudget", filters.minBudget);
      if (filters.maxBudget) params.append("maxBudget", filters.maxBudget);
      if (filters.search) params.append("search", filters.search);

      const response = await axios.get(`/api/projects?${params}`);
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <form onSubmit={handleSearch} className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
        <h2 className="text-xl font-bold">Filter Projects</h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search projects..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="content">Content</option>
            <option value="marketing">Marketing</option>
          </select>

          <input
            type="number"
            name="minBudget"
            value={filters.minBudget}
            onChange={handleFilterChange}
            placeholder="Min Budget"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No projects found</div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-400 cursor-pointer transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{project.budget}</p>
                  <p className="text-xs text-gray-500">{project.proposals.length} proposals</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>

              <div className="flex items-center gap-3">
                {project.client.avatarUrl && (
                  <img
                    src={project.client.avatarUrl}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-gray-600">{project.client.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}