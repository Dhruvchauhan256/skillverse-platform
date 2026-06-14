import React, { useState } from "react";

function PostProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Project Created Successfully 🚀");

    console.log({
      title,
      description,
      budget,
    });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">

        <h2 className="mb-4">
          Post New Project
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Project Title
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              rows="5"
              placeholder="Describe your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Budget (₹)
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="5000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
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
