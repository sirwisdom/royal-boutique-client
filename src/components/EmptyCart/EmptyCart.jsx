import React from "react";
import image from "../../Assets/img2.jpeg";
import FeatureSeeMoreButton from "../FeatureSeeMoreButton/FeatureSeeMoreButton";
import "./emptycart.css";
function EmptyCart() {
  return (
    <div className="emptycart-container">
      <section className="emptycart-branding">
        <img src={image} alt="clothes" className="emptycart-img" />
      </section>
      <section className="emptycart-text-section">
        <h1 className="emptycart-heading">
          <span className="emptycart-heading-colored"> Oops,</span> Your Cart is
          Empty
        </h1>
        <p>Don't worry, you can add items to cart</p>
        <FeatureSeeMoreButton text="Shop Now" />
      </section>
    </div>
  );
}

export default EmptyCart;
