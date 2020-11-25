import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../Assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar, hideNavbar } from "../../redux/actions/uiActions";

export default function Navbar() {
  const showNavbar = useSelector((state) => state.UI.showNavbar);
  const dispatch = useDispatch();

  return (
    <div className="navbar-container">
      <nav className={showNavbar ? "navbar-nav" : " navbar-nav hideNav"}>
        <div className="logo-div">
          <NavLink to={`/`}>
            {" "}
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <ul className="nav-ul">
          <li className="nav-li">
            <NavLink
              to={`/`}
              activeStyle={{
                fontWeight: "500",
                color: "#e8c79c",
              }}
              className="nav-li-link"
              exact
              onClick={() => dispatch(hideNavbar())}
            >
              Home
            </NavLink>
          </li>

          <li className="nav-li">
            <NavLink
              to="/about"
              activeStyle={{
                fontWeight: "500",
                color: "#e8c79c",
              }}
              className="nav-li-link"
              onClick={() => dispatch(hideNavbar())}
            >
              About
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/contact"
              activeStyle={{
                fontWeight: "500",
                color: "#e8c79c",
              }}
              exact
              className="nav-li-link"
              onClick={() => dispatch(hideNavbar())}
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/shop"
              activeStyle={{
                fontWeight: "500",
                color: "#e8c79c",
              }}
              exact
              className="nav-li-link"
              onClick={() => dispatch(hideNavbar())}
            >
              Shop
            </NavLink>
          </li>
          <li className="nav-li" style={{position:"relative"}}>
            <NavLink
              to="/cart"
              activeStyle={{
                fontWeight: "500",
                color: "#e8c79c",
              }}
              exact
              className="nav-li-link"
              onClick={() => dispatch(hideNavbar())}
            >
              Cart <i className="fas fa-cart-arrow-down"></i>
            </NavLink>
         
          </li>
        </ul>
      </nav>

      <div className="harmbuger-div" onClick={() => dispatch(toggleNavbar())}>
        {showNavbar ? (
          <i className="fas fa-times navbar-icon" style={{color:"#e8c79c"}}></i>
        ) : (
          <i className="fas fa-bars navbar-icon" ></i>
        )}
      </div>
    </div>
  );
}
