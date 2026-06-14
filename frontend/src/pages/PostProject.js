import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/projects",
        {
          title: formData.title,
          description: formData.description,
          budget: Number(formData.budget),
          category: formData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Project Posted Successfully 🚀");

      navigate("/my-projects");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h2 className="mb-4">
          🚀 Post a New Project
        </h2>

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
              required
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
              required
            >
              <option value="">
                Select Category
              </option>

              <option>
                Web Development
              </option>

              <option>
                Mobile App
              </option>

              <option>
                UI/UX Design
              </option>

              <option>
                SEO
              </option>

              <option>
                Digital Marketing
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading
              ? "Posting..."
              : "Post Project"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default PostProject;
