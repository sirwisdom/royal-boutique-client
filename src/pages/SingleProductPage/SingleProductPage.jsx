import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import NumberFormat from "react-number-format";
import axios from "axios";
import { useDispatch } from "react-redux";
import { productsApiEndpoint } from "../../Utils/config";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Preloader from "../../components/Preloader/Preloader";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import "./singleproductpage.css";
import { addItemToCart } from "../../redux/actions/cartActions";
import { setSnackbar } from "../../redux/actions/uiActions";

Swiper.use([Navigation, Pagination]);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  productTitle: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    color: theme.palette.yellow.dark,
    textAlign: "left",
    textTransform: "uppercase",
  },
  productDiscountPrice: {
    color: theme.palette.grey[600],
    textDecoration: "line-through",
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
    marginRight: theme.spacing(2.5),
  },
  newPrice: {
    color: theme.palette.yellow.dark,
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
  },
  productPrice: {
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
  },
  productDescriptionStyle: {
    fontWeight: 600,
    textTransform: "uppercase",
    fontFamily: "Poppins, sans-serif",
  },
  productImgDivStyle: {
    // background: "yellow",
    width: "95%",
    height: "400px",
    overflow: "hidden",
  },
  productImgStyle: {
    width: "100%",
    height: "90%",
    objectFit: "contain",
    overflow: "hidden",
  },
  typesColorBox: {
    display: "flex",
  },
  productSizeSpan: {
    display: "inline-block",
    margin: theme.spacing(1, 3, 1, 0),
    padding: theme.spacing(0.5, 1),
    border: "1px solid gray",
    cursor: "pointer",
  },
  productSpanSelected: {
    display: "inline-block",
    margin: theme.spacing(1, 3, 1, 0),
    padding: theme.spacing(0.5, 1),
    border: `1px solid ${theme.palette.yellow.main}`,
    cursor: "pointer",
    boxShadow: "0px 0px 4px #c0bdbdde",
  },
  productSize: {
    textTransform: "uppercase",
    fontFamily: "Poppins, sans-serif",
  },

  productTypesBox: {
    display: "flex",
  },
  productInfo: {
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
    margin: theme.spacing(0, 0.5),
  },
  buttonBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "350px",
    color: theme.palette.grey[50],
    background: "linear-gradient(to right, #8f5305, #584b3a)",
    transition: "all 0.5s ease-in",
    "&:hover": {
      background: theme.palette.grey[900],
    },
    [theme.breakpoints.down("xs")]: {
      width: "280px",
    },
  },
}));

const SingleProductDetail = (props) => {
  const { match } = props;
  const { params } = match;
  const { productId } = params;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const [isTypesImageAvailable, setisTypesImageAvailable] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [typesIndex, setTypesIndex] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleColorChange = (value) => {
    setTypesIndex(value);
    setisTypesImageAvailable(true);
    window.scrollBy({
      top: -window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  const responsive = {
    desktop: {
      breakpoint: {
        max: 6000,
        min: 1024,
      },
      items: 1,
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
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  useEffect(() => {
    axios
      .get(`${productsApiEndpoint}/${productId}`)
      .then((res) => {
        console.log("single;propsdruct", res.data);
        setProductData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  const handleAddToCart = (item) => {
    if (productData && productData.types && productData.types.length > 0) {
      if (!selectedSize) {
        return dispatch(
          setSnackbar(
            "Please select a size from the available sizes",
            "warning"
          )
        );
      }
    }

    const moreInfo = {};
    moreInfo.isTypesImageAvailable = isTypesImageAvailable;
    moreInfo.typesIndex = typesIndex;
    moreInfo.selectedSize = selectedSize;
    dispatch(addItemToCart(item, moreInfo));
  };
  const decorator = {
    title:
      "Shop For Products | AE Wisdom Final Year Project Computer Sci. Dept FUO",
    description: "",
    keywords: "",
  };
  if (!loading && productData && productData.productName) {
    decorator.title = `${productData.productName} Information | AE Wisdom Final Year Project Computer Sci. Dept FUO`;
  }
  return loading ? (
    <Preloader />
  ) : (
    <div className={classes.root}>
      <MetaDecorator decorator={decorator} />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Carousel infinite responsive={responsive}>
              {!isTypesImageAvailable
                ? productData.images &&
                  productData.images.length > 0 &&
                  productData.images.map((item, index) => (
                    <div className={classes.productImgDivStyle} key={index}>
                      <img
                        src={item}
                        alt="product"
                        className={classes.productImgStyle}
                      />
                    </div>
                  ))
                : productData.types &&
                  productData.types.length > 0 &&
                  productData.types[typesIndex].images &&
                  productData.types[typesIndex].images.length > 0 &&
                  productData.types[typesIndex].images.map((item, index) => (
                    <div className={classes.productImgDivStyle} key={index}>
                      <img
                        src={item}
                        alt="product"
                        className={classes.productImgStyle}
                      />
                    </div>
                  ))}
            </Carousel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography
                className={classes.productTitle}
                variant={matches ? "h4" : "h6"}
              >
                {productData?.productName}
              </Typography>
            </Box>
            <Box>
              {productData?.discount > 0 ? (
                <NumberFormat
                  value={productData?.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (
                    <Typography
                      component="span"
                      className={classes.productDiscountPrice}
                      variant={matches ? "h5" : "body1"}
                    >
                      {" "}
                      NGN {value}
                    </Typography>
                  )}
                />
              ) : (
                <NumberFormat
                  value={productData?.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (
                    <Typography
                      component="span"
                      className={classes.productPrice}
                      variant={matches ? "h5" : "body1"}
                    >
                      {" "}
                      NGN{value}
                    </Typography>
                  )}
                />
              )}

              {productData?.discount > 0 && (
                <NumberFormat
                  value={productData?.discountPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (
                    <Typography
                      component="span"
                      className={classes.newPrice}
                      variant={matches ? "h5" : "body1"}
                    >
                      NGN{value}
                    </Typography>
                  )}
                />
              )}
            </Box>

            <Box mt={3}>
              <Typography variant="body1">
                Brand: {productData?.brand}
              </Typography>
            </Box>
            <Box mt={3} mb={2}>
              <Typography
                variant="body1"
                className={classes.productDescriptionStyle}
              >
                Description
              </Typography>
              <Typography variant="body1">
                {productData?.description}
              </Typography>
            </Box>
            {/*Begining of Types section*/}

            <section>
              <Box mb={1}>
                {productData.types && productData.types.length > 0 && (
                  <Typography
                    className={classes.productDescriptionStyle}
                    variant="body1"
                  >
                    Colors Available
                  </Typography>
                )}
              </Box>
              <Box className={classes.typesColorBox}>
                {productData.types &&
                  productData.types.length > 0 &&
                  productData.types.map((item, index) => (
                    <div
                      key={item._id}
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "0.5px solid #eeeeee",
                        borderRadius: "50%",
                        padding: "2px",
                        marginRight: "7px",
                        boxShadow:
                          index === typesIndex ? "2px 2px 4px #707070" : null,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleColorChange(index)}
                    >
                      <div
                        style={{
                          width: "19px",
                          height: "19px",
                          background: `${item.color}`,
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                  ))}
              </Box>
              <Box mt={2}>
                {productData.types && productData.types.length > 0 && (
                  <Typography
                    className={classes.productDescriptionStyle}
                    variant="body1"
                  >
                    Sizes Available
                  </Typography>
                )}
              </Box>
              <Box mb={1} className={classes.typesSizeBox}>
                {productData.types &&
                  productData.types.length > 0 &&
                  productData.types[typesIndex].sizes &&
                  productData.types[typesIndex].sizes.length > 0 &&
                  productData.types[typesIndex].sizes.map((item) => (
                    <div
                      key={item._id}
                      className={
                        selectedSize === item.size
                          ? classes.productSpanSelected
                          : classes.productSizeSpan
                      }
                      onClick={() => setSelectedSize(item.size)}
                    >
                      <Typography className={classes.productSize}>
                        {item.size}
                      </Typography>
                    </div>
                  ))}
              </Box>
            </section>

            {/*End of Types section*/}

            <Box mb={3} className={classes.buttonBox}>
              {" "}
              <Button
                className={classes.button}
                variant="contained"
                size="large"
                startIcon={<ShoppingCartRoundedIcon />}
                onClick={() => handleAddToCart(productData)}
              >
                {" "}
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SingleProductDetail;
