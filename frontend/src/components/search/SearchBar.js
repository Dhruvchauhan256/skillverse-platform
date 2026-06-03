import React, { useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import RecentSearches from "./RecentSearches";
import SavedSearches from "./SavedSearches";
import TrendingSkills from "./TrendingSkills";

function SearchBar() {
  const [query, setQuery] = useState("");

  const suggestions = [
    "React Developer",
    "UI/UX Designer",
    "Node.js Developer",
    "Full Stack Developer",
    "Logo Designer",
  ].filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (value) => {
    setQuery(value);

    // Save recent searches
    const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
    if (!recent.includes(value)) {
      recent.unshift(value);
      localStorage.setItem("recentSearches", JSON.stringify(recent.slice(0, 5)));
    }
  };

  const saveSearch = () => {
    const saved = JSON.parse(localStorage.getItem("savedSearches")) || [];
    if (!saved.includes(query)) {
      saved.push(query);
      localStorage.setItem("savedSearches", JSON.stringify(saved));
    }
    alert("Search Saved!");
  };

  return (
    <div className="container position-relative my-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search freelancers, skills, projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="btn btn-primary" onClick={() => handleSearch(query)}>
          Search
        </button>

        <button className="btn btn-outline-success" onClick={saveSearch}>
          ⭐ Save
        </button>
      </div>

      {/* Suggestions */}
      <SearchSuggestions
        suggestions={suggestions}
        onSelect={handleSearch}
      />

      {/* Extras */}
      <RecentSearches onSelect={handleSearch} />
      <SavedSearches onSelect={handleSearch} />
      <TrendingSkills onSelect={handleSearch} />
    </div>
  );
}

export default SearchBar;
