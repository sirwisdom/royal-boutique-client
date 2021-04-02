import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import OpenInBrowserRoundedIcon from "@material-ui/icons/OpenInBrowserRounded";
import routes from "../../Utils/routesLink";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../Assets/mylogo.png";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  listTextStyle: {
    fontFamily: "Poppins, sans-serif",
  },
  logoSection: {
    width: "100%",
    height: "40px",
    paddingLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "55px",
    objectFit: "contain",
  },
}));

export default function SideDrawer(props) {
  const { openDrawer, handleCloseDrawer } = props;
  const classes = useStyles();
  const history = useHistory();

  const userData = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  let totalCartItems = cartItems.reduce((total, item) => item.qty + total, 0);
  const handleRouteChange = (url) => {
    history.push(`/${url}`);
    handleCloseDrawer();
  };
  return (
    <div>
      <React.Fragment>
        <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
          <section className={classes.logoSection}>
            <img src={logo} alt="wisdom's logo" className={classes.logo} />
          </section>
          <Divider />
          {
            <div className={classes.list} role="presentation">
              <List>
                {routes.map((item, index) => (
                  <div key={index}>
                    <ListItem
                      button
                      key={index}
                      onClick={() => {
                        history.push(item.path);
                        handleCloseDrawer();
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        classes={{ primary: classes.listTextStyle }}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}

                {userData.isAuthenticated ? (
                  <>
                    <ListItem
                      button
                      onClick={() => handleRouteChange("account")}
                    >
                      <ListItemIcon>
                        <PermIdentityIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="My Account"
                        classes={{ primary: classes.listTextStyle }}
                      />
                    </ListItem>
                    <Divider />
                  </>
                ) : (
                  <>
                    <ListItem button onClick={() => handleRouteChange("login")}>
                      <ListItemIcon>
                        <OpenInBrowserRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Login"
                        classes={{ primary: classes.listTextStyle }}
                      />
                    </ListItem>
                    <Divider />
                  </>
                )}
                <ListItem button onClick={() => handleRouteChange("cart")}>
                  <ListItemIcon>
                    <Badge badgeContent={totalCartItems} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary="My Cart"
                    classes={{ primary: classes.listTextStyle }}
                  />
                </ListItem>
                <Divider />
              </List>
            </div>
          }
        </Drawer>
      </React.Fragment>
    </div>
  );
}
