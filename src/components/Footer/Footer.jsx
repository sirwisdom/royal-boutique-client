import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// import logo from "../../Assets/logo.png";
import "./footer.css";

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.grey[50],
    fontWeight: "bold",
  },
  box: {
    backgroundColor: theme.palette.grey[900],
  },
}));
function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.box} p={3}>
      <Typography
        variant="body2"
        color="textPrimary"
        align="center"
        className={classes.text}
      >
        {"Copyright © "} {new Date().getFullYear()}
        {","}
        A. E Wisdom , Final Year Project, Computer Sci. Dept. FUO{" "}
      </Typography>{" "}
    </Box>
  );
}
export default Footer;
