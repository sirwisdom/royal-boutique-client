import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { productsApiEndpoint } from "../../Utils/config";
import ProductSkeleton from "../../components/ProductSkeleton/ProductSkeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const useStyles = makeStyles((theme) => ({
  featuredProductsBox: {},
  featuredProductsTitle: {
    //   fontFamily: ""
    fontWeight: "bold",
    textAlign: "center",
  },
  featuredProductRoot: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  bold: {
    fontWeight: 700,
    color: theme.palette.yellow.dark,
  },
  itemSkeleton: {
    marginBottom: theme.spacing(1),
  },
  swipperStyle: {
    background: "purple",
  },
  cardRoot: {
    maxWidth: 345,
    margin: theme.spacing(0, 0.5),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    cursor: "pointer",
  },
  productTitle: {
    fontWeight: 700,
    margin: theme.spacing(0, 0.5),
  },
  productTypesBox: {
    display: "flex",
  },
  productInfo: {
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
    margin: theme.spacing(0, 0.5),
  },
}));

const FeaturedProducts = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const responsive = {
    desktop: {
      breakpoint: {
        max: 6000,
        min: 1024,
      },
      items: 4,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  useEffect(() => {
    axios
      .get(`${productsApiEndpoint}/featured`)
      .then((res) => {
        setFeaturedProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container className={classes.featuredProductRoot}>
      {featuredProducts && featuredProducts.length > 0 && (
        <Box mt={3} mb={3}>
          <Typography
            gutterBottom
            className={classes.featuredProductsTitle}
            variant={matches ? "h5" : "body1"}
          >
            Check These Featured Products Out
          </Typography>
        </Box>
      )}
      {loading ? (
        <Box className={classes.featuredProductsBox} mb={2}>
          <Grid
            container
            spacing={2}
            alignContent="center"
            className={classes.headerGrid}
          >
            {[...new Array(4)].map((item, index) => {
              return (
                <Grid key={index} item xs={6} sm={4} md={3}>
                  <ProductSkeleton />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Carousel arrows infinite responsive={responsive}>
          {featuredProducts.length > 0 &&
            featuredProducts.map((item, index) => {
              return (
                <Card className={classes.cardRoot} key={item._id}>
                  <CardMedia
                    className={classes.media}
                    image={`${item.images[0]}`}
                    title="Shop Product"
                    onClick={() =>
                      history.push(`/shop/${item.productName}/${item._id}`)
                    }
                  />
                  <CardContent>
                    <Box mt={1} mb={1} className={classes.productTypesBox}>
                      {item.types && item.types.length > 0 ? (
                        item.types.map((type, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: "13px",
                              height: "13px",
                              background: `${type.color}`,
                              borderRadius: "50%",
                              marginRight: "4px",
                            }}
                          />
                        ))
                      ) : (
                        <Typography variant="caption" className={classes.bold}>
                          No Variations (Only One Color)
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      variant={matches ? "body1" : "h6"}
                      color="textPrimary"
                      component="p"
                      className={classes.productTitle}
                    >
                      {item.productName}
                    </Typography>
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => (
                        <Typography
                          className={classes.productInfo}
                          variant="body1"
                          component="p"
                          align="left"
                        >
                          {" "}
                          NGN {value}
                        </Typography>
                      )}
                    />{" "}
                  </CardContent>
                </Card>
              );
            })}
        </Carousel>
      )}
    </Container>
  );
};

export default FeaturedProducts;
