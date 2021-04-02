import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
// import ShopSingleItem from "../../components/ShopSingleItem/ShopSingleItem";
import {
  productsApiEndpoint,
  categoriesApiEndpoint,
  subCategoriesApiEndpoint,
} from "../../Utils/config";
import backgorundImage from "../../Assets/img13.jpeg";
import ShopFilterSection from "./ShopFilterSection";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(7),
    fontFamily: "Poppins, sans-serif",
  },
  shopHeaderBox: {
    height: "80vh",
    padding: theme.spacing(2),
    background: `linear-gradient(to bottom, #0b012242, #a8a8a82c), url(${backgorundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
      height: "90vh",
    },
  },
  headerGrid: {
    height: "100%",
  },
  shopTitle: {
    color: theme.palette.grey[200],
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    textTransform: "uppercase",
    transform: `translateY(30px)`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
      textTransform: "uppercase",
      transform: `translateY(110px)`,
    },

    [theme.breakpoints.up("sm")]: {
      fontSize: "50px",
      fontWeight: "bold",
      transform: `translateY(160px)`,
    },

    [theme.breakpoints.up("md")]: {
      fontSize: "60px",
      fontWeight: "bold",
      transform: `translateY(100px)`,
    },
  },
  categorySkeletonStyle: {
    marginBottom: theme.spacing(0.8),
  },
  categoryHeadSkeletonStyle: {
    marginBottom: theme.spacing(0.4),
  },
  skeletonStyle: {
    marginBottom: theme.spacing(0.7),
  },
  categorySkeleton: {
    background: theme.palette.grey[100],
  },
  categoryStyleBox: {
    padding: theme.spacing(1, 2),
    margin: "0 auto",
    maxWidth: "310px",
    background: "linear-gradient(to right, #8f5305, #584b3a)",
    transition: "all 0.6s linear",
    "&:hover": {
      background: theme.palette.grey[900],
    },
  },
  categoryStyle: {
    color: theme.palette.grey[50],
    textAlign: "center",
    fontWeight: 700,
  },
  noProductBox: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  productContainerBox: {
    width: "100%",
  },
  featuredProductsBox: {
    backgorund: "purple",
  },
  discountProductsTitle: {
    //   fontFamily: ""
    fontWeight: "bold",
    textAlign: "center",
  },
  cardContent: {
    height: "110px",
    overflow: "hidden",
  },
  bold: {
    fontWeight: 600,
    color: theme.palette.yellow.dark,
  },
  featuredProductRoot: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  itemSkeleton: {
    marginBottom: theme.spacing(1),
  },
  swipperStyle: {},
  cardRoot: {
    position: "relative",
    maxWidth: 345,
    margin: theme.spacing(0, 0.5),
  },
  discountDiv: {
    position: "absolute",
    right: "0px",
    top: "0px",
    backgroundColor: theme.palette.grey[900],
    padding: theme.spacing(0.7, 1, 2, 1.8),
    borderBottomLeftRadius: "30px",
    boxShadow: "2px 2px 6px #000000",
  },
  discountText: {
    color: theme.palette.yellow.light,
  },
  media: {
    height: 240,
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
  discountPriceStyle: {
    textDecoration: "line-through",
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
    margin: theme.spacing(0, 0.5),
  },
  filterGrid: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ItemSkeleton = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={3} lg={4}>
      <Box>
        <Skeleton
          className={classes.skeletonStyle}
          variant="rect"
          width="100%"
          height={178}
        />
        <Skeleton
          className={classes.skeletonStyle}
          height={30}
          variant="rect"
          width="100%"
        />
        <Skeleton variant="rect" height={20} width="100%" />
      </Box>
    </Grid>
  );
};
function Shop() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const smMathes = useMediaQuery(theme.breakpoints.down("sm"));
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [allProducts, setAllProducts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [productCategories, setProductCategories] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [loading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    window.scroll({
      top: -window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handlePriceChange = (event, newValue) => {
    setSelectedPrice(newValue);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    window.scrollBy({
      top: -window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${categoriesApiEndpoint}/`)
      .then((res) => {
        setProductCategories(res.data);
        setLoadingCategories(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${subCategoriesApiEndpoint}/`)
      .then((res) => {
        setSubCategories(res.data);
        setLoadingFilters(false);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${productsApiEndpoint}`)
      .then((res) => {
        setAllProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const decorator = {
    title:
      "Shop For Products | AE Wisdom Final Year Project Computer Sci. Dept FUO",
    description: "",
    keywords: "",
  };
  let filteredProducts;
  if (allProducts && allProducts.length > 0) {
    filteredProducts = [...allProducts];
  }
  if (!loading && selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (item) => item.category && item.category._id === selectedCategory
    );
  }

  if (!loading && selectedSubCategory) {
    filteredProducts = filteredProducts.filter(
      (item) => item.subCategory && item.subCategory._id === selectedSubCategory
    );
  }

  if (!loading && selectedPrice) {
    filteredProducts = filteredProducts.filter(
      (item) => item.price && item.price >= selectedPrice
    );
  }
  if (!loading && selectedSize) {
    filteredProducts = filteredProducts.filter(
      (item) =>
        item.size && item.size.toLowerCase() === selectedSize.toLowerCase()
    );
  }
  if (!loading && selectedBrand) {
    filteredProducts = filteredProducts.filter(
      (item) =>
        item.brand && item.brand.toLowerCase() === selectedBrand.toLowerCase()
    );
  }

  return (
    <div className={classes.root}>
      <MetaDecorator decorator={decorator} />
      <Box className={classes.shopHeaderBox} mb={2}>
        <Typography className={classes.shopTitle} variant="h3">
          Shopping made simple
        </Typography>
        <Grid
          container
          spacing={2}
          alignContent="center"
          alignItems="center"
          className={classes.headerGrid}
        >
          {loadingCategories &&
          productCategories &&
          productCategories.length < 1
            ? [...new Array(4)].map((item, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={3}>
                    <Box>
                      <Skeleton
                        className={classes.categorySkeleton}
                        variant="rect"
                        width="100%"
                        height={50}
                      />
                    </Box>
                  </Grid>
                );
              })
            : productCategories.map((item, index) => (
                <Grid key={item._id} item xs={12} sm={6} md={3}>
                  <Box className={classes.categoryStyleBox}>
                    <Typography
                      className={classes.categoryStyle}
                      variant={smMathes ? "h5" : "h4"}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Box>
      <Container>
        <Box mt={2} mb={2}>
          <Grid container spacing={1}>
            <Grid className={classes.filterGrid} item xs={false} sm={4} md={3}>
              {loadingFilters ? (
                [...new Array(5)].map((item, idx) => (
                  <Box key={idx} className={classes.categorySkeletonStyle}>
                    <Skeleton
                      variant="text"
                      width="90%"
                      height={25}
                      className={classes.categoryHeadSkeletonStyle}
                    />
                    <Skeleton variant="text" width="65%" height={20} />
                    <Skeleton variant="text" width="65%" height={20} />
                  </Box>
                ))
              ) : (
                <ShopFilterSection
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategoryChange}
                  productCategories={productCategories}
                  subCategories={subCategories}
                  allProducts={allProducts}
                  handleBrandChange={handleBrandChange}
                  selectedBrand={selectedBrand}
                  handleSubCategoryChange={handleSubCategoryChange}
                  selectedSubCategory={selectedSubCategory}
                  selectedPrice={selectedPrice}
                  handlePriceChange={handlePriceChange}
                  handleSizeChange={handleSizeChange}
                  selectedSize={selectedSize}
                />
              )}
            </Grid>

            <Grid
              className={classes.productGrid}
              item
              container
              xs={12}
              sm={12}
              md={9}
            >
              <Box className={classes.productContainerBox}>
                <Grid container spacing={1}>
                  {loading
                    ? [...new Array(4)].map((item, index) => (
                        <ItemSkeleton key={index} />
                      ))
                    : filteredProducts &&
                      filteredProducts.length > 0 &&
                      filteredProducts.map((item, index) => {
                        return (
                          <Grid key={index} item xs={12} sm={4} md={4} lg={4}>
                            <Card className={classes.cardRoot}>
                              {item.discount > 0 && (
                                <div className={classes.discountDiv}>
                                  <Typography
                                    className={classes.discountText}
                                    variant="body1"
                                  >
                                    {item.discount}%
                                  </Typography>{" "}
                                </div>
                              )}
                              <CardMedia
                                className={classes.media}
                                image={`${item.images[0]}`}
                                title="Shop Product"
                                onClick={() =>
                                  history.push(
                                    `/shop/${item.productName}/${item._id}`
                                  )
                                }
                              />
                              <CardContent className={classes.cardContent}>
                                <Box className={classes.productTypesBox}>
                                  {item.types && item.types.length > 0 ? (
                                    item.types.map((type) => (
                                      <div
                                        style={{
                                          width: "12px",
                                          height: "12px",
                                          background: `${type.color}`,
                                          borderRadius: "50%",
                                          marginRight: "4px",
                                        }}
                                      />
                                    ))
                                  ) : (
                                    <Typography
                                      variant="caption"
                                      className={classes.bold}
                                    >
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
                                {item.discount > 0 && (
                                  <NumberFormat
                                    value={item.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    renderText={(value) => (
                                      <Typography
                                        className={classes.discountPriceStyle}
                                        variant="body2"
                                        component="p"
                                        align="left"
                                      >
                                        {" "}
                                        NGN {value}
                                      </Typography>
                                    )}
                                  />
                                )}
                                {item.discount > 0 ? (
                                  <NumberFormat
                                    value={item.discountPrice}
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
                                  />
                                ) : (
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
                                  />
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                  {!loading && filteredProducts.length === 0 && (
                    <Box className={classes.noProductBox} p={3}>
                      <Typography variant="h6">
                        Sorry, No Products Match Your Search...
                      </Typography>{" "}
                    </Box>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Shop;
// {allProducts.map((product, index) => {
//   return <ShopSingleItem product={product} key={index} />;
// })}
