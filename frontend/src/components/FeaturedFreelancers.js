import React from "react";

function FeaturedFreelancers() {
  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">
        Featured Freelancers
      </h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Rahul Sharma</h5>
            <p>Full Stack Developer</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Priya Patel</h5>
            <p>UI/UX Designer</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Arjun Singh</h5>
            <p>Digital Marketer</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedFreelancers;
