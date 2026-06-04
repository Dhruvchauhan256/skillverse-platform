import React from "react";
import "./GigCard.css";

function GigCard({ gig }) {
  return (
    <div className="gig-card">

      <div className="gig-image">
        <img src={gig.image} alt={gig.title} />
      </div>

      <div className="gig-content">

        <div className="gig-user">
          <img src={gig.avatar} alt="seller" />
          <span>{gig.seller}</span>
        </div>

        <h3>{gig.title}</h3>

        <div className="gig-rating">
          ⭐ {gig.rating} ({gig.reviews})
        </div>

        <div className="gig-price">
          From ₹{gig.price}
        </div>

      </div>
    </div>
  );
}

export default GigCard;
