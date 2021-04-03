import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import RecentOrders from "./RecentOrders";
import axios from "axios";
import { useSelector } from "react-redux";
import { usersApiEndPoint } from "../../Utils/config";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(9),
    width: "100%",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  cardRoot: {
    background: `linear-gradient(rgba(216, 179, 16, 0.8), rgb(190, 117, 0))`,
    boxShadow: ` 2px 3px 6px rgba(93, 92, 75, 0.829) `,
    backdropFilter: `blur(80px)`,
  },
  cardHeaderBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1.4),
  },
  cardHeaderTitle: {
    fontWeight: 500,
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
    color: theme.palette.grey[50],
    [theme.breakpoints.down("sm")]: {
      fontWeight: 400,
      fontSize: "1.1rem",
    },
  },
  mainCardText: {
    fontWeight: 700,
    textTransform: "uppercase",
    fontFamily: "Poppins, sans-serif",
    color: theme.palette.grey[50],
    [theme.breakpoints.down("sm")]: {
      fontWeight: 500,
      fontSize: "1.6rem",
    },
  },
  secondaryCardText: {
    fontFamily: "Poppins, sans-serif",
    color: theme.palette.grey[50],
  },
  cardContentBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardOrderIcon: {
    fontSize: "3rem",
    color: theme.palette.grey[50],
    transform: `translateX(-20px)`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  cardIconButton: {
    color: theme.palette.grey[50],
    background: theme.palette.yellow.dark,
  },

  categoryImage: {
    objectFit: "contain",
    width: "50px",
    height: "50px",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  knowMoreBtn: {
    marginTop: theme.spacing(1),
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
    color: theme.palette.grey[50],
    background: theme.palette.grey[900],
    borderRadius: "15px",
    transition: "all 0.5s ease-in",
    "&:hover": {
      background: theme.palette.yellow.dark,
    },
  },
}));

export function CustomizedCards(props) {
  const classes = useStyles(props);
  const history = useHistory();

  const {
    cardHeaderTitleValue,
    mainCardTextValue,
    secondaryTextValue,
    cardIconValue,
    routePath,
  } = props;

  return (
    <Card className={classes.cardRoot}>
      <Box className={classes.cardHeaderBox} pl={2} pr={2} pt={1} mb={2}>
        {" "}
        <Typography className={classes.cardHeaderTitle} variant="h6">
          {cardHeaderTitleValue}
        </Typography>{" "}
        <IconButton
          onClick={() => history.push(routePath)}
          size="small"
          className={classes.cardIconButton}
        >
          <MoreVertIcon />{" "}
        </IconButton>
      </Box>
      <CardContent>
        <Box className={classes.cardContentBox} mb={1}>
          {" "}
          <Typography
            gutterBottom
            className={classes.mainCardText}
            variant="h4"
            color="textPrimary"
            component="p"
          >
            {mainCardTextValue}
          </Typography>
          {cardIconValue ? (
            cardIconValue
          ) : (
            <ShoppingCartRoundedIcon className={classes.cardOrderIcon} />
          )}
        </Box>
        <Typography
          gutterBottom
          variant="body2"
          className={classes.secondaryCardText}
          component="p"
        >
          {secondaryTextValue}
        </Typography>
        <Button
          variant="outlined"
          className={classes.knowMoreBtn}
          startIcon={<VisibilityRoundedIcon />}
          size="small"
          onClick={() => history.push(routePath)}
        >
          Know More
        </Button>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const classes = useStyles();
  const [dashboardCounts, setDashboardCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.user.data);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${usersApiEndPoint}/dashboard/${userData._id}`)
      .then((res) => {
        setDashboardCounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userData._id]);

  return (
    <div className={classes.root}>
      <Container elevation={0} component={Paper} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            {" "}
            <CustomizedCards
              routePath="/dashboard/my-orders"
              cardHeaderTitleValue="Orders"
              mainCardTextValue={!loading && dashboardCounts?.orderCount}
              secondaryTextValue="Total Number of times you made orders"
              colorValue="#089b14"
              cardIconValue={
                <ShoppingCartRoundedIcon className={classes.cardOrderIcon} />
              }
            />{" "}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {" "}
            <CustomizedCards
              routePath="/dashboard/my-account"
              cardHeaderTitleValue="Account"
              mainCardTextValue=""
              secondaryTextValue="Manage your account"
              colorValue="#089b14"
              cardIconValue={
                <FaceRoundedIcon className={classes.cardOrderIcon} />
              }
            />{" "}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {" "}
            <CustomizedCards
              routePath="/dashboard/my-messages"
              cardHeaderTitleValue="Notifications"
              mainCardTextValue={6}
              secondaryTextValue="Your Messages and Notifications"
              colorValue="#089b14"
              cardIconValue={
                <NotificationsActiveRoundedIcon
                  className={classes.cardOrderIcon}
                />
              }
            />{" "}
          </Grid>
        </Grid>
      </Container>
      <RecentOrders />
    </div>
  );
}

export default Dashboard;
