import React from "react";
import FreelancerCard from "../freelancer/FreelancerCard";

function TopFreelancers() {
  const top = [
    { name: "Rahul Patel", title: "React Developer", rating: 4.9, skills: ["React"] },
    { name: "Priya Shah", title: "UI Designer", rating: 4.8, skills: ["Figma"] },
    { name: "Aman Verma", title: "Full Stack Developer", rating: 4.7, skills: ["MERN"] },
  ];

  return (
    <div className="container mt-5">
      <h3>Top Freelancers</h3>
      <div className="row">
        {top.map((user, i) => (
          <div className="col-md-4" key={i}>
            <FreelancerCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopFreelancers;
