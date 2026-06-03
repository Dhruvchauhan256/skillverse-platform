import React from "react";

function RecentSearches({ onSelect }) {
  const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];

  if (!recent.length) return null;

  return (
    <div className="mt-3">
      <h6>Recent Searches</h6>

      {recent.map((item, index) => (
        <button
          key={index}
          className="btn btn-sm btn-outline-secondary m-1"
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default RecentSearches;
