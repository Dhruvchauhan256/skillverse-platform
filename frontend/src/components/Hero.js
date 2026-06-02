import React from "react";
import "./hero.css";

function Hero() {
  return (
    <section className="hero-section">

      <div className="hero-content">
        <h1>
          Hire Top Freelancers <br />
          & Grow Your Business 🚀
        </h1>

        <p>
          SkillVerse connects clients with top skilled developers, designers,
          and digital experts worldwide.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">Hire Talent</button>
          <button className="btn-secondary">Find Work</button>
        </div>
      </div>

    </section>
  );
}

export default Hero;
