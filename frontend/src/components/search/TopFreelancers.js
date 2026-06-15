import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import FreelancerCard from "../freelancer/FreelancerCard";

function TopFreelancers() {
  const [topFreelancers, setTopFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTopFreelancers();
  }, []);

  const fetchTopFreelancers = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("rating", { ascending: false })
        .limit(3);

      if (error) {
        setError("Failed to load top freelancers");
        return;
      }

      setTopFreelancers(data || []);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (topFreelancers.length === 0) return null;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Top Freelancers</h3>
      <div className="row g-3">
        {topFreelancers.map((f, i) => (
          <div className="col-md-4" key={f.id || i}>
            <FreelancerCard user={mapProfile(f)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopFreelancers;
