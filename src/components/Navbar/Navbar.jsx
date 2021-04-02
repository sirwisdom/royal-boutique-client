import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Assets/mylogo.png";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import routes from "../../Utils/routesLink";
import SideDrawer from "./SideDrawer";
import { logOutUser } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.grey[900],
  },
  logoDiv: {
    width: "150px",
    overflow: "hidden",
  },
  logo: {
    width: "50px",
    overflow: "hidden",
    objectFit: "cover",
  },
  navLinkStyle: {
    display: "inline-block",
    color: theme.palette.grey[100],
    textDecoration: "none",
    textTransform: "capitalize",
    fontSize: "12px",
    alignItems: "center",
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1, 2),
    transition: " all 1s linear",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",

    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "90%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",

    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  let totalCartItems = cartItems.reduce((total, item) => item.qty + total, 0);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push("/dashboard");
          handleMenuClose();
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={() => dispatch(logOutUser())}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleOpenDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoDiv}>
            <img src={logo} alt="logo" className={classes.logo} />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <div className={classes.routesLinkDiv}>
              {routes.map((route, index) => (
                <NavLink
                  key={index}
                  to={route.path}
                  className={classes.navLinkStyle}
                >
                  {" "}
                  {route.label}{" "}
                </NavLink>
              ))}
            </div>

            {userData.isAuthenticated ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <NavLink to="/login" className={classes.navLinkStyle}>
                Login
              </NavLink>
            )}
            <IconButton
              onClick={() => history.push("/cart")}
              aria-label="show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalCartItems} color="secondary">
                <ShoppingCartRoundedIcon />
              </Badge>
            </IconButton>
          </div>
          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}
        </Toolbar>
      </AppBar>
      <SideDrawer
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
      />
      {/* {renderMobileMenu} */}
      {renderMenu}
    </div>
  );
}
