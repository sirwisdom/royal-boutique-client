import React from "react";
import logo from "../../Assets/logo.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="col-md m-1 footer-logo-container">
        <div className="footer-logo-div">
          <img src={logo} alt="MFM logo" />
        </div>
        <p className="footer-logo-text">
          Copyright &copy; 2020, Royal Boutique and Clothings
        </p>
      </div>
    </footer>
  );
};
export default Footer;
