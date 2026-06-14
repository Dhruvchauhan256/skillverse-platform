import React from "react";

function RankingBadge({ score = 0 }) {
  let label = "New Seller";
  let color = "#6c757d";

  if (score >= 80) {
    label = "Top Rated";
    color = "#f1c40f";
  } else if (score >= 50) {
    label = "Level 2";
    color = "#2ecc71";
  } else {
    label = "Level 1";
    color = "#e67e22";
  }

  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "20px",
        background: color,
        color: "white",
        fontSize: "12px",
        fontWeight: "bold"
      }}
    >
      🏆 {label} ({score})
    </span>
  );
}

export default RankingBadge;
