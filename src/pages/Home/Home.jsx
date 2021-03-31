import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { productApiEndpoint } from "../../Utils/config";
import Image1 from "../../Assets/img11.png";
import Image2 from "../../Assets/img3.jpg";
import Image7 from "../../Assets/img7.jpeg";
import Image5 from "../../Assets/img12.jpeg";
import "./home.css";
import HeroHeader from "./HeroHeader";
import FeaturedProducts from "./FeaturedProducts";
import DiscountProduct from "./DiscountProduct";

const collections = [
  { title: "Women", image: Image1 },
  { title: "Men's", image: Image2 },
  { title: "Kid's", image: Image7 },
  { title: "Unisex", image: Image5 },
];
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  collectionHeader: {
    fontFamily: "Cormorant Garamond, serif",
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
  categoryDiv: {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
    backgroundImage: (props) =>
      props.data && props.data.image
        ? `url(${props.data.image})`
        : `url(${Image1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryDivImg: {
    width: "100%",
    height: "100%",

    // bottom: "0px",
    // width: "100%",
    // zIndex: -2,
    // objectFit: "contain",
  },
  buttonStyle: {
    // width: "100px",
    textAlign: "center",
    padding: theme.spacing(2, 5),
    background: "#492a029d",
    border: "none",
    color: theme.palette.grey[100],
    fontSize: "20px",
    fontWeight: "bold",
    outline: "none",
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

export const CustomCard = (props) => {
  const classes = useStyles(props);
  return (
    <Grid xs={6} md={3} item>
      <div className={classes.categoryDiv}>
        <button className={classes.buttonStyle}>{props.data.title}</button>
      </div>
    </Grid>
  );
};

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles(collections);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={classes.root}>
      <HeroHeader />

      {/* Begining of Explore our collections Section    */}
      <div>
        <Typography
          variant={matches ? "h4" : "h5"}
          className={classes.collectionHeader}
          align="center"
        >
          Expolore Our Collections
        </Typography>

        <Container>
          <Grid spacing={1} container>
            {" "}
            {collections.map((item, index) => (
              <CustomCard key={index} data={item} />
            ))}
          </Grid>
        </Container>
      </div>
      {/* End of Explore our collections Section    */}

      {/* Begining of Explore our collections Section    */}
      <section>
        <FeaturedProducts />

        <DiscountProduct />
      </section>
    </div>
  );
}

export default Home;
