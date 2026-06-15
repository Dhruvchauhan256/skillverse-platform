import React from "react";
import "./GigCard.css";

function GigCard({ gig }) {
  return (
    <div className="gig-card">

      {/* FIXED: was className="gig-main-image", CSS expects .gig-image img */}
      <div className="gig-image">
        <img src={gig.image} alt={gig.title} />
      </div>

      <div className="gig-content">
        <div className="gig-user">
          <img src={gig.avatar} alt={gig.seller} />
          <div>
            <strong>{gig.seller}</strong>
            <p>Top Rated Seller</p>
          </div>
        </div>

        <h3 className="gig-title">{gig.title}</h3>

        <div className="gig-rating">
          ⭐ {gig.rating} ({gig.reviews} reviews)
        </div>

        <div className="gig-price">
          Starting at ₹{gig.price}
        </div>
      </div>

    </div>
  );
}

export default GigCard;
