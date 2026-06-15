import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FreelancerCard from "../../components/freelancer/FreelancerCard";
import "./CategorySearch.css";

function CategorySearch() {
  const location = useLocation();
  const initialSearch = location.state?.query || 
    new URLSearchParams(location.search).get("q") || "";

  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("rating");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [recentSearches, setRecentSearches] = useState([]);

  const trending = [
    "React Developer",
    "UI Designer",
    "Full Stack",
    "Node.js Expert",
  ];

  const freelancers = [
    {
      name: "John Doe",
      title: "React Developer",
      rating: 4.8,
      reviews: 120,
      hourlyRate: 25,
      skills: ["React", "Node.js"],
    },
    {
      name: "Aman Patel",
      title: "UI Designer",
      rating: 4.5,
      reviews: 80,
      hourlyRate: 18,
      skills: ["Figma", "UI/UX"],
    },
    {
      name: "Sara Khan",
      title: "Full Stack Dev",
      rating: 4.9,
      reviews: 200,
      hourlyRate: 35,
      skills: ["React", "MongoDB", "Node.js"],
    },
  ];

  const recommended = [...freelancers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 2);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim() !== "") {
      const updated = [
        value,
        ...recentSearches.filter((item) => item !== value),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const getScore = (f) => {
    let score = 0;
    score += f.rating * 10;
    score += (f.reviews || 0) * 0.02;
    if (selectedSkill !== "all" && f.skills.includes(selectedSkill)) {
      score += 20;
    }
    if (
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase())
    ) {
      score += 15;
    }
    if (f.hourlyRate >= 15 && f.hourlyRate <= 30) {
      score += 5;
    }
    return score;
  };

  const filtered = freelancers
    .filter((f) => {
      const matchSkill =
        selectedSkill === "all" || f.skills.includes(selectedSkill);
      const matchSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.title.toLowerCase().includes(search.toLowerCase());
      return matchSkill && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return getScore(b) - getScore(a);
      if (sortBy === "price_low") return a.hourlyRate - b.hourlyRate;
      if (sortBy === "price_high") return b.hourlyRate - a.hourlyRate;
      return 0;
    });

  return (
    <div className="category-search-page">

      {/* SEARCH BAR */}
      <div className="search-topbar">
        <input
          type="text"
          placeholder="Search freelancers..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* TRENDING */}
      <div className="trending">
        <span className="trending-label">Trending:</span>
        {trending.map((item, i) => (
          <span
            key={i}
            className="trending-tag"
            onClick={() => handleSearch(item)}
          >
            {item}
          </span>
        ))}
      </div>

      {/* RECENT SEARCHES */}
      {recentSearches.length > 0 && (
        <div className="recent">
          <span className="recent-label">Recent:</span>
          {recentSearches.map((item, i) => (
            <span
              key={i}
              className="recent-tag"
              onClick={() => setSearch(item)}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* RECOMMENDED */}
      {search === "" && (
        <div className="recommended-section">
          <h3>Recommended for you</h3>
          <div className="recommended-grid">
            {recommended.map((user, i) => (
              <FreelancerCard key={i} user={user} />
            ))}
          </div>
        </div>
      )}

      <div className="search-layout">

        {/* SIDEBAR FILTERS */}
        <div className="search-sidebar">
          <h3>Filters</h3>

          <label>Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Top Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>

          <label>Skill</label>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="all">All</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Figma">Figma</option>
            <option value="MongoDB">MongoDB</option>
          </select>
        </div>

        {/* RESULTS */}
        <div className="search-results">
          {filtered.length === 0 ? (
            <div className="no-results">
              <h4>No freelancers found</h4>
              <p>Try a different search or filter.</p>
            </div>
          ) : (
            filtered.map((user, index) => (
              <FreelancerCard key={index} user={user} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default CategorySearch;
