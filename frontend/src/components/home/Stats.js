import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Stats() {
  const [stats, setStats] = useState({
    freelancers: 0,
    projects: 0,
    clients: 0,
    completedJobs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  // ---- ANIMATE COUNTER ----
  useEffect(() => {
    if (!loading && !counted) {
      animateCounters();
      setCounted(true);
    }
  }, [loading]);

  // ---- FETCH REAL STATS ----
  const fetchStats = async () => {
    try {
      setLoading(true);

      // Freelancers count from Supabase profiles
      const { count: freelancerCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Projects count from backend
      const projectsRes = await axios.get(`${API}/api/projects`);
      const projectsData = projectsRes.data.projects || [];
      const totalProjects = projectsData.length;

      // Completed jobs from Supabase profiles
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("jobs_completed");

      const totalCompletedJobs = profilesData?.reduce(
        (sum, p) => sum + (p.jobs_completed || 0),
        0
      ) || 0;

      // Unique clients = projects posted by unique users
      const uniqueClients = new Set(
        projectsData.map((p) => p.clientId)
      ).size;

      setStats({
        freelancers: freelancerCount || 0,
        projects: totalProjects || 0,
        clients: uniqueClients || 0,
        completedJobs: totalCompletedJobs || 0,
      });
    } catch (err) {
      console.log("STATS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- COUNTER ANIMATION ----
  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);

      setStats((prev) => ({
        freelancers: Math.round(prev.freelancers * eased),
        projects: Math.round(prev.projects * eased),
        clients: Math.round(prev.clients * eased),
        completedJobs: Math.round(prev.completedJobs * eased),
      }));

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const statItems = [
    {
      value: stats.freelancers,
      label: "Verified Freelancers",
      icon: "👨‍💻",
      color: "#1dbf73",
      suffix: "+",
    },
    {
      value: stats.projects,
      label: "Projects Posted",
      icon: "📋",
      color: "#3b82f6",
      suffix: "+",
    },
    {
      value: stats.clients,
      label: "Happy Clients",
      icon: "🤝",
      color: "#f59e0b",
      suffix: "+",
    },
    {
      value: stats.completedJobs,
      label: "Jobs Completed",
      icon: "✅",
      color: "#8b5cf6",
      suffix: "+",
    },
  ];

  return (
    <section
      style={{
        background: "white",
        padding: "60px 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div className="container">

        {/* TITLE */}
        <div className="text-center mb-5">
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "10px",
            }}
          >
            SkillVerse By The Numbers
          </h2>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Real numbers. Real growth. Real impact.
          </p>
        </div>

        {/* STATS GRID */}
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-success" />
            <p className="mt-3 text-muted">Loading stats...</p>
          </div>
        ) : (
          <div className="row g-4 text-center">
            {statItems.map((item, i) => (
              <div key={i} className="col-6 col-md-3">
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "16px",
                    padding: "30px 20px",
                    border: "1px solid #e2e8f0",
                    transition: "0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.1)";
                    e.currentTarget.style.borderColor = item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  {/* ICON */}
                  <div
                    style={{
                      fontSize: "36px",
                      marginBottom: "12px",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* VALUE */}
                  <h2
                    style={{
                      fontSize: "40px",
                      fontWeight: "800",
                      color: item.color,
                      marginBottom: "8px",
                      lineHeight: 1,
                    }}
                  >
                    {item.value.toLocaleString()}
                    {item.suffix}
                  </h2>

                  {/* LABEL */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      margin: 0,
                      fontWeight: "600",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM NOTE */}
        <div className="text-center mt-4">
          <small style={{ color: "#94a3b8", fontSize: "13px" }}>
            📊 Stats updated in real-time from our platform
          </small>
        </div>

      </div>
    </section>
  );
}

export default Stats;
