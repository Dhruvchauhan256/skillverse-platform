import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function SubmitProposal() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectId: location.state?.projectId || "",
    coverLetter: "",
    bidAmount: "",
    deliveryDays: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.projectId.trim() ||
      !form.coverLetter.trim() ||
      !form.bidAmount ||
      !form.deliveryDays
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        projectId: form.projectId,
        coverLetter: form.coverLetter,
        bidAmount: Number(form.bidAmount),
        deliveryDays: Number(form.deliveryDays),
      };

      await axios.post(
        `${API}/api/proposals`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Proposal Submitted Successfully!");

      setTimeout(() => {
        navigate("/find-work");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || "Proposal Submission Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <h2 className="mb-4 text-center">Submit Proposal</h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="alert alert-success">{success}</div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Project ID</label>
            <input
              type="text"
              name="projectId"
              className="form-control"
              value={form.projectId}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cover Letter</label>
            <textarea
              name="coverLetter"
              rows="5"
              className="form-control"
              placeholder="Describe why you are the best fit for this project..."
              value={form.coverLetter}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Bid Amount (₹)</label>
            <input
              type="number"
              name="bidAmount"
              className="form-control"
              placeholder="25000"
              value={form.bidAmount}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Delivery Days</label>
            <input
              type="number"
              name="deliveryDays"
              className="form-control"
              placeholder="15"
              value={form.deliveryDays}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Proposal"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default SubmitProposal;
