import React from "react";
import { useParams } from "react-router-dom";
import "./FreelancerProfile.css";

function FreelancerProfile() {
  const { name } = useParams();

  return (
    <div className="profile-container">

      {/* HEADER */}
      <div className="profile-header">
        <div className="avatar"></div>

        <div>
          <h1>{name}</h1>
          <p>Full Stack Developer | React | Node.js</p>
          <span>⭐ 4.8 (120 reviews)</span>
        </div>

        <button>Hire Now</button>
      </div>

      {/* BODY */}
      <div className="profile-body">

        <div className="left">
          <h2>About</h2>
          <p>
            Experienced freelancer specializing in web applications,
            UI design and scalable backend systems.
          </p>

          <h2>Skills</h2>
          <div className="skills">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>UI/UX</span>
          </div>
        </div>

        <div className="right">
          <h2>Hourly Rate</h2>
          <h3>$25/hr</h3>

          <h2>Completed Projects</h2>
          <h3>48+</h3>
        </div>

      </div>

    </div>
  );
}

export default FreelancerProfile;
