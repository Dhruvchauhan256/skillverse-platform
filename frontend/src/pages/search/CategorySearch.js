import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import FreelancerCard from "../../components/freelancer/FreelancerCard";
import "./CategorySearch.css";

function CategorySearch() {
  const location = useLocation();
  const initialSearch =
    location.state?.query ||
    new URLSearchParams(location.search).get("q") ||
    "";

  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("rating");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [recentSearches, setRecentSearches] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const trending = [
    "React Developer",
    "UI Designer",
    "Full Stack",
    "Node.js Expert",
    "Python Developer",
    "SEO Expert",
  ];

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
    fetchFreelancers();
  }, []);

  // ---- FETCH FROM SUPABASE ----
  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("ranking_score", { ascending: false });

      if (error) {
        setError("Failed to load freelancers");
        return;
      }

      setFreelancers(data || []);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---- SAVE RECENT SEARCH ----
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

  // ---- SMART SCORE ----
  const getScore = (f) => {
    let score = 0;
    score += (f.rating || 0) * 10;
    score += (f.jobs_completed || 0) * 0.02;
    if (
      selectedSkill !== "all" &&
      f.skills?.includes(selectedSkill)
    ) score += 20;
    if (
      f.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.title?.toLowerCase().includes(search.toLowerCase())
    ) score += 15;
    if (f.hourly_rate >= 15 && f.hourly_rate <= 30) score += 5;
    return score;
  };

  // ---- FILTER + SORT ----
  const filtered = freelancers
    .filter((f) => {
      const matchSkill =
        selectedSkill === "all" ||
        f.skills?.includes(selectedSkill);

      const matchSearch =
        !search.trim() ||
        f.name?.toLowerCase().includes(search.toLowerCase()) ||
        f.title?.toLowerCase().includes(search.toLowerCase()) ||
        f.skills?.some((s) =>
          s.toLowerCase().includes(search.toLowerCase())
        );

      return matchSkill && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return getScore(b) - getScore(a);
      if (sortBy === "price_low")
        return (a.hourly_rate || 0) - (b.hourly_rate || 0);
      if (sortBy === "price_high")
        return (b.hourly_rate || 0) - (a.hourly_rate || 0);
      return 0;
    });

  // ---- RECOMMENDED ----
  const recommended = [...freelancers]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 2);

  // ---- MAP TO CARD FORMAT ----
  const mapProfile = (f) => ({
    name: f.name || "Freelancer",
    title: f.title || "Freelancer",
    rating: f.rating || 0,
    reviews: f.jobs_completed || 0,
    hourlyRate: f.hourly_rate || 0,
    skills: f.skills || [],
    avatar: f.avatar_url || "",
    is_online: f.is_online || false,
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
              onClick={() => handleSearch(item)}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* RECOMMENDED — only when no search */}
      {search === "" && !loading && recommended.length > 0 && (
        <div className="recommended-section">
          <h3>Recommended for you</h3>
          <div className="recommended-grid">
            {recommended.map((f, i) => (
              <FreelancerCard key={i} user={mapProfile(f)} />
            ))}
          </div>
        </div>
      )}

      <div className="search-layout">

        {/* SIDEBAR */}
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
            <option value="all">All Skills</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Figma">Figma</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Python">Python</option>
            <option value="SEO">SEO</option>
          </select>
        </div>

        {/* RESULTS */}
        <div className="search-results">
          {loading ? (
            <div className="text-center py-5 w-100">
              <div className="spinner-border text-primary" />
              <p className="mt-3">Loading freelancers...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger w-100">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="no-results">
              <h4>No freelancers found</h4>
              <p>Try a different search or filter.</p>
            </div>
          ) : (
            filtered.map((f, i) => (
              <FreelancerCard key={f.id || i} user={mapProfile(f)} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default CategorySearch;
