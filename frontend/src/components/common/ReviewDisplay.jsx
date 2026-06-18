import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ReviewDisplay({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [userId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/api/reviews/user/${userId}`);

      if (res.data.success) {
        setReviews(res.data.reviews || []);
        setAvgRating(res.data.averageRating || 0);
      }
    } catch (err) {
      console.log("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-muted small">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="card p-3 mb-3">
        <p className="text-muted mb-0">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="card p-3 mb-3">
      <div className="mb-3 pb-2 border-bottom">
        <h5 className="fw-bold mb-2">Reviews</h5>
        <div className="d-flex align-items-center gap-2">
          <StarRating rating={Number(avgRating)} readOnly size="md" />
          <span className="text-muted small">
            ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
          </span>
        </div>
      </div>

      {reviews.map((review) => (
        <div key={review.id} className="mb-3 pb-3 border-bottom">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 className="fw-bold mb-0">
                {review.isAnonymous ? "Anonymous" : review.fromUser.name}
              </h6>
              <small className="text-muted">
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
            <StarRating rating={review.rating} readOnly size="sm" />
          </div>

          {/* TITLE */}
          {review.title && (
            <h6 className="text-primary mb-1">{review.title}</h6>
          )}

          {/* DESCRIPTION */}
          <p className="mb-0 text-muted small">{review.description}</p>

          {/* PROJECT */}
          {review.project && (
            <small className="text-secondary d-block mt-2">
              For project: <strong>{review.project.title}</strong>
            </small>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewDisplay;