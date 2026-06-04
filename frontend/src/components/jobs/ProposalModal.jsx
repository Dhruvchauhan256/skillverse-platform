import React, { useState } from "react";
import "./ProposalModal.css";

function ProposalModal({ job, onClose }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [bid, setBid] = useState("");

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Send Proposal</h2>
        <p><b>Job:</b> {job.title}</p>

        <textarea
          placeholder="Write your cover letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />

        <input
          type="number"
          placeholder="Your bid ($)"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="submit-btn">Submit</button>
        </div>

      </div>

    </div>
  );
}

export default ProposalModal;
