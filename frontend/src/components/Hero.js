import React from "react";

function Hero() {
  return (
    <section className="hero">

      <h1>India's Smart Freelance Marketplace</h1>

      <p>
        Hire top freelancers and grow your business faster.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search freelancers, skills, services..."
        />

        <button>
          Search
        </button>
      </div>

      <div className="hero-buttons">

        <button>
          Hire Freelancer
        </button>

        <button>
          Become Freelancer
        </button>

      </div>

    </section>
  );
}

export default Hero;
