import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import FreelancerCard from "../components/freelancer/FreelancerCard";
import "./Home.css";

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

  const categories = [
    { icon: "💻", title: "Web Development", count: "1,200+ freelancers" },
    { icon: "🎨", title: "UI/UX Design", count: "800+ freelancers" },
    { icon: "📱", title: "Mobile Apps", count: "600+ freelancers" },
    { icon: "📝", title: "Content Writing", count: "900+ freelancers" },
    { icon: "📊", title: "Digital Marketing", count: "700+ freelancers" },
    { icon: "🔍", title: "SEO", count: "500+ freelancers" },
    { icon: "🧮", title: "CA & Accounting", count: "400+ freelancers" },
    { icon: "⚖️", title: "Legal Services", count: "300+ freelancers" },
    { icon: "🤖", title: "AI & ML", count: "450+ freelancers" },
    { icon: "🎬", title: "Video Editing", count: "350+ freelancers" },
    { icon: "🛡️", title: "Cyber Security", count: "250+ freelancers" },
    { icon: "📈", title: "Data Analytics", count: "380+ freelancers" },
  ];

  const steps = [
    {
      icon: "📋",
      title: "Post a Project",
      desc: "Describe your requirements and budget in minutes.",
    },
    {
      icon: "📩",
      title: "Receive Proposals",
      desc: "Skilled freelancers submit proposals for your work.",
    },
    {
      icon: "🤝",
      title: "Hire & Collaborate",
      desc: "Choose the best freelancer and work directly.",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      desc: "Release payments safely via milestone protection.",
    },
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Only 8% Commission",
      desc: "Lowest platform fees vs 20% on global platforms. Keep more of what you earn.",
    },
    {
      icon: "🇮🇳",
      title: "India First Platform",
      desc: "Built specifically for Indian freelancers, startups and SMEs.",
    },
    {
      icon: "📲",
      title: "UPI Payments",
      desc: "Fast and simple payments using India's preferred payment method.",
    },
    {
      icon: "🧾",
      title: "GST Ready",
      desc: "Auto GST-compliant invoicing and TDS calculation built in.",
    },
    {
      icon: "🤖",
      title: "AI Matching",
      desc: "Smart freelancer and project matching powered by AI.",
    },
    {
      icon: "🛡️",
      title: "Escrow Protection",
      desc: "Milestone-based secure payments for both parties.",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "React Developer, Surat",
      text: "SkillVerse helped me get my first 3 clients within a week. The 8% commission is a game changer!",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "UI/UX Designer, Ahmedabad",
      text: "Finally a platform that understands Indian freelancers. UPI payments make everything so easy.",
      rating: 5,
    },
    {
      name: "Amit Verma",
      role: "Startup Founder, Mumbai",
      text: "Hired 3 developers through SkillVerse. Quality talent at fair prices. Highly recommended!",
      rating: 5,
    },
  ];

  const trustedBy = [
    "TCS", "Infosys", "Wipro", "Razorpay",
    "CRED", "Zepto", "Meesho", "PhonePe",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch top freelancers
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .order("rating", { ascending: false })
        .limit(3);

      // Fetch stats
      const { count: freelancerCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      setTopFreelancers(profiles || []);
      setStats({
        freelancers: freelancerCount || 0,
        projects: 500,
        clients: 200,
      });
    } catch (err) {
      console.log(err);
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

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="home">

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🇮🇳 India's #1 Freelance Marketplace</div>

          <h1>
            Hire Top Indian Freelancers <br />
            <span className="hero-highlight">At Just 8% Commission</span>
          </h1>

          <p>
            Connect with verified developers, designers, marketers & more.
            Pay via UPI. Get GST invoices automatically.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Search freelancers, skills, services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="hero-tags">
            <span>Popular:</span>
            {["React", "UI Design", "SEO", "AI/ML", "Video Editing", "GST Filing"].map(
              (tag, i) => (
                <span
                  key={i}
                  className="hero-tag"
                  onClick={() => navigate(`/search?q=${tag}`)}
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="hero-actions">
            <button
              className="btn-hire"
              onClick={() => navigate("/find-talent")}
            >
              Hire Talent
            </button>
            <button
              className="btn-work"
              onClick={() => navigate("/find-work")}
            >
              Find Work
            </button>
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="stats-section">
        <div className="stat-item">
          <h2>{stats.freelancers.toLocaleString()}+</h2>
          <p>Verified Freelancers</p>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <h2>{stats.projects.toLocaleString()}+</h2>
          <p>Projects Posted</p>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <h2>{stats.clients.toLocaleString()}+</h2>
          <p>Happy Clients</p>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <h2>8%</h2>
          <p>Platform Commission</p>
        </div>
      </section>

      {/* ===================== CATEGORIES ===================== */}
      <section className="categories-section">
        <h2>Browse Categories</h2>
        <p className="section-subtitle">
          Find experts across every domain, from tech to legal
        </p>
        <div className="category-grid">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="category-card"
              onClick={() => navigate(`/search?q=${cat.title}`)}
            >
              <div className="category-icon">{cat.icon}</div>
              <h4>{cat.title}</h4>
              <small>{cat.count}</small>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TOP FREELANCERS ===================== */}
      <section className="freelancers-section">
        <h2>Top Freelancers</h2>
        <p className="section-subtitle">
          Handpicked talent based on ratings and performance
        </p>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-success" />
          </div>
        ) : topFreelancers.length === 0 ? (
          <p className="text-center text-muted">
            No freelancers yet. Be the first to join!
          </p>
        ) : (
          <div className="freelancer-grid">
            {topFreelancers.map((f, i) => (
              <FreelancerCard key={f.id || i} user={mapProfile(f)} />
            ))}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            className="btn-view-all"
            onClick={() => navigate("/freelancers")}
          >
            View All Freelancers →
          </button>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="how-it-works">
        <h2>How SkillVerse Works</h2>
        <p className="section-subtitle">
          Get started in minutes — no complicated setup
        </p>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{i + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WHY SKILLVERSE ===================== */}
      <section className="benefits-section">
        <h2>Why Choose SkillVerse?</h2>
        <p className="section-subtitle">
          Built for India, by Indians — with features you actually need
        </p>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <div className="benefit-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== INDIA FOCUSED ===================== */}
      <section className="india-section">
        <div className="india-content">
          <h2>Built For Bharat 🇮🇳</h2>
          <p>
            From Tier-2 cities to metro hubs, SkillVerse connects
            talent across India. Perfect for BCA, MCA, B.Tech freshers
            looking for their first gig.
          </p>
          <div className="india-features">
            <div className="india-feature">
              <span>🗣</span> Hinglish Friendly
            </div>
            <div className="india-feature">
              <span>🎓</span> Fresher Friendly
            </div>
            <div className="india-feature">
              <span>🏙</span> Tier 2 & 3 Focus
            </div>
            <div className="india-feature">
              <span>📲</span> WhatsApp Updates
            </div>
            <div className="india-feature">
              <span>🧾</span> Auto GST Invoice
            </div>
            <div className="india-feature">
              <span>🪪</span> Aadhaar KYC
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <p className="section-subtitle">
          Real stories from real Indian freelancers and clients
        </p>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {"⭐".repeat(t.rating)}
              </div>
              <p>"{t.text}"</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TRUSTED BY ===================== */}
      <section className="trusted-section">
        <h2>Trusted By Leading Companies</h2>
        <div className="trusted-grid">
          {trustedBy.map((company, i) => (
            <div key={i} className="trusted-card">
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="cta-section">
        <h2>
          Join India's Next Generation <br />
          Freelance Marketplace
        </h2>
        <p>
          Start earning or hiring today. Zero commission for
          first 6 months for founding members!
        </p>
        <div className="cta-buttons">
          <button
            className="cta-btn-primary"
            onClick={() => navigate("/signup")}
          >
            Create Free Account
          </button>
          <button
            className="cta-btn-secondary"
            onClick={() => navigate("/find-work")}
          >
            Browse Projects
          </button>
        </div>
        <small className="cta-note">
          No credit card required • Free to join • 8% commission only on earnings
        </small>
      </section>

    </div>
  );
}

export default Home;
