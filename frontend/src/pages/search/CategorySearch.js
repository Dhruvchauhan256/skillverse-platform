import React, { useState } from "react";
import FreelancerCard from "../../components/freelancer/FreelancerCard";
import "./CategorySearch.css";

function CategorySearch() {
  const [sortBy, setSortBy] = useState("rating");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [search, setSearch] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState([]);

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

  // FILTER LOGIC
  let filtered = freelancers;

  if (selectedSkill !== "all") {
    filtered = filtered.filter((f) =>
      f.skills.includes(selectedSkill)
    );
  }

  // SORTING LOGIC (UPWORK STYLE)
  if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "price_low") {
    filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
  } else if (sortBy === "price_high") {
    filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
  }

  return (
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
  );
}

export default CategorySearch;
