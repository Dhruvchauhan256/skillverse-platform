import React from "react";

function Hero() {
  return (
    <section className="container text-center py-5">
      <h1 className="display-3 fw-bold">
        India's Smart Freelance Marketplace
      </h1>

      <p className="lead mt-3">
        Hire top freelancers and grow your business faster.
      </p>

      <div className="mt-4">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search freelancers, skills, services..."
        />
      </div>

      <div className="mt-4">
        <button className="btn btn-primary btn-lg me-3">
          Hire Freelancer
        </button>

        <button className="btn btn-success btn-lg">
          Become Freelancer
        </button>
      </div>
    </section>
  );
}

export default Hero;
