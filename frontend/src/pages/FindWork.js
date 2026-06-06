import React from "react";
import "./FindWork.css";

function FindWork() {
  const projects = [
    {
      title: "Build Modern MERN SaaS Platform",
      budget: "₹50,000 - ₹1,00,000",
      duration: "2 Months",
      skills: ["React", "Node.js", "MongoDB"],
      verified: true,
    },
    {
      title: "E-commerce Website Development",
      budget: "₹25,000 - ₹75,000",
      duration: "1 Month",
      skills: ["React", "Express", "Payment Gateway"],
      verified: true,
    },
    {
      title: "UI/UX Design for Mobile App",
      budget: "₹15,000 - ₹40,000",
      duration: "3 Weeks",
      skills: ["Figma", "UI Design", "UX Research"],
      verified: false,
    },
    {
      title: "SEO & Digital Marketing Campaign",
      budget: "₹10,000 - ₹30,000",
      duration: "1 Month",
      skills: ["SEO", "Google Ads", "Content Marketing"],
      verified: true,
    },
  ];

  return (
    <div className="findwork-page">

      <section className="findwork-hero">
        <h1>Find Work Opportunities</h1>
        <p>
          Discover projects from startups, businesses, and clients
          across India.
        </p>

        <div className="findwork-search">
          <input
            type="text"
            placeholder="Search projects, skills..."
          />
          <button>Search</button>
        </div>
      </section>

      <section className="projects-section">
        <h2>Latest Projects</h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>

              <h3>{project.title}</h3>

              <p className="budget">
                💰 {project.budget}
              </p>

              <p className="duration">
                ⏳ {project.duration}
              </p>

              {project.verified && (
                <span className="verified-badge">
                  ✔ Verified Client
                </span>
              )}

              <div className="skills">
                {project.skills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>

              <button className="apply-btn">
                Apply Now
              </button>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default FindWork;
