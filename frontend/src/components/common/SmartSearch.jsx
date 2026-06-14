import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const trending = [
  "React Developer",
  "Node.js Expert",
  "UI/UX Design",
  "MongoDB Specialist",
  "Full Stack Developer"
];

function SmartSearch() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    setShow(true);
  };

  const submitSearch = (text) => {
    navigate(`/search?q=${text}`);
    setShow(false);
  };

  return (
    <div className="position-relative w-100" style={{ maxWidth: "400px" }}>

      <input
        className="form-control"
        placeholder="Search freelancers, jobs..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShow(true)}
      />

      {/* DROPDOWN */}
      {show && (
        <div
          className="position-absolute bg-white shadow rounded p-2 w-100"
          style={{ zIndex: 1000 }}
        >

          {query.length > 0 ? (
            <div>
              <div
                className="p-2 hover-bg"
                onClick={() => submitSearch(query)}
              >
                🔍 Search "{query}"
              </div>
            </div>
          ) : (
            <>
              <small className="text-muted">Trending</small>
              {trending.map((item, i) => (
                <div
                  key={i}
                  className="p-2 hover-bg"
                  onClick={() => submitSearch(item)}
                >
                  🔥 {item}
                </div>
              ))}
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default SmartSearch;