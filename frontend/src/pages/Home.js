import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const categories = [
    "Web Development",
    "UI/UX Design",
    "Mobile Apps",
    "Video Editing",
    "SEO & Marketing",
    "AI Services",
    "Logo Design",
    "Content Writing",
    "Data Entry",
    "Accounting & GST",
    "Legal Services",
    "Cyber Security",
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>India's Freelancer Marketplace Built For Growth</h1>

          <p>
            Hire skilled freelancers, post projects, receive proposals,
            and manage payments in one place.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Search services, skills, projects..."
            />

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
            <span>Video Editing</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
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

      {/* WHY SKILLVERSE */}
      <section className="skillverse-benefits">
        <h2>Why Choose SkillVerse?</h2>

        <div className="benefits-grid">

          <div className="benefit-card">
            <h3>💰 8% Commission</h3>
            <p>
              Lower platform fees compared to many global
              freelance marketplaces.
            </p>
          </div>

          <div className="benefit-card">
            <h3>🇮🇳 India First Platform</h3>
            <p>
              Designed specifically for Indian freelancers,
              startups and businesses.
            </p>
          </div>

          <div className="benefit-card">
            <h3>📱 UPI Payments</h3>
            <p>
              Fast and simple payments using India's preferred
              payment method.
            </p>
          </div>

          <div className="benefit-card">
            <h3>🧾 GST Ready</h3>
            <p>
              GST-compliant invoicing and business-friendly
              workflows.
            </p>
          </div>

          <div className="benefit-card">
            <h3>🤖 AI Matching</h3>
            <p>
              Smart freelancer and project matching powered by AI.
            </p>
          </div>

          <div className="benefit-card">
            <h3>🔒 Escrow Protection</h3>
            <p>
              Secure milestone-based payments for clients
              and freelancers.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How SkillVerse Works</h2>

        <div className="steps-grid">

          <div className="step-card">
            <h3>1️⃣ Post a Project</h3>
            <p>
              Create a project and describe your requirements.
            </p>
          </div>

          <div className="step-card">
            <h3>2️⃣ Receive Proposals</h3>
            <p>
              Skilled freelancers submit proposals for your work.
            </p>
          </div>

          <div className="step-card">
            <h3>3️⃣ Hire & Collaborate</h3>
            <p>
              Choose the best freelancer and communicate directly.
            </p>
          </div>

          <div className="step-card">
            <h3>4️⃣ Secure Payment</h3>
            <p>
              Release payments safely through milestone protection.
            </p>
          </div>

        </div>
      </section>

      {/* INDIA FOCUSED */}
      <section className="skillverse-benefits">
        <h2>Built For India</h2>

        <div className="benefits-grid">

          <div className="benefit-card">
            <h3>🗣 Hinglish Friendly</h3>
            <p>
              Designed for India's communication style.
            </p>
          </div>

          <div className="benefit-card">
            <h3>🎓 Fresher Friendly</h3>
            <p>
              Opportunities for BCA, MCA, B.Tech and fresh graduates.
            </p>
          </div>

          <div className="benefit-card">
            <h3>🏙 Tier 2 & Tier 3 Focus</h3>
            <p>
              Connecting talent beyond metro cities.
            </p>
          </div>

          <div className="benefit-card">
            <h3>📲 WhatsApp Updates</h3>
            <p>
              Faster notifications and communication.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>
          Join India's Next Generation Freelance Marketplace
        </h2>

        <button onClick={() => navigate("/signup")}>
          Create Free Account
        </button>
      </section>

    </div>
  );
}

export default Home;
