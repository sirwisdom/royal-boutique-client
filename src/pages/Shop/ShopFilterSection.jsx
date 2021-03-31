import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import NumberFormat from "react-number-format";

const GoldenRadio = withStyles((theme) => ({
  root: {
    color: theme.palette.yellow.light,
    "&$checked": {
      color: theme.palette.yellow.dark,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  shopFilterSectionRoot: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  categoryPaper: {
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontFamily: "Poppins, sans-serif",
  },
  shopTitle: {
    color: theme.palette.grey[200],
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    textTransform: "uppercase",
    transform: `translateY(30px)`,
  },
  radioLabelStyle: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "14px",
  },
  categoryHeadSkeletonStyle: {
    marginBottom: theme.spacing(0.4),
  },
  skeletonStyle: {
    marginBottom: theme.spacing(0.7),
  },
  categorySkeleton: {
    background: theme.palette.grey[900],
  },
  categoryStyleBox: {
    padding: theme.spacing(1, 2),
    background: theme.palette.yellow.dark,
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
  filterTitle: {
    fontWeight: 600,
    fontSize: "16px",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  productContainerBox: {
    width: "100%",
  },
  colorSecondaryOveride: {
    color: theme.palette.yellow.dark,
  },
  filterPrice: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
  },
}));

const ShopFilterSection = (props) => {
  const {
    productCategories,
    subCategories,
    handleCategoryChange,
    selectedCategory,
    allProducts,
    handleBrandChange,
    selectedBrand,
    handleSubCategoryChange,
    selectedSubCategory,
    selectedPrice,
    handlePriceChange,
    handleSizeChange,
    selectedSize,
  } = props;

  const classes = useStyles();
  const renderCategories = () => {
    return (
      <Paper className={classes.categoryPaper} elevation={2}>
        <Box pt={1} pb={1}>
          {" "}
          <Typography className={classes.filterTitle} variant="body1">
            Category{" "}
          </Typography>
          <Divider />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Category"
              name="Category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e)}
            >
              <FormControlLabel
                value=""
                control={<GoldenRadio size="small" />}
                label="All"
                classes={{ label: classes.radioLabelStyle }}
              />
              {productCategories &&
                productCategories.length > 0 &&
                productCategories.map((item, idx) => (
                  <FormControlLabel
                    key={item._id}
                    value={item._id}
                    control={
                      <GoldenRadio
                        size="small"
                        className={classes.radioInputStyle}
                      />
                    }
                    label={item.name}
                    classes={{ label: classes.radioLabelStyle }}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
    );
  };

  let newSubCategories = [];
  if (selectedCategory && subCategories && subCategories.length > 0) {
    newSubCategories = subCategories.filter(
      (i) => i.categoryId._id === selectedCategory
    );
  }
  const renderSubCategories = () => {
    return (
      <Paper className={classes.categoryPaper} elevation={2}>
        <Box pt={1} pb={1}>
          {" "}
          <Typography className={classes.filterTitle} variant="body1">
            Sub Category{" "}
          </Typography>
          <Divider />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Category"
              name="Category"
              value={selectedSubCategory}
              onChange={(e) => handleSubCategoryChange(e)}
            >
              {selectedCategory && newSubCategories.length > 0 && (
                <FormControlLabel
                  value=""
                  control={<GoldenRadio size="small" />}
                  label="All"
                  className={classes.uppercase}
                  classes={{ label: classes.radioLabelStyle }}
                />
              )}
              {selectedCategory &&
                newSubCategories.length > 0 &&
                newSubCategories.map((item, idx) => (
                  <FormControlLabel
                    key={item._id}
                    value={item._id}
                    control={
                      <GoldenRadio
                        size="small"
                        className={classes.radioInputStyle}
                      />
                    }
                    label={item.name}
                    classes={{ label: classes.radioLabelStyle }}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
    );
  };
  /* End Of renderSubCategories function */

  /* Begining Of renderPrice function */
  const renderPrice = () => {
    let minPrice = 0;
    let maxPrice = 0;
    if (allProducts && allProducts.length > 0) {
      minPrice = allProducts[0].price;
      for (let i = 0; i < allProducts.length; i++) {
        minPrice = Math.min(minPrice, allProducts[i].price);
      }

      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].price) {
          maxPrice = Math.max(maxPrice, allProducts[i].price);
        }
      }
    }

    return (
      <Paper className={classes.categoryPaper} elevation={2}>
        <Box pt={1} pb={1}>
          {" "}
          <Typography className={classes.filterTitle} variant="body1">
            Filter Price
          </Typography>
          <Divider />
          <br />
          <Typography
            gutterBottom
            className={classes.filterPrice}
            variant="caption"
            component="span"
          >
            Selected Price:{" "}
            {selectedPrice && selectedPrice > 0 ? (
              <NumberFormat
                value={selectedPrice}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <Typography
                    component="span"
                    color="textPrimary"
                    gutterBottom
                    className={classes.filterPrice}
                    variant="body1"
                  >
                    NGN{value}+
                  </Typography>
                )}
              />
            ) : null}
          </Typography>
          <Box mt={2}>
            <Slider
              classes={{ colorSecondary: classes.colorSecondaryOveride }}
              min={minPrice}
              step={100}
              color="secondary"
              valueLabelDisplay="off"
              max={maxPrice}
              value={selectedPrice}
              onChange={handlePriceChange}
              aria-labelledby="continuous-slider"
            />
          </Box>
        </Box>
      </Paper>
    );
  };

  /* End Of renderPrice function */

  const renderSizes = () => {
    let sizesSet = new Set();
    if (allProducts && allProducts.length > 0) {
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].size) {
          sizesSet.add(allProducts[i].size);
        }
      }
    }

    let sizeList = Array.from(sizesSet);
    return (
      <Paper className={classes.categoryPaper} elevation={2}>
        <Box pt={1} pb={1}>
          {" "}
          <Typography className={classes.filterTitle} variant="body1">
            Select Size
          </Typography>
          <Divider />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Category"
              name="Category"
              value={selectedSize}
              onChange={(e) => handleSizeChange(e)}
            >
              <FormControlLabel
                value=""
                control={<GoldenRadio size="small" />}
                label="All"
                className={classes.uppercase}
                classes={{ label: classes.radioLabelStyle }}
              />
              {sizeList &&
                sizeList.length > 0 &&
                sizeList.map((item, idx) => (
                  <FormControlLabel
                    className={classes.uppercase}
                    key={idx}
                    value={item}
                    control={
                      <GoldenRadio
                        size="small"
                        className={classes.radioInputStyle}
                      />
                    }
                    label={item}
                    classes={{ label: classes.radioLabelStyle }}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
    );
  };

  /* End of render size function */
  const renderBrands = () => {
    let brandSet = new Set();
    if (allProducts && allProducts.length > 0) {
      for (let i = 0; i < allProducts.length; i++) {
        brandSet.add(allProducts[i].brand);
      }
    }

    let brandList = Array.from(brandSet);
    return (
      <Paper className={classes.categoryPaper} elevation={2}>
        <Box pt={1} pb={1}>
          {" "}
          <Typography className={classes.filterTitle} variant="body1">
            Brands{" "}
          </Typography>
          <Divider />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Category"
              name="Category"
              value={selectedBrand}
              onChange={(e) => handleBrandChange(e)}
            >
              <FormControlLabel
                value=""
                control={<GoldenRadio size="small" />}
                label="All"
                classes={{ label: classes.radioLabelStyle }}
              />
              {brandList &&
                brandList.length > 0 &&
                brandList.map((item, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={item}
                    control={
                      <GoldenRadio
                        size="small"
                        className={classes.radioInputStyle}
                      />
                    }
                    label={item}
                    classes={{ label: classes.radioLabelStyle }}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
    );
  };

  return (
    // <div>
    <Box className={classes.shopFilterSectionRoot}>
      {renderCategories()}

      {renderSubCategories()}
      {renderPrice()}
      {renderSizes()}
      {renderBrands()}
    </Box>
    // </div>
  );
};

export default ShopFilterSection;
