import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import avatarImg from "../../Assets/avatar.png";
import image8 from "../../Assets/img13.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { usersApiEndPoint } from "../../Utils/config";
import Preloader from "../../components/Preloader/Preloader";
// import { AuthenticateUser } from "../../utils/userAuth";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { setSnackbar } from "../../redux/actions/uiActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(5),
  },
  profileBranding: {
    height: "180px",
    backgroundImage: `url(${image8})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("xs")]: {
      height: "130px",
    },
  },
  profileContent: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  profileContentBranding: {
    position: "relative",
    width: "260px",
    background: theme.palette.yellow.dark,
    height: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  addProfilePicture: {
    position: "absolute",
    right: "20px",
    top: "-40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.grey[100],
    background: theme.palette.grey[900],
    boxShadow: "2px 3px 5px #a8a8a82c",
    zIndex: 30,
    "&:hover": {
      background: theme.palette.yellow.dark,
    },

    [theme.breakpoints.down("xs")]: {
      right: "50px",
      top: "-40px",
    },
    [theme.breakpoints.down("sm")]: {
      right: "75px",
      top: "-40px",
    },
    [theme.breakpoints.down("md")]: {
      right: "20px",
      top: "-50px",
    },
  },
  profileTitle: {
    color: theme.palette.yellow.dark,
  },
  profileContentInfo: {
    // background: "green",
    width: "calc(100% - 260px)",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  avatarImgStyle: {
    width: "200px",
    height: "200px",
    margin: "0 auto ",
    objectFit: "cover",
    transform: `translate(0px, -50px)`,
  },
  userName: {
    transform: `translate(0px, -30px)`,
    color: theme.palette.grey[100],
    textTransform: "capitalize",
  },
  userRole: {
    color: theme.palette.grey[300],
    textTransform: "capitalize",
  },
  editBtn: {
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
    margin: "2px auto",
    transform: `translate(0px, -30px)`,
    display: "block",
  },
  contentPaper: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: "3px",
    },
  },
  boxStyle: {
    marginBottom: theme.spacing(1),
    // padding: theme.spacing(1),
  },
}));

function MyProfile() {
  const classes = useStyles();
  const userData = useSelector((state) => state.user.data);
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userPicture, setUserPicture] = useState("");
  const imageRef = useRef();

  const handleOpenImage = () => {
    if (imageRef && !submitting) {
      imageRef.current.click();
    }
  };
  const handlePictureChange = (e) => {
    setUserPicture(e.target.files[0]);
    setSubmitting(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    axios
      .put(`${usersApiEndPoint}/picture/${userData._id}`, formData)
      .then((res) => {
        dispatch(
          setSnackbar(
            `Profile picture have been updated successfully`,
            "success"
          )
        );
        setSubmitting(false);
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);

        if (err.response && err.response.data && err.response.data.msg) {
          return dispatch(setSnackbar(`${err.response.data.msg}`, "error"));
        }
        if (err.message) {
          dispatch(setSnackbar(err.message, "error"));
        }

        setSubmitting(false);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${usersApiEndPoint}/${userData._id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);

  let decorator = {
    title: "My profile, | AE Wisdom Final Year Project Computer Sci. Dept FUO",
    description: "",
    keywords: " ",
  };
  if (userData && userData.firstName) {
    decorator.title = `${userData.firstName} ${userData.lastName}'s profile, | AE Wisdom Final Year Project Computer Sci. Dept FUO`;
  }
  return loading ? (
    <Preloader />
  ) : (
    <div className={classes.root}>
      <MetaDecorator decorator={decorator} />
      <section className={classes.profileBranding}></section>
      <Container>
        <section className={classes.profileContent}>
          <div className={classes.profileContentBranding}>
            <IconButton
              className={classes.addProfilePicture}
              onClick={() => handleOpenImage()}
            >
              <AddAPhotoIcon />{" "}
            </IconButton>
            <Avatar
              alt="profile"
              src={
                user.image
                  ? user.image
                  : userPicture
                  ? URL.createObjectURL(userPicture)
                  : avatarImg
              }
              className={classes.avatarImgStyle}
            />

            <Typography
              variant="h6"
              className={classes.userName}
              align="center"
            >
              {user.firstName} {user.lastName}
            </Typography>

            <Box component="div">
              <Button
                className={classes.editBtn}
                variant="contained"
                size="medium"
                onClick={() => history.push("/dashboard/edit-account")}
              >
                Edit Profile
              </Button>
              <input
                type="file"
                name="profilePicture"
                ref={imageRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handlePictureChange(e)}
              />
            </Box>
            <br />
          </div>
          <div className={classes.profileContentInfo}>
            <Paper elevation={0} className={classes.contentPaper}>
              <br />
              <Typography
                variant="h5"
                gutterBottom
                className={classes.profileTitle}
              >
                Personal Details
              </Typography>
              <Box className={classes.boxStyle}>
                <Typography
                  component="span"
                  variant="body1"
                  display="inline"
                  align="left"
                  color="textSecondary"
                >
                  Name:
                </Typography>{" "}
                <Typography variant="body1" display="inline" align="left">
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>

              <Box className={classes.boxStyle}>
                <Typography
                  component="span"
                  variant="body1"
                  display="inline"
                  align="left"
                  color="textSecondary"
                >
                  Phone:
                </Typography>{" "}
                <Typography variant="body1" display="inline" align="left">
                  {user.phone}
                </Typography>
              </Box>
              <Box className={classes.boxStyle}>
                <Typography
                  component="span"
                  variant="body1"
                  display="inline"
                  align="left"
                  color="textSecondary"
                >
                  Email:
                </Typography>{" "}
                <Typography variant="body1" display="inline" align="left">
                  {user.email}
                </Typography>
              </Box>
            </Paper>

            <Paper elevation={0} className={classes.contentPaper}>
              <br />
              <Typography
                variant="h5"
                gutterBottom
                className={classes.profileTitle}
              >
                Default Shipping Details
              </Typography>
              <Box className={classes.boxStyle}>
                <Typography
                  component="span"
                  variant="body1"
                  display="inline"
                  align="left"
                  color="textSecondary"
                >
                  Addreess:
                </Typography>{" "}
                <Typography variant="body1" display="inline" align="left">
                  {user?.shippingLocation?.address}
                </Typography>
              </Box>

              <Box className={classes.boxStyle}>
                <Typography
                  component="span"
                  variant="body1"
                  display="inline"
                  align="left"
                  color="textSecondary"
                >
                  City:
                </Typography>{" "}
                <Typography variant="body1" display="inline" align="left">
                  {user?.shippingLocation?.city}
                </Typography>
              </Box>
              <Box className={classes.boxStyle}>
                <Typography
                  component="span"
                  variant="body1"
                  display="inline"
                  align="left"
                  color="textSecondary"
                >
                  State:
                </Typography>{" "}
                <Typography variant="body1" display="inline" align="left">
                  {user?.shippingLocation?.state}
                </Typography>
              </Box>
            </Paper>
            <Grid container>
              <Grid item sm={6}></Grid>
              <Grid item sm={6}></Grid>
            </Grid>
          </div>
        </section>
      </Container>
    </div>
  );
}

// export default AuthenticateUser(MyProfile);
export default MyProfile;
