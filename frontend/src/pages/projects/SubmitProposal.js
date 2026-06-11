import React, { useState } from "react";
import axios from "axios";

function SubmitProposal() {
  const [formData, setFormData] = useState({
    projectId: "",
    coverLetter: "",
    bidAmount: "",
    deliveryDays: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/proposals",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Proposal Submitted Successfully!");

      console.log(res.data);

      setFormData({
        projectId: "",
        coverLetter: "",
        bidAmount: "",
        deliveryDays: "",
      });

    } catch (error) {
      console.error(error);

      alert("Failed to submit proposal");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Proposal</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Project ID</label>

          <input
            type="text"
            name="projectId"
            className="form-control"
            value={formData.projectId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Cover Letter</label>

          <textarea
            name="coverLetter"
            className="form-control"
            rows="5"
            value={formData.coverLetter}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Bid Amount</label>

          <input
            type="number"
            name="bidAmount"
            className="form-control"
            value={formData.bidAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Delivery Days</label>

          <input
            type="number"
            name="deliveryDays"
            className="form-control"
            value={formData.deliveryDays}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit Proposal
        </button>

      </form>
    </div>
  );
}

export default SubmitProposal;
