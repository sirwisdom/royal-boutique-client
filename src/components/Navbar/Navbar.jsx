import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../Assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../redux/actions/userActions";
import { toggleNavbar, hideNavbar } from "../../redux/actions/uiActions";

export default function Navbar() {
  const userData = useSelector((state) => state.user);
  const showNavbar = useSelector((state) => state.UI.showNavbar);
  const dispatch = useDispatch();

  return (
    <div className="navbar-container">
      {userData && userData.isAuthenticated ? (
        <nav className={showNavbar ? "navbar-nav" : " navbar-nav hideNav"}>
          <div className="logo-div">
            <NavLink to={`/dashboard`}>
              {" "}
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <ul className="nav-ul">
            <li className="nav-li">
              <NavLink
                to={`/dashboard`}
                activeStyle={{
                  fontWeight: "500",
                  color: "#cf0358",
                }}
                className="nav-li-link"
                exact
                onClick={() => dispatch(hideNavbar())}
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-li">
              <NavLink
                to={`/dashboard/${userData.data._id}/uploadsermon`}
                activeStyle={{
                  fontWeight: "500",
                  color: "#cf0358",
                }}
                className="nav-li-link"
                onClick={() => dispatch(hideNavbar())}
              >
                Upload Sermons
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink
                to={`/dashboard/${userData.data._id}/livepage`}
                activeStyle={{
                  fontWeight: "500",
                  color: "#cf0358",
                }}
                exact
                className="nav-li-link"
                onClick={() => dispatch(hideNavbar())}
              >
                Live
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink
                to={`/dashboard/${userData.data._id}/approvetestimonies`}
                activeStyle={{
                  fontWeight: "500",
                  color: "#cf0358",
                }}
                exact
                className="nav-li-link"
                onClick={() => dispatch(hideNavbar())}
              >
                Approve Testimonies
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink
                to="/login"
                activeStyle={{
                  fontWeight: "500",
                  color: "#cf0358",
                }}
                className="nav-li-link"
                onClick={() => {
                  dispatch(logOutUser());
                  dispatch(hideNavbar());
                }}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={showNavbar ? "navbar-nav" : " navbar-nav hideNav"}>
          <div className="logo-div">
            <img src={logo} alt="logo" />
          </div>
          <ul className="nav-ul">
            <li className="nav-li">
              <NavLink
                to="/login"
                activeStyle={{
                  fontWeight: "500",
                  color: "#cf0358",
                }}
                className="nav-li-link"
                exact
                onClick={() => dispatch(hideNavbar())}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      <div className="harmbuger-div" onClick={() => dispatch(toggleNavbar())}>
        {showNavbar ? (
          <i className="fas fa-times navbar-icon"></i>
        ) : (
          <i className="fas fa-bars navbar-icon"></i>
        )}
      </div>
    </div>
  );
}
