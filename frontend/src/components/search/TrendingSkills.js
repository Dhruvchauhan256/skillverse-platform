import React from "react";

function TrendingSkills({ onSelect }) {
  const trending = [
    "React Developer",
    "UI/UX Designer",
    "Node.js Developer",
    "Python Developer",
    "Video Editor",
    "SEO Expert",
  ];

  return (
    <div className="mt-3">
      <h6>🔥 Trending Skills</h6>

      {trending.map((item, index) => (
        <button
          key={index}
          className="btn btn-sm btn-warning m-1"
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default TrendingSkills;
