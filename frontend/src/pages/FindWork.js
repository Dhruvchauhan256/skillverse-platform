import React from "react";

function FindWork() {
  return (
    <div className="container py-5">

      <h1 className="mb-4">
        Find Freelance Work
      </h1>

      <p>
        Discover projects from startups,
        businesses and enterprises across India.
      </p>

      <div className="row mt-5">

        <div className="col-md-4">
          <div className="card p-3">
            <h4>Web Development</h4>
            <p>Build websites and web apps.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h4>UI/UX Design</h4>
            <p>Create modern user experiences.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h4>Digital Marketing</h4>
            <p>SEO, ads and growth marketing.</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default FindWork;
