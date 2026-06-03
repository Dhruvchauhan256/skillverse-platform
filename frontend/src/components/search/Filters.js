import React from "react";

function Filters() {
  return (
    <div className="card p-3">
      <h5>Filters</h5>

      <h6 className="mt-3">Skills</h6>

      <div>
        <input type="checkbox" /> React
      </div>

      <div>
        <input type="checkbox" /> Node.js
      </div>

      <div>
        <input type="checkbox" /> MongoDB
      </div>

      <h6 className="mt-3">Budget</h6>

      <select className="form-select">
        <option>Any Budget</option>
        <option>₹500 - ₹5,000</option>
        <option>₹5,000 - ₹20,000</option>
        <option>₹20,000+</option>
      </select>

      <h6 className="mt-3">Rating</h6>

      <select className="form-select">
        <option>Any Rating</option>
        <option>4+ Stars</option>
        <option>4.5+ Stars</option>
        <option>5 Stars</option>
      </select>
    </div>
  );
}

export default Filters;
