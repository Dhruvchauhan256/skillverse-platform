import React, { useState } from "react";
import axios from "axios";

export default function CreateProject({ onProjectCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "development",
    budget: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.budget || !formData.deadline) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/projects", formData);
      alert("Project created successfully!");
      onProjectCreated(response.data);
      setFormData({
        title: "",
        description: "",
        category: "development",
        budget: "",
        deadline: "",
      });
    } catch (error) {
      alert("Failed: " + error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Post a Project</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g., Build a React Dashboard"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the project in detail..."
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="content">Content Writing</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Budget (₹)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="5000"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Post Project"}
        </button>
      </div>
    </form>
  );
}