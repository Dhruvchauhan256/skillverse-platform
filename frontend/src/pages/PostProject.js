import React, { useState } from "react";

function PostProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Project Data:", formData);

    alert("Project submitted successfully!");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-4">🚀 Post a New Project</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Budget (₹)
            </label>
            <input
              type="number"
              name="budget"
              className="form-control"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Category
            </label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>UI/UX Design</option>
              <option>SEO</option>
              <option>Digital Marketing</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success"
          >
            Post Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostProject;
