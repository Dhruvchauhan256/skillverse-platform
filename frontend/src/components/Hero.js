import React from "react";

function Hero() {
  return (
    <section className="bg-dark text-white py-5">

      <div className="container text-center">

        <h1 className="display-3 fw-bold">
          India's Smart Freelance Marketplace
        </h1>

        <p className="lead mt-3">
          Hire experts, grow your business, and work with top freelancers.
        </p>

        <div className="row justify-content-center mt-4">

          <div className="col-md-8">
            <div className="input-group">

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search freelancers, skills, services..."
              />

              <button className="btn btn-info">
                Search
              </button>

            </div>
          </div>

        </div>

        <div className="mt-4">

          <button className="btn btn-primary btn-lg me-3">
            Hire Freelancer
          </button>

          <button className="btn btn-success btn-lg">
            Become Freelancer
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;
