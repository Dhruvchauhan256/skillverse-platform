import React from "react";

function SavedSearches({ onSelect }) {
  const saved = JSON.parse(localStorage.getItem("savedSearches")) || [];

  return (
    <div className="mt-3">
      <h6>Saved Searches</h6>

      {saved.length === 0 ? (
        <p className="text-muted">No saved searches</p>
      ) : (
        saved.map((item, index) => (
          <button
            key={index}
            className="btn btn-sm btn-primary m-1"
            onClick={() => onSelect(item)}
          >
            ⭐ {item}
          </button>
        ))
      )}
    </div>
  );
}

export default SavedSearches;
