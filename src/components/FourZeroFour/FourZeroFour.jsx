import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./fourzerofour.css";

function FourZeroFour() {
  const userData = useSelector((state) => state.user);
  return (
    <div className="fourzerofour">
      <div className="fourzerofour-inner">
        <h2 className="fourzerofour-heading">Page Not Found</h2>
        {userData.isAuthenticated ? (
          <Link to={`/dashboard`} className="fourzerofour-link">
            Return Home
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default FourZeroFour;
