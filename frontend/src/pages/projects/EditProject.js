import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function EditProject() {
  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      budget: "",
      category: "",
    });

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      const project =
        res.data.projects.find(
          (p) => p.id === id
        );

      if (project) {
        setFormData(project);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/projects/${id}`,
        {
          title: formData.title,
          description:
            formData.description,
          budget: Number(
            formData.budget
          ),
          category:
            formData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Project Updated Successfully"
      );

      navigate("/my-projects");

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Project</h2>

      <form
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label>
            Title
          </label>

          <input
            type="text"
            name="title"
            className="form-control"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="mb-3">
          <label>
            Description
          </label>

          <textarea
            name="description"
            className="form-control"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="mb-3">
          <label>
            Budget
          </label>

          <input
            type="number"
            name="budget"
            className="form-control"
            value={
              formData.budget
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="mb-3">
          <label>
            Category
          </label>

          <input
            type="text"
            name="category"
            className="form-control"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
          />
        </div>

        <button
          className="btn btn-primary"
        >
          Update Project
        </button>
      </form>
    </div>
  );
}

export default EditProject;
