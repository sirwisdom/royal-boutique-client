import React from "react";
import "./preloader.css";
import LoadingImage from "../Assets/preloader.gif";
function Preloader() {
  return (
    <div className="loading-div">
      <img src={LoadingImage} alt="loading" className="loading-icon" />
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Preloader;
