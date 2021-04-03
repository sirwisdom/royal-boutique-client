import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
import "./fourzerofour.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(9),
    width: "100%",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  innerBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryErrorText: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  errorButton: {
    marginTop: theme.spacing(1),
    fontWeight: 400,
    width: "200px",
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
    color: theme.palette.grey[50],
    background: theme.palette.grey[900],
    borderRadius: "30px",
    transition: "all 0.5s ease-in",
    "&:hover": {
      background: theme.palette.grey[700],
    },
  },
}));

function FourZeroFour() {
  const userData = useSelector((state) => state.user);
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <h1 className="errorHeader">Oops!</h1>
      <Typography
        align="center"
        color="texPrimary"
        className={classes.secondaryErrorText}
      >
        404 - PAGE NOT FOUND{" "}
      </Typography>
      <Box className={classes.innerBox}>
        {" "}
        <Typography
          variant="body2"
          align="center"
          color="textPrimary"
          className={classes.capitalize}
        >
          The page you are looking for does not exist, if you think something is
          broken please contact us
        </Typography>
        <Box>
          {" "}
          {userData.isAuthenticated ? (
            <Button
              onClick={() => history.push("/dashboard")}
              size="large"
              className={classes.errorButton}
            >
              Return Home
            </Button>
          ) : (
            <Button
              onClick={() => history.push("/")}
              size="large"
              className={classes.errorButton}
            >
              Return Home
            </Button>
          )}
        </Box>{" "}
      </Box>
    </div>
  );
}

export default FourZeroFour;
