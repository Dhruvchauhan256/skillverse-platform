import React from "react";

function FreelancerProfile() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* LEFT CONTENT */}
        <div className="col-md-9">

          {/* Profile Header */}
          <div className="card p-4 mb-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src="https://via.placeholder.com/80"
                className="rounded-circle"
              />

              <div>
                <h4>Dhruv Chauhan</h4>
                <p className="text-muted">
                  Full Stack Developer | MERN Expert
                </p>
                <span className="badge bg-success">
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row mb-3">

            <div className="col-md-3">
              <div className="card p-3">
                ⭐ 4.8 Rating
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                💰 ₹1.2L Earned
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                ✅ 24 Jobs
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                📩 98% Response
              </div>
            </div>

          </div>

          {/* Skills */}
          <div className="card p-3 mb-3">
            <h5>Skills</h5>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge bg-primary">React</span>
              <span className="badge bg-primary">Node.js</span>
              <span className="badge bg-primary">MongoDB</span>
              <span className="badge bg-primary">Express</span>
            </div>
          </div>

          {/* Portfolio */}
          <div className="card p-3 mb-3">
            <h5>Portfolio</h5>
            <p>Showcase your best work here...</p>
          </div>

          {/* Work History */}
          <div className="card p-3">
            <h5>Work History</h5>
            <p>No jobs yet</p>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-md-3">

          <div className="card p-3">
            <h6>Profile Menu</h6>

            <ul className="list-unstyled">
              <li>Profile</li>
              <li>Stats</li>
              <li>Earnings</li>
              <li>Proposals</li>
              <li>Messages</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>

          </div>

        </div>

      </div>
    </div>
  );
}

export default FreelancerProfile;
