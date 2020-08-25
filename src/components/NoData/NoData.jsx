import React from "react";
import "./nodata.css";

function NoData({ text }) {
  return (
    <div className="nodata-container">
      <h2 className="nodata-inner-text">{text}</h2>
    </div>
  );
}

export default NoData;
