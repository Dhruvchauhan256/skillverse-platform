import React, { useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ReviewModal({ projectId, toUserId, onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      setError("Please select a rating");
      return;
    }

    if (!description.trim()) {
      setError("Please write a review");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${API}/api/reviews`,
        {
          projectId,
          toUserId,
          rating,
          title: title || "No title",
          description,
          isAnonymous,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setRating(0);
        setTitle("");
        setDescription("");
        setIsAnonymous(false);
        if (onSuccess) onSuccess(res.data.review);
        onClose();
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "24px",
          borderRadius: "12px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="fw-bold mb-3">Leave a Review</h3>

        {error && <div className="alert alert-danger small">{error}</div>}

        {/* RATING */}
        <div className="mb-3">
          <label className="fw-semibold mb-2">Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} size="lg" />
        </div>

        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Title (Optional)</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., Excellent work!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Your Review *</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Share your experience working with this person..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* ANONYMOUS */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="anonymous">
            Post anonymously
          </label>
        </div>

        {/* BUTTONS */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary flex-grow-1"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;