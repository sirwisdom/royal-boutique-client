import React from "react";
import "./disabledbutton.css";
function DisabledButton({ text }) {
  return (
    <button type="button" disabled className="disabled-btn">
      {text}
    </button>
  );
}

export default DisabledButton;
