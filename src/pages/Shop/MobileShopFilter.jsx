import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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
    fontSize: "12.2px",
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
    fontSize: "14px",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  capitalize: {
    textTransform: "capitalize",
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
export default function MobileShopFilterDialog(props) {
  const {
    handleCloseDialog,
    openDialog,
    productCategories,
    handleCategoryChange,
    selectedCategory,
    allProducts,
    handleBrandChange,
    selectedBrand,
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
                sizeList
                  .slice(0, 5)
                  .map((item, idx) => (
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
                brandList
                  .slice(0, 5)
                  .map((item, idx) => (
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
    <div>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" color="secondary">
          SHOP PRODUCTS FILTER
        </DialogTitle>
        <DialogContent>
          {renderCategories()}
          {renderSizes()}
          {renderBrands()}
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.capitalize}
            variant="contained"
            onClick={handleCloseDialog}
            color="primary"
            size="small"
          >
            Close
          </Button>
        </DialogActions>
        <br />
      </Dialog>
    </div>
  );
}
