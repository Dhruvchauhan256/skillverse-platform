import React, { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="container my-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search freelancers, skills, projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
