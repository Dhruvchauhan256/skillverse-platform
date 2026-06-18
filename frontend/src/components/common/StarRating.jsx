import React from "react";

function StarRating({ rating, onRatingChange, readOnly = false, size = "md" }) {
  const sizeClasses = {
    sm: "font-size: 16px;",
    md: "font-size: 24px;",
    lg: "font-size: 32px;",
  };

  const handleStarClick = (star) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(star);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{
            cursor: readOnly ? "default" : "pointer",
            color: star <= rating ? "#ffc107" : "#ddd",
            fontSize: size === "sm" ? "16px" : size === "lg" ? "32px" : "24px",
            transition: "0.2s",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            if (!readOnly) {
              e.target.style.color = "#ffb300";
              e.target.style.transform = "scale(1.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (!readOnly) {
              e.target.style.color = star <= rating ? "#ffc107" : "#ddd";
              e.target.style.transform = "scale(1)";
            }
          }}
        >
          ★
        </span>
      ))}
      {rating > 0 && (
        <span
          style={{
            marginLeft: "8px",
            fontWeight: "bold",
            color: "#333",
            fontSize: "14px",
          }}
        >
          {rating.toFixed(1)} / 5.0
        </span>
      )}
    </div>
  );
}

export default StarRating;