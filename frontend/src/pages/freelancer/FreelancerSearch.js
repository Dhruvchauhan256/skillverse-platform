import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import FreelancerCard from "../../components/freelancer/FreelancerCard";
import Filters from "../../components/search/Filters";

function FreelancerSearch() {
  const [freelancers, setFreelancers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFreelancers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, skillFilter, sortBy, freelancers]);

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
        console.log("FETCH ERROR:", error);
        return;
      }

      setFreelancers(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---- FILTER + SORT ----
  const applyFilters = () => {
    let temp = [...freelancers];

    // Search filter
    if (search.trim()) {
      temp = temp.filter(
        (f) =>
          f.name?.toLowerCase().includes(search.toLowerCase()) ||
          f.title?.toLowerCase().includes(search.toLowerCase()) ||
          f.skills?.some((s) =>
            s.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    // Skill filter
    if (skillFilter !== "all") {
      temp = temp.filter((f) =>
        f.skills?.includes(skillFilter)
      );
    }

    // Sort
    if (sortBy === "rating") {
      temp.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "price_low") {
      temp.sort(
        (a, b) => (a.hourly_rate || 0) - (b.hourly_rate || 0)
      );
    } else if (sortBy === "price_high") {
      temp.sort(
        (a, b) => (b.hourly_rate || 0) - (a.hourly_rate || 0)
      );
    } else if (sortBy === "jobs") {
      temp.sort(
        (a, b) => (b.jobs_completed || 0) - (a.jobs_completed || 0)
      );
    }

    setFiltered(temp);
  };

  // ---- MAP SUPABASE PROFILE TO FREELANCER CARD FORMAT ----
  const mapProfile = (profile) => ({
    name: profile.name || "Freelancer",
    title: profile.title || "Freelancer",
    rating: profile.rating || 0,
    reviews: profile.jobs_completed || 0,
    hourlyRate: profile.hourly_rate || 0,
    skills: profile.skills || [],
    avatar: profile.avatar_url || "",
    is_online: profile.is_online || false,
  });

  return (
    <div className="container mt-4">

      {/* SEARCH BAR */}
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search freelancers by name, title or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={fetchFreelancers}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* SORT + SKILL FILTER */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="rating">Top Rated</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="jobs">Most Jobs Done</option>
        </select>

        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
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

        <span className="badge bg-success fs-6 d-flex align-items-center">
          {filtered.length} Freelancers
        </span>
      </div>

      <div className="row">

        {/* SIDEBAR */}
        <div className="col-lg-3 mb-4">
          <Filters />
        </div>

        {/* RESULTS */}
        <div className="col-lg-9">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
              <p className="mt-3">Loading freelancers...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="alert alert-warning">
              No freelancers found. Try a different search.
            </div>
          ) : (
            <div className="row g-3">
              {filtered.map((profile, i) => (
                <div className="col-md-6" key={profile.id || i}>
                  <FreelancerCard user={mapProfile(profile)} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default FreelancerSearch;
