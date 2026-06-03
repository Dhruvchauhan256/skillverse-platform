import React from "react";

function SavedSearches() {
  const searches = [
    "React Developer",
    "Node.js Developer",
    "Logo Designer",
    "SEO Expert",
  ];

  return (
    <div className="card p-3 mt-4">
      <h5>Saved Searches</h5>

      {searches.map((search, index) => (
        <button
          key={index}
          className="btn btn-outline-secondary w-100 mb-2"
        >
          {search}
        </button>
      ))}
    </div>
  );
}

export default SavedSearches;
