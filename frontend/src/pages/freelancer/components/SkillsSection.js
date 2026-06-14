import React from "react";

function SkillsSection() {
  const skills = ["React", "Node.js", "MongoDB", "Express"];

  return (
    <div className="card p-3 mb-3">
      <h5>Skills</h5>

      <div className="d-flex gap-2 flex-wrap">
        {skills.map((skill, i) => (
          <span key={i} className="badge bg-primary">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;
