import React from "react";
import SearchBar from "../../components/search/SearchBar";
import Filters from "../../components/search/Filters";

function FreelancerSearch() {
  return (
    <div className="container mt-5">
      <SearchBar />

      <div className="row mt-4">
        <div className="col-lg-3">
          <Filters />
        </div>

        <div className="col-lg-9">
          <div className="card p-3 mb-3">
            <h4>Rahul Patel</h4>
            <p>React Developer</p>
            <p>⭐⭐⭐⭐⭐ 4.9</p>
          </div>

          <div className="card p-3 mb-3">
            <h4>Priya Shah</h4>
            <p>UI/UX Designer</p>
            <p>⭐⭐⭐⭐⭐ 4.8</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerSearch;
