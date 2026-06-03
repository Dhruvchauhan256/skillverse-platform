import React from "react";

function Filters() {
  return (
    <div className="card p-3 shadow-sm">
      <h5>Filters</h5>

      <hr />

      <h6>Category</h6>

      <select className="form-select mb-3">
        <option>All Categories</option>
        <option>Web Development</option>
        <option>Mobile Apps</option>
        <option>UI/UX Design</option>
        <option>Digital Marketing</option>
      </select>

      <h6>Skills</h6>

      <div>
        <input type="checkbox" /> React
      </div>

      <div>
        <input type="checkbox" /> Node.js
      </div>

      <div>
        <input type="checkbox" /> MongoDB
      </div>

      <div>
        <input type="checkbox" /> PHP
      </div>

      <h6 className="mt-3">Budget</h6>

      <select className="form-select mb-3">
        <option>Any Budget</option>
        <option>₹500 - ₹5,000</option>
        <option>₹5,000 - ₹20,000</option>
        <option>₹20,000+</option>
      </select>

      <h6>Rating</h6>

      <select className="form-select">
        <option>All Ratings</option>
        <option>4+ Stars</option>
        <option>4.5+ Stars</option>
        <option>5 Stars</option>
      </select>
    </div>
  );
}

export default Filters;
