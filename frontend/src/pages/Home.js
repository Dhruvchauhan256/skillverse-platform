import React from "react";
import "./Home.css";

function Home() {
  const categories = [
    "Web Development",
    "UI/UX Design",
    "Mobile Apps",
    "Video Editing",
    "SEO",
    "AI Services",
    "Logo Design",
    "Content Writing",
  ];

  const freelancers = [
    { name: "John Doe", skill: "React Developer", rating: 4.8 },
    { name: "Aman Patel", skill: "UI Designer", rating: 4.6 },
    { name: "Sara Khan", skill: "Full Stack Developer", rating: 4.9 },
    { name: "Rahul Mehta", skill: "Node.js Expert", rating: 4.7 },
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find the perfect freelance services for your business</h1>
          <p>Trusted by companies worldwide to hire top talent</p>

          <div className="hero-search">
            <input type="text" placeholder="Search freelancers, skills..." />
            <button>Search</button>
          </div>

          <div className="hero-tags">
            <span>Popular:</span>
            <span>React</span>
            <span>UI Design</span>
            <span>SEO</span>
            <span>AI</span>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="categories-section">
        <h2>Browse Categories</h2>

        <div className="category-grid">
          {categories.map((cat, i) => (
            <div key={i} className="category-card">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* FREELANCERS */}
      <section className="freelancers-section">
        <h2>Featured Freelancers</h2>

        <div className="freelancer-grid">
          {freelancers.map((f, i) => (
            <div key={i} className="freelancer-card">
              <h3>{f.name}</h3>
              <p>{f.skill}</p>
              <span>⭐ {f.rating}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div>
          <h3>10K+</h3>
          <p>Freelancers</p>
        </div>
        <div>
          <h3>5K+</h3>
          <p>Projects</p>
        </div>
        <div>
          <h3>99%</h3>
          <p>Success Rate</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start hiring top talent or grow your freelance career</h2>
        <button>Get Started</button>
      </section>

    </div>
  );
}

export default Home;
