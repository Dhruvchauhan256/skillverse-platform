import React from "react";

function Reviews() {
  return (
    <section className="bg-light py-5">
      <div className="container">

        <h2 className="text-center mb-4">
          Client Reviews
        </h2>

        <div className="row">

          <div className="col-md-4">
            <div className="card p-3">
              <p>
                SkillVerse helped us hire a great developer.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <p>
                Easy hiring process and quality freelancers.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <p>
                Highly recommended for businesses.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Reviews;
