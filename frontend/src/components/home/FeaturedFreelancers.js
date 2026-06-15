import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import FreelancerCard from "../freelancer/FreelancerCard";

function FeaturedFreelancers() {
  const navigate = useNavigate();
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("ranking_score", { ascending: false })
        .limit(6);

      if (error) {
        setError("Failed to load featured freelancers");
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

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border text-success" />
        <p className="mt-3 text-muted">Loading featured freelancers...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </section>
    );
  }

  if (freelancers.length === 0) return null;

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Featured Freelancers</h2>
          <p className="text-muted mb-0">
            Top rated talent ready to work on your project
          </p>
        </div>
        <button
          className="btn btn-outline-success"
          onClick={() => navigate("/freelancers")}
        >
          View All →
        </button>
      </div>

      <div className="row g-3">
        {freelancers.map((f, i) => (
          <div className="col-md-4" key={f.id || i}>
            <FreelancerCard user={mapProfile(f)} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedFreelancers;
