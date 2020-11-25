import React from "react";
import { Link } from "react-router-dom";

const seeMoreStyle = {
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "150px",
  padding: "8px 5px",
  margin: "15px auto",
  background: "#333333",
  color: "#ffffff",
};
function FeatureSeeMoreButton({text}) {
  return (
    <Link to="/shop" style={seeMoreStyle}>
      {text}
    </Link>
  );
}

export default FeatureSeeMoreButton;
