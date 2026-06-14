import React from "react";

function PostProject() {
  return (
    <div className="container mt-4">
      <h2>Post Project</h2>

      <div className="card p-4">
        <h5>Create New Project</h5>

        <form>
          <div className="mb-3">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter project title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Describe your project"
            />
          </div>

          <button className="btn btn-primary">
            Post Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostProject;
