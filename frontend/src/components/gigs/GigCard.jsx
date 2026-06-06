import React from "react";
import "./GigCard.css";

function GigCard({ gig }) {
  return (
    <div className="gig-card">

      <img
        src={gig.image}
        alt={gig.title}
        className="gig-main-image"
      />

      <div className="gig-content">

        <div className="gig-user">
          <img src={gig.avatar} alt="" />

          <div>
            <strong>{gig.seller}</strong>
            <p>Top Rated Seller</p>
          </div>
        </div>

        <h3 className="gig-title">
          {gig.title}
        </h3>

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
