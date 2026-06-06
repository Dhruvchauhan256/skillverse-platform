import React from "react";
import "./FindTalent.css";

function FindTalent() {
  return (
    <div className="find-talent-page">

      {/* HERO */}
      <section className="talent-hero">
        <h1>Hire Top Indian Freelancers</h1>

        <p>
          Find verified professionals across development,
          design, marketing, content writing and more.
        </p>

        <div className="talent-search">
          <input
            type="text"
            placeholder="Search skills, freelancers..."
          />
          <button>Search Talent</button>
        </div>

        {/* FILTERS */}
        <div className="talent-filters">

          <select>
            <option>All Skills</option>
            <option>React Developer</option>
            <option>Node.js Developer</option>
            <option>UI/UX Designer</option>
            <option>SEO Expert</option>
            <option>Content Writer</option>
          </select>

          <select>
            <option>Budget</option>
            <option>₹500 - ₹1,000</option>
            <option>₹1,000 - ₹5,000</option>
            <option>₹5,000 - ₹10,000</option>
            <option>₹10,000+</option>
          </select>

          <select>
            <option>Location</option>
            <option>Remote</option>
            <option>Ahmedabad</option>
            <option>Surat</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
          </select>

          <select>
            <option>Experience</option>
            <option>Fresher</option>
            <option>1-3 Years</option>
            <option>3-5 Years</option>
            <option>5+ Years</option>
          </select>

          <select>
            <option>Availability</option>
            <option>Available Now</option>
            <option>Part-Time</option>
            <option>Full-Time</option>
          </select>

        </div>
      </section>

      {/* BENEFITS */}
      <section className="talent-benefits">

        <div className="benefit-card">
          <h3>Verified Talent</h3>
          <p>
            Identity verification and skill validation.
          </p>
        </div>

        <div className="benefit-card">
          <h3>AI Matching</h3>
          <p>
            Find the best freelancers faster.
          </p>
        </div>

        <div className="benefit-card">
          <h3>Escrow Payments</h3>
          <p>
            Secure project payments and milestones.
          </p>
        </div>

        <div className="benefit-card">
          <h3>India First</h3>
          <p>
            UPI, GST invoices and local support.
          </p>
        </div>

      </section>

    </div>
  );
}

export default FindTalent;
