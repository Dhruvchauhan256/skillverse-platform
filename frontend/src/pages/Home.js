import React from "react";
import "./Home.css";

function Home() {
  console.log("🔥 HOME PAGE IS RENDERING");

  const categories = [
    "Web Development",
    "UI/UX Design",
    "Mobile Apps",
    "Video Editing",
    "SEO",
    "AI Services",
  ];

  const freelancers = [
    { name: "John Doe", skill: "React Developer", rating: 4.8 },
    { name: "Aman Patel", skill: "UI Designer", rating: 4.6 },
    { name: "Sara Khan", skill: "Full Stack", rating: 4.9 },
  ];

  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <h1>Find the perfect freelance services for your business</h1>
        <p>Hire top freelancers or offer your skills worldwide</p>

        <div className="hero-search">
          <input type="text" placeholder="Search freelancers, skills..." />
          <button>Search</button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="categories">
        {categories.map((cat, i) => (
          <div key={i} className="category-pill">
            {cat}
          </div>
        ))}
      </div>

      {/* TRENDING FREELANCERS */}
      <div className="section">
        <h2>Trending Freelancers</h2>

        <div className="card-grid">
          {freelancers.map((f, i) => (
            <div className="card" key={i}>
              <h3>{f.name}</h3>
              <p>{f.skill}</p>
              <span>⭐ {f.rating}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TOP RATED */}
      <div className="section">
        <h2>Top Rated Talent</h2>

        <div className="card-grid">
          {freelancers
            .sort((a, b) => b.rating - a.rating)
            .map((f, i) => (
              <div className="card highlight" key={i}>
                <h3>{f.name}</h3>
                <p>{f.skill}</p>
                <span>⭐ {f.rating}</span>
              </div>
            ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta">
        <h2>Start hiring or selling your skills today</h2>
        <button>Get Started</button>
      </div>

    </div>
  );
}

export default Home;
