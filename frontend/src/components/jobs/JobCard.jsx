import React, { useState } from "react";
import ProposalModal from "./ProposalModal";
import "./JobCard.css";

function JobCard({ job }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="job-card">

      <h3>{job.title}</h3>
      <p className="job-desc">{job.description}</p>

      <div className="job-meta">
        <span>💰 {job.budget}</span>
        <span>⏳ {job.duration}</span>
      </div>

      <button onClick={() => setOpen(true)} className="apply-btn">
        Send Proposal
      </button>

      {open && (
        <ProposalModal job={job} onClose={() => setOpen(false)} />
      )}

    </div>
  );
}

export default JobCard;
