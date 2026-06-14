import React, { useState } from "react";
import axios from "axios";

function PostProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        category: formData.category,
      };

      console.log("SENDING PROJECT:", payload);

      const res = await axios.post(
        "http://localhost:5000/api/projects",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PROJECT CREATED:", res.data);

      alert("Project Created Successfully 🚀");

      setFormData({
        title: "",
        description: "",
        budget: "",
        category: "",
      });

    } catch (error) {
      console.log("PROJECT ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Project Creation Failed"
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

          <div className="mb-4">
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

              <option value="Web Development">
                Web Development
              </option>

              <option value="Mobile App">
                Mobile App
              </option>

              <option value="UI/UX Design">
                UI/UX Design
              </option>

              <option value="SEO">
                SEO
              </option>

              <option value="Digital Marketing">
                Digital Marketing
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading
              ? "Creating Project..."
              : "Post Project"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default PostProject;