import React from "react";
import { Link } from "react-router-dom";
import "./shopnowlink.css";
function ShopNowLink({ title }) {
  return (
    <div className="brand-inner-div">
      <h2 className="branding-text">{title}</h2>
      <Link to="/shop" className="brand-inner-link">
        Shop Now
      </Link>
    </div>
  );
}

export default ShopNowLink;
