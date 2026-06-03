import React from "react";

function SearchSuggestions({ suggestions, onSelect }) {
  if (!suggestions.length) return null;

  return (
    <div className="list-group position-absolute w-100 shadow-sm">
      {suggestions.map((item, index) => (
        <button
          key={index}
          className="list-group-item list-group-item-action"
          onClick={() => onSelect(item)}
        >
          🔍 {item}
        </button>
      ))}
    </div>
  );
}

export default SearchSuggestions;
