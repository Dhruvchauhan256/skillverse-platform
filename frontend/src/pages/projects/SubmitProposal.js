import React, { useState } from "react";
import axios from "axios";

function SubmitProposal() {
  const [form, setForm] = useState({
    projectId: "",
    coverLetter: "",
    bidAmount: "",
    deliveryDays: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/proposals",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Proposal Submitted Successfully ✅");

      console.log(res.data);

      setForm({
        projectId: "",
        coverLetter: "",
        bidAmount: "",
        deliveryDays: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Submission Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Proposal</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="projectId"
          placeholder="Project ID"
          className="form-control mb-3"
          value={form.projectId}
          onChange={handleChange}
        />

        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          className="form-control mb-3"
          value={form.coverLetter}
          onChange={handleChange}
        />

        <input
          type="number"
          name="bidAmount"
          placeholder="Bid Amount"
          className="form-control mb-3"
          value={form.bidAmount}
          onChange={handleChange}
        />

        <input
          type="number"
          name="deliveryDays"
          placeholder="Delivery Days"
          className="form-control mb-3"
          value={form.deliveryDays}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Submit Proposal
        </button>
      </form>
    </div>
  );
}

export default SubmitProposal;