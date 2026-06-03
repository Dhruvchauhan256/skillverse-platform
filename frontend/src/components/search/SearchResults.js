import React from "react";
import FreelancerCard from "./FreelancerCard";

function SearchResults({ data, query }) {
  if (!query) return null;

  return (
    <div className="mt-4">
      {data.length === 0 ? (
        <p className="text-muted">No freelancers found</p>
      ) : (
        data.map((user, index) => (
          <FreelancerCard key={index} user={user} />
        ))
      )}
    </div>
  );
}

export default SearchResults;
