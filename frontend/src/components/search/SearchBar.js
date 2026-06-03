import React, { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="container my-4">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Search freelancers, skills or projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
