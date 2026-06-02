import React from "react";
import CategoryCard from "../CategoryCard";

function Categories() {
  const categories = [
    "Web Development",
    "UI/UX Design",
    "AI & Machine Learning",
    "Mobile App Development",
    "Digital Marketing",
    "SEO",
    "Content Writing",
    "Graphic Design"
  ];

  return (
    <section className="categories">
      <h2>Popular Categories</h2>

      <div className="grid">
        {categories.map((category, index) => (
          <CategoryCard key={index} title={category} />
        ))}
      </div>
    </section>
  );
}

export default Categories;
