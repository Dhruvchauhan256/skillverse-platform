import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FreelancerCard from "../components/freelancer/FreelancerCard";
import "./Home.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Home() {
  const navigate = useNavigate();
  const [topFreelancers, setTopFreelancers] = useState([]);
  const [stats, setStats] = useState({
    freelancers: 0,
    projects: 0,
    clients: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/api/freelancers/top`);
      const profiles = res.data || [];

      setTopFreelancers(profiles);

      setStats({
        freelancers: profiles.length,
        projects: 500,
        clients: 200,
      });

    } catch (err) {
      console.log("Home error:", err);
    } finally {
      setLoading(false);
    }
  };

  const mapProfile = (f) => ({
    name: f.user?.name || "Freelancer",
    title: f.title || "Freelancer",
    rating: f.rating || 0,
    reviews: f.jobs_completed || 0,
    hourlyRate: f.hourlyRate || 0,
    skills: f.skills || "",
    avatar: f.avatar_url || "",
    is_online: f.is_online || false,
  });

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1>Hire Top Indian Freelancers</h1>

        <div className="hero-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <h2>{stats.freelancers} Freelancers</h2>
        <h2>{stats.projects} Projects</h2>
        <h2>{stats.clients} Clients</h2>
      </section>

      {/* FREELANCERS */}
      <section className="freelancers-section">
        <h2>Top Freelancers</h2>

        {loading ? (
          <p>Loading...</p>
        ) : topFreelancers.length === 0 ? (
          <p>No freelancers yet</p>
        ) : (
          <div className="freelancer-grid">
            {topFreelancers.map((f, i) => (
              <FreelancerCard key={f.id || i} user={mapProfile(f)} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default Home;