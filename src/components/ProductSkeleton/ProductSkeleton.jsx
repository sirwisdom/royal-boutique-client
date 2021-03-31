import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  featuredProductsBox: {
    backgorund: "purple",
  },
  featuredProductsTitle: {
    //   fontFamily: ""
    fontWeight: "bold",
    textAlign: "center",
  },
  featuredProductRoot: {
    margin: theme.spacing(4, 0),
  },
  itemSkeleton: {
    marginBottom: theme.spacing(0.8),
  },
}));

const ProductSkeleton = () => {
  const classes = useStyles();
  return (
    <Box>
      <Skeleton
        className={classes.itemSkeleton}
        variant="rect"
        width="100%"
        height={250}
      />
      <Skeleton
        className={classes.itemSkeleton}
        variant="rect"
        width="100%"
        height={30}
      />
      <Skeleton
        className={classes.itemSkeleton}
        variant="rect"
        width="100%"
        height={20}
      />
    </Box>
  );
};

export default ProductSkeleton;
