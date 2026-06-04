import React from "react";
import "./GigCard.css";

function GigCard({ gig }) {
  return (
    <div className="gig-card">

      {/* IMAGE */}
      <div className="gig-image">
        <img
          src={gig.image || "https://via.placeholder.com/300"}
          alt={gig.title}
        />
      </div>

      {/* CONTENT */}
      <div className="gig-content">

        <div className="gig-user">
          <img src={gig.avatar} alt="user" />
          <span>{gig.seller}</span>
        </div>

        <h3 className="gig-title">{gig.title}</h3>

        <div className="gig-rating">
          ⭐ {gig.rating} ({gig.reviews})
        </div>

        <div className="gig-price">
          From <b>${gig.price}</b>
        </div>

      </div>
    </div>
  );
}

export default GigCard;
