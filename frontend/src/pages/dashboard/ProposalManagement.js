import React, { useEffect, useState } from "react";
import axios from "axios";

function ProposalManagement() {
  const [projectId, setProjectId] = useState("");
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProposals = async () => {
    if (!projectId) {
      alert("Enter Project ID");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/proposals/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProposals(res.data.proposals);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load proposals"
      );
    } finally {
      setLoading(false);
    }
  };

  const acceptProposal = async (proposalId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/proposals/accept/${proposalId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Proposal Accepted ✅");

      fetchProposals();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to accept proposal"
      );
    }
  };

  const rejectProposal = async (proposalId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/proposals/reject/${proposalId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Proposal Rejected ❌");

      fetchProposals();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to reject proposal"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        Proposal Management
      </h2>

      <div className="card p-3 mb-4">
        <label className="form-label">
          Project ID
        </label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter Project ID"
          value={projectId}
          onChange={(e) =>
            setProjectId(e.target.value)
          }
        />

        <button
          className="btn btn-primary mt-3"
          onClick={fetchProposals}
        >
          Load Proposals
        </button>
      </div>

      {loading ? (
        <h4>Loading...</h4>
      ) : (
        proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="card p-3 mb-3 shadow-sm"
          >
            <h5>
              Freelancer:{" "}
              {proposal.freelancer?.name}
            </h5>

            <p>
              Email:{" "}
              {proposal.freelancer?.email}
            </p>

            <p>
              Cover Letter:
              <br />
              {proposal.coverLetter}
            </p>

            <p>
              Bid Amount: ₹
              {proposal.bidAmount}
            </p>

            <p>
              Delivery Days:{" "}
              {proposal.deliveryDays}
            </p>

            <p>
              Status:
              <strong>
                {" "}
                {proposal.status}
              </strong>
            </p>

            {proposal.status ===
              "pending" && (
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() =>
                    acceptProposal(
                      proposal.id
                    )
                  }
                >
                  Accept
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    rejectProposal(
                      proposal.id
                    )
                  }
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ProposalManagement;