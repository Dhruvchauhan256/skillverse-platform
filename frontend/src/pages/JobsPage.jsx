import React from "react";
import JobCard from "../components/jobs/JobCard";

function JobsPage() {

  const jobs = [
    {
      title: "Build React SaaS Dashboard",
      description: "Need a frontend developer for SaaS dashboard UI",
      budget: "$200",
      duration: "2 weeks"
    },
    {
      title: "Design Mobile App UI",
      description: "UI designer needed for fintech app",
      budget: "$150",
      duration: "1 week"
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find Jobs</h2>

      {jobs.map((job, i) => (
        <JobCard key={i} job={job} />
      ))}

    </div>
  );
}

export default JobsPage;
