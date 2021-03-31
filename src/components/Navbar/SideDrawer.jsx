import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import OpenInBrowserRoundedIcon from "@material-ui/icons/OpenInBrowserRounded";
import routes from "../../Utils/routesLink";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  listTextStyle: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default function SideDrawer(props) {
  const { openDrawer, handleCloseDrawer } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleRouteChange = (url) => {
    history.push(`/${url}`);
    handleCloseDrawer();
  };
  return (
    <div>
      <React.Fragment>
        <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
          {
            <div className={classes.list} role="presentation">
              <List>
                {routes.map((item, index) => (
                  <>
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
                  </>
                ))}
                <ListItem button onClick={() => handleRouteChange("cart")}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="My Cart"
                    classes={{ primary: classes.listTextStyle }}
                  />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => handleRouteChange("account")}>
                  <ListItemIcon>
                    <PermIdentityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="My Account"
                    classes={{ primary: classes.listTextStyle }}
                  />
                </ListItem>
                <Divider />
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
              </List>
            </div>
          }
        </Drawer>
      </React.Fragment>
    </div>
  );
}
