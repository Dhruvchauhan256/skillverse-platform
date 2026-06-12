import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    console.log(
      "FIELD:",
      e.target.name,
      "VALUE:",
      e.target.value
    );

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FULL FORM:", form);

    if (
      form.projectId.trim() === "" ||
      form.coverLetter.trim() === "" ||
      form.bidAmount === "" ||
      form.deliveryDays === ""
    ) {
      alert("Please fill all fields");
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

      console.log("SENDING:", payload);

      const res = await axios.post(
        "http://localhost:5000/api/proposals",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PROPOSAL RESPONSE:", res.data);

      alert("Proposal Submitted Successfully ✅");

      navigate("/find-work");
    } catch (error) {
      console.log("ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Proposal Submission Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h2 className="mb-4 text-center">
          Submit Proposal
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Project ID
            </label>

            <input
              type="text"
              name="projectId"
              className="form-control"
              value={form.projectId}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Cover Letter
            </label>

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
            <label className="form-label">
              Bid Amount (₹)
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="25000"
              value={form.bidAmount}
              onChange={(e) => {
                console.log("BID:", e.target.value);

                setForm((prev) => ({
                  ...prev,
                  bidAmount: e.target.value,
                }));
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Delivery Days
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="15"
              value={form.deliveryDays}
              onChange={(e) => {
                console.log("DAYS:", e.target.value);

                setForm((prev) => ({
                  ...prev,
                  deliveryDays: e.target.value,
                }));
              }}
            />
          </div>

          <div
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <strong>Live Form State:</strong>

            <pre>
              {JSON.stringify(form, null, 2)}
            </pre>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Proposal"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitProposal;