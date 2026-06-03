import React, { useState } from "react";
import FreelancerCard from "../../components/freelancer/FreelancerCard";

function CategorySearch() {
  const [category, setCategory] = useState("React");

  const data = [
    { name: "Rahul Patel", role: "React Developer", rating: 4.9, skills: ["React"] },
    { name: "Priya Shah", role: "UI Designer", rating: 4.8, skills: ["UI"] },
    { name: "Aman Verma", role: "Full Stack Developer", rating: 4.7, skills: ["React", "Node"] },
  ];

  const filtered = data.filter((f) =>
    f.skills.includes(category)
  );

  return (
    <div className="container mt-5">
      <h2>Search by Category</h2>

      <select
        className="form-select mb-4"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="React">React</option>
        <option value="UI">UI</option>
        <option value="Node">Node</option>
      </select>

      {filtered.map((user, i) => (
        <FreelancerCard key={i} user={user} />
      ))}
    </div>
  );
}

export default CategorySearch;
