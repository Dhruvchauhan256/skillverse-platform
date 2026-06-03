import React, { useState, useEffect } from "react";
import FreelancerCard from "../../components/freelancer/FreelancerCard";
import "./CategorySearch.css";

function CategorySearch() {
  const [sortBy, setSortBy] = useState("rating");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [search, setSearch] = useState("");
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

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);

  // Save search to recent
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

  // FILTER LOGIC (SEARCH + SKILL)
  let filtered = freelancers
  .filter((f) => {
    const matchSkill =
      selectedSkill === "all" || f.skills.includes(selectedSkill);

    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase());

    return matchSkill && matchSearch;
  })
  .sort((a, b) => getScore(b) - getScore(a));

  // SORTING LOGIC (UPWORK STYLE)
  if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "price_low") {
    filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
  } else if (sortBy === "price_high") {
    filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
  }

  const getScore = (f) => {
  let score = 0;

  // rating weight (MOST IMPORTANT)
  score += f.rating * 10;

  // reviews weight
  score += (f.reviews || 0) * 0.02;

  // skill match boost
  if (selectedSkill !== "all" && f.skills.includes(selectedSkill)) {
    score += 20;
  }

  // search relevance boost
  if (
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.title.toLowerCase().includes(search.toLowerCase())
  ) {
    score += 15;
  }

  // price balance (prefer mid-range freelancers slightly)
  if (f.hourlyRate >= 15 && f.hourlyRate <= 30) {
    score += 5;
  }

  return score;
};
  
  return (
    <div>

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
        {trending.map((item, i) => (
          <span key={i} onClick={() => handleSearch(item)}>
            {item}
          </span>
        ))}
      </div>

      {/* RECENT SEARCHES */}
      {recentSearches.length > 0 && (
        <div className="recent">
          {recentSearches.map((item, i) => (
            <span key={i} onClick={() => setSearch(item)}>
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="search-layout">

        {/* SIDEBAR FILTER */}
        <div className="search-sidebar">
          <h3>Filters</h3>

          <label>Sort By</label>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Top Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>

          <label>Skill</label>
          <select onChange={(e) => setSelectedSkill(e.target.value)}>
            <option value="all">All</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="UI/UX">UI/UX</option>
          </select>
        </div>

        {/* RESULTS */}
        <div className="search-results">
          {filtered.map((user, index) => (
            <FreelancerCard key={index} user={user} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default CategorySearch;
