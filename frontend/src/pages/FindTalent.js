import React from "react";
import "./FindTalent.css";

function FindTalent() {
  return (
    <div className="find-talent-page">

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
      </section>

      <section className="talent-benefits">
        <div className="benefit-card">
          <h3>Verified Talent</h3>
          <p>Identity verification and skill validation.</p>
        </div>

        <div className="benefit-card">
          <h3>AI Matching</h3>
          <p>Find the best freelancers faster.</p>
        </div>

        <div className="benefit-card">
          <h3>Escrow Payments</h3>
          <p>Secure project payments and milestones.</p>
        </div>

        <div className="benefit-card">
          <h3>India First</h3>
          <p>UPI, GST invoices and local support.</p>
        </div>
      </section>

    </div>
  );
}

export default FindTalent;
