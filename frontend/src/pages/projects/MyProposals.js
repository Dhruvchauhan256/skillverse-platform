import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/proposals/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProposals(res.data.proposals);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Proposals</h2>

      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className="card p-3 mb-3"
        >
          <h4>{proposal.project.title}</h4>

          <p>
            Bid Amount: ₹{proposal.bidAmount}
          </p>

          <p>
            Delivery: {proposal.deliveryDays} days
          </p>

          <p>
            Status: {proposal.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyProposals;