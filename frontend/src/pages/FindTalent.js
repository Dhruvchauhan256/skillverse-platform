import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import FreelancerCard from "../components/freelancer/FreelancerCard";
import "./FindTalent.css";

function FindTalent() {
  const navigate = useNavigate();

  const [freelancers, setFreelancers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("ranking_score");

  useEffect(() => {
    fetchFreelancers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, skillFilter, budgetFilter, locationFilter, sortBy, freelancers]);

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
      setFiltered(data || []);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---- APPLY FILTERS ----
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
    if (skillFilter) {
      temp = temp.filter((f) =>
        f.skills?.some((s) =>
          s.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    // Budget filter (hourly rate)
    if (budgetFilter) {
      if (budgetFilter === "500-1000") {
        temp = temp.filter(
          (f) => f.hourly_rate >= 500 && f.hourly_rate <= 1000
        );
      } else if (budgetFilter === "1000-5000") {
        temp = temp.filter(
          (f) => f.hourly_rate >= 1000 && f.hourly_rate <= 5000
        );
      } else if (budgetFilter === "5000-10000") {
        temp = temp.filter(
          (f) => f.hourly_rate >= 5000 && f.hourly_rate <= 10000
        );
      } else if (budgetFilter === "10000+") {
        temp = temp.filter((f) => f.hourly_rate >= 10000);
      }
    }

    // Location filter
    if (locationFilter) {
      temp = temp.filter((f) =>
        f.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "ranking_score") {
      temp.sort((a, b) => (b.ranking_score || 0) - (a.ranking_score || 0));
    } else if (sortBy === "rating") {
      temp.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "price_low") {
      temp.sort((a, b) => (a.hourly_rate || 0) - (b.hourly_rate || 0));
    } else if (sortBy === "price_high") {
      temp.sort((a, b) => (b.hourly_rate || 0) - (a.hourly_rate || 0));
    } else if (sortBy === "jobs") {
      temp.sort(
        (a, b) => (b.jobs_completed || 0) - (a.jobs_completed || 0)
      );
    }

    setFiltered(temp);
  };

  // ---- RESET FILTERS ----
  const resetFilters = () => {
    setSearch("");
    setSkillFilter("");
    setBudgetFilter("");
    setLocationFilter("");
    setSortBy("ranking_score");
  };

  // ---- MAP SUPABASE TO CARD FORMAT ----
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

  const benefits = [
    {
      icon: "✅",
      title: "Verified Talent",
      desc: "Identity verification and skill validation for every freelancer.",
    },
    {
      icon: "🤖",
      title: "AI Matching",
      desc: "Smart matching finds the best freelancers for your project.",
    },
    {
      icon: "🔒",
      title: "Escrow Payments",
      desc: "Secure milestone-based payments for both parties.",
    },
    {
      icon: "🇮🇳",
      title: "India First",
      desc: "UPI payments, GST invoices and local support built in.",
    },
  ];

  return (
    <div className="find-talent-page">

      {/* ===================== HERO ===================== */}
      <section className="talent-hero">
        <div className="talent-hero-badge">
          🇮🇳 India's Top Freelance Talent
        </div>

        <h1>Hire Top Indian Freelancers</h1>
        <p>
          Find verified professionals across development, design,
          marketing, content writing and more. Pay via UPI.
        </p>

        {/* SEARCH BAR */}
        <div className="talent-search">
          <input
            type="text"
            placeholder="Search skills, freelancers, services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
          <button onClick={applyFilters}>Search Talent</button>
        </div>

        {/* FILTERS */}
        <div className="talent-filters">

          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
          >
            <option value="">All Skills</option>
            <option value="React">React Developer</option>
            <option value="Node.js">Node.js Developer</option>
            <option value="UI/UX">UI/UX Designer</option>
            <option value="SEO">SEO Expert</option>
            <option value="Content">Content Writer</option>
            <option value="Python">Python Developer</option>
            <option value="MongoDB">MongoDB Expert</option>
            <option value="Figma">Figma Designer</option>
          </select>

          <select
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
          >
            <option value="">Any Budget</option>
            <option value="500-1000">₹500 - ₹1,000/hr</option>
            <option value="1000-5000">₹1,000 - ₹5,000/hr</option>
            <option value="5000-10000">₹5,000 - ₹10,000/hr</option>
            <option value="10000+">₹10,000+/hr</option>
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Any Location</option>
            <option value="Remote">Remote</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Surat">Surat</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="ranking_score">Top Ranked</option>
            <option value="rating">Highest Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="jobs">Most Jobs Done</option>
          </select>

          {/* RESET BUTTON */}
          {(search || skillFilter || budgetFilter || locationFilter) && (
            <button
              className="talent-reset-btn"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          )}

        </div>

        {/* RESULTS COUNT */}
        {!loading && (
          <div className="talent-results-count">
            {filtered.length} freelancers found
          </div>
        )}
      </section>

      {/* ===================== FREELANCER RESULTS ===================== */}
      <section className="talent-results-section">

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="talent-loading">
            <div className="spinner-border text-success" />
            <p>Finding top freelancers for you...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="talent-empty">
            <h4>No freelancers found</h4>
            <p>Try adjusting your filters or search term</p>
            <button
              className="btn btn-success"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="talent-grid">
            {filtered.map((f, i) => (
              <FreelancerCard
                key={f.id || i}
                user={mapProfile(f)}
              />
            ))}
          </div>
        )}

        {/* LOAD MORE */}
        {!loading && filtered.length > 0 && (
          <div className="talent-load-more">
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("/freelancers")}
            >
              View All Freelancers →
            </button>
          </div>
        )}

      </section>

      {/* ===================== BENEFITS ===================== */}
      <section className="talent-benefits">
        {benefits.map((b, i) => (
          <div key={i} className="benefit-card">
            <div className="benefit-icon">{b.icon}</div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </section>

      {/* ===================== CTA ===================== */}
      <section className="talent-cta">
        <h2>Ready to Hire Top Talent?</h2>
        <p>
          Post your project and get proposals from verified
          Indian freelancers within hours.
        </p>
        <div className="talent-cta-buttons">
          <button
            className="cta-btn-primary"
            onClick={() => navigate("/post-project")}
          >
            Post a Project
          </button>
          <button
            className="cta-btn-secondary"
            onClick={() => navigate("/signup")}
          >
            Join as Freelancer
          </button>
        </div>
      </section>

    </div>
  );
}

export default FindTalent;
