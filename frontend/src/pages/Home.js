import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import GigCard from "../components/gigs/GigCard";

function Home() {

  const gigs = [
  {
    title: "I will design modern React website",
    seller: "John Doe",
    rating: 4.9,
    reviews: 120,
    price: 50,
    image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    avatar: "https://i.pravatar.cc/40"
  },
  {
    title: "I will build your business UI",
    seller: "Aman Patel",
    rating: 4.8,
    reviews: 98,
    price: 35,
    image:"https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800",
    avatar: "https://i.pravatar.cc/41"
  }
];
  
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
const navigate = useNavigate();
  
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
            <button onClick={() => navigate("/search")}>
                  Search
            </button>
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

      <section className="gigs-section">
  <h2>Popular Services</h2>

  <div className="gig-grid">
    {gigs.map((gig, i) => (
      <GigCard key={i} gig={gig} />
    ))}
  </div>
</section>

<section className="trusted-section">
  <h2>Trusted By</h2>

  <div className="trusted-grid">
    <div>Google</div>
    <div>Microsoft</div>
    <div>Amazon</div>
    <div>Meta</div>
    <div>Netflix</div>
  </div>
</section>

<section className="how-it-works">
  <h2>How SkillVerse Works</h2>

  <div className="steps-grid">
    <div className="step-card">
      <h3>1️⃣ Post Project</h3>
      <p>Create your project in minutes.</p>
    </div>

    <div className="step-card">
      <h3>2️⃣ Receive Proposals</h3>
      <p>Get proposals from top freelancers.</p>
    </div>

    <div className="step-card">
      <h3>3️⃣ Hire Talent</h3>
      <p>Choose the best freelancer.</p>
    </div>

    <div className="step-card">
      <h3>4️⃣ Pay Securely</h3>
      <p>Safe payments with escrow protection.</p>
    </div>
  </div>
</section>

<section className="testimonial-section">
  <h2>What Clients Say</h2>

  <div className="testimonial-grid">
    <div className="testimonial-card">
      ⭐⭐⭐⭐⭐
      <p>
        SkillVerse helped us hire a React developer within
        24 hours.
      </p>
      <h4>Rahul Sharma</h4>
    </div>

    <div className="testimonial-card">
      ⭐⭐⭐⭐⭐
      <p>
        Better experience than most freelancer platforms.
      </p>
      <h4>Priya Patel</h4>
    </div>

    <div className="testimonial-card">
      ⭐⭐⭐⭐⭐
      <p>
        Fast hiring process and excellent freelancers.
      </p>
      <h4>Arjun Mehta</h4>
    </div>
  </div>
</section>
    </div>
  );
}

export default Home;
