import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React from "react";
import Slider from "react-slick";
import img1 from "../../Assets/bg3.png";
import img2 from "../../Assets/img2.jpeg";
import img3 from "../../Assets/bg4edit.png";
// import img4 from "../../Assets/img4.jpg";

const useStyles = makeStyles((theme) => ({
  heroHeaderContainer: {
    height: "80vh",
  },
  slideBrandingOne: {
    height: "100%",
    overflow: "hidden",
    // backgroundColor: "green",
  },
  sliderStyle: {
    height: "100%",
  },
  heroHeaderTitleStyle: {
    textTransform: "uppercase",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
  },
  heroHeaderInfoText: {
    fontFamily: "Poppins, sans-serif",
  },
  textInfo: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  slideBrandingGrid: {
    // backgroundColor: "purple",
  },
  slideInfoGrid: {},
  slideBrandingDiv: {
    overflow: "hidden",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  slideBrandingImg: {
    width: "85%",
    overflow: "hidden",
    height: "85%",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      height: "62%",
    },
  },
  slideBrandingImgKid: {
    width: "80%",
    overflow: "hidden",
    height: "80%",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      height: "60%",
    },
  },
  womenBtn: {
    margin: theme.spacing(2, 0),
    color: theme.palette.grey[50],
    background: theme.palette.grey[900],
    borderRadius: "20px",
  },
  kidsBtn: {
    margin: theme.spacing(2, 0),
    color: theme.palette.grey[50],
    background: theme.palette.secondary.dark,
    borderRadius: "20px",
  },
}));
const HeroHeader = () => {
  const classes = useStyles();
  const settings = {
    arrows: true,
    dots: false,
    fade: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    className: "sliderStyle",
  };
  return (
    <div className={classes.heroHeaderContainer}>
      <Slider className="sliderStyle" {...settings}>
        <div className="hero-header-slide-1">
          <Grid className={classes.slideBrandingOne} container>
            <Grid
              className={classes.slideBrandingGrid}
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
            >
              <div className={classes.slideBrandingDiv}>
                <img
                  src={img1}
                  alt="fashion brand"
                  className={classes.slideBrandingImg}
                />
              </div>
            </Grid>
            <Grid
              className={classes.slideInfoGrid}
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
            >
              <Box p={2} className={classes.textInfo}>
                <Typography
                  className={classes.heroHeaderTitleStyle}
                  variant="h5"
                  align="center"
                  component="h2"
                >
                  OUR WOMEN COLLECTIONS ARE OUTSTANDING
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  align="center"
                  component="p"
                  className={classes.heroHeaderInfoText}
                >
                  We provide a unique collection of wears that makes every women
                  stand out like the star they are meant to be and nothing less.
                </Typography>
                <Button
                  className={classes.womenBtn}
                  variant="contained"
                  size="large"
                >
                  Shop Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
        <div className="hero-header-slide-1">
          <Grid
            direction="row-reverse"
            className={classes.slideBrandingOne}
            container
          >
            <Grid
              className={classes.slideBrandingGrid}
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
            >
              <div className={classes.slideBrandingDiv}>
                <img
                  src={img2}
                  alt="fashion brand"
                  className={classes.slideBrandingImg}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box p={2} className={classes.textInfo}>
                <Typography
                  className={classes.heroHeaderTitleStyle}
                  variant="h5"
                  align="center"
                  component="h2"
                >
                  COLLECTIONS UNIQUELY TAILORED TO SUIT YOUR TASTE
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  align="center"
                  component="p"
                  className={classes.heroHeaderInfoText}
                >
                  We got your taste covered anytime, ranging from all male to
                  female, kids and unisex. Just to make you feel good and give
                  you the treatment you deserve
                </Typography>
                <Button
                  className={classes.womenBtn}
                  variant="contained"
                  size="large"
                >
                  Shop Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
        <div className="hero-header-slide-1">
          <Grid className={classes.slideBrandingOne} container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className={classes.slideBrandingDiv}>
                <img
                  src={img3}
                  alt="fashion brand"
                  className={classes.slideBrandingImgKid}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box p={2} className={classes.textInfo}>
                <Typography
                  className={classes.heroHeaderTitleStyle}
                  variant="h5"
                  align="center"
                  component="h2"
                >
                  WE'VE GOT YOUR KIDS COVERED
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  align="center"
                  component="p"
                  className={classes.heroHeaderInfoText}
                >
                  Every child is a gift, a beautiful gem to behold and cherish,
                  they should be treaded as such without any reservation.
                </Typography>
                <Button
                  className={classes.kidsBtn}
                  variant="contained"
                  size="large"
                >
                  Shop Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Slider>
    </div>
  );
};

export default HeroHeader;
