import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import NumberFormat from "react-number-format";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  incrementCartItem,
  decrementCartItem,
} from "../../redux/actions/cartActions";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(9),
    width: "100%",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 400,
    flex: "1 1 100%",
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableHead: {
    fontWeight: "bold",
  },
  categoryStyle: {
    textTransform: "capitalize",
  },
  categoryImage: {
    objectFit: "contain",
    width: "50px",
    height: "50px",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  button: {
    float: "right",
    textTransform: "capitalize",
    width: "350px",
    color: theme.palette.grey[50],
    background: theme.palette.grey[900],
    borderRadius: "23px",
    transition: "all 0.5s ease-in",
    "&:hover": {
      background: theme.palette.yellow.dark,
    },
    [theme.breakpoints.down("xs")]: {
      width: "280px",
    },
  },
}));

const headCells = [
  { id: "Image", label: "" },

  {
    id: "Product ",
    label: "Product ",
  },
  {
    id: "Price",
    label: "Price",
  },
  { id: "Size", label: "Size" },

  {
    id: "Quantity",
    label: "Quantity",
  },

  {
    id: "Amount",
    label: "Amount",
  },
  {
    id: "Actions ",
    label: " ",
  },
];

function EnhancedTableHead() {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableHead}
            key={headCell.id}
            align="left"
            padding="default"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Cart() {
  // const [selected, setSelected] = useState({});
  const classes = useStyles();
  const history = useHistory();
  // const [isSubmiting, setIsSubmiting] = useState(false);

  const dispatch = useDispatch();
  let totalPrice = 0;

  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [totalPrice]);

  cartItems.map((item) => (totalPrice = item.price + totalPrice));

  totalPrice = cartItems.reduce(
    (total, item) => item.product?.price * item.qty + total,
    0
  );

  const handleCheckout = () => {
    return history.push("/dashboard/make-order");
  };
  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        {cartItems && cartItems.length > 0 ? (
          <div>
            <TableContainer>
              <Typography gutterBottom align="center" variant="h6">
                {" "}
                My Cart{" "}
              </Typography>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
                size="medium"
              >
                <EnhancedTableHead classes={classes} />
                <TableBody>
                  {cartItems &&
                    cartItems.length > 0 &&
                    cartItems.map((item, index) => {
                      const { moreInfo, product } = item;
                      return (
                        <TableRow key={index} hover tabIndex={-1}>
                          <TableCell align="left">
                            {moreInfo && moreInfo.isTypesImageAvailable ? (
                              <img
                                className={classes.categoryImage}
                                src={
                                  product?.types[moreInfo.typesIndex]?.images[0]
                                }
                                alt="product"
                              />
                            ) : (
                              <img
                                className={classes.categoryImage}
                                src={item?.product?.images[0]}
                                alt="product"
                              />
                            )}
                          </TableCell>
                          <TableCell
                            className={classes.capitalize}
                            align="left"
                          >
                            {item?.product?.productName}{" "}
                          </TableCell>
                          <TableCell
                            align="left"
                            className={classes.capitalize}
                          >
                            <NumberFormat
                              value={item?.product?.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value) => (
                                <Typography
                                  variant="body2"
                                  component="p"
                                  align="left"
                                >
                                  {" "}
                                  &#8358;{value}
                                </Typography>
                              )}
                            />{" "}
                          </TableCell>
                          <TableCell className={classes.uppercase}>
                            {moreInfo && moreInfo.selectedSize
                              ? `${moreInfo?.selectedSize}`
                              : `${item?.product?.size}`}
                          </TableCell>
                          <TableCell>
                            {item?.qty} &nbsp;
                            <ButtonGroup size="small" color="primary">
                              <Button
                                onClick={() =>
                                  dispatch(decrementCartItem(item.product._id))
                                }
                              >
                                -
                              </Button>
                              <Button
                                onClick={() =>
                                  dispatch(incrementCartItem(item.product._id))
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </TableCell>

                          <TableCell
                            align="left"
                            className={classes.capitalize}
                          >
                            <NumberFormat
                              value={item?.product?.price * item.qty}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value) => (
                                <Typography
                                  variant="body2"
                                  component="p"
                                  align="left"
                                >
                                  {" "}
                                  &#8358;{value}
                                </Typography>
                              )}
                            />{" "}
                          </TableCell>
                          <TableCell
                            align="left"
                            className={classes.capitalize}
                          >
                            <IconButton
                              onClick={() =>
                                dispatch(removeItemFromCart(item?.product?._id))
                              }
                              color="secondary"
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={3} mb={2} pr={4}>
              <Typography align="right" variant="body1">
                {" "}
                Subtotal: NGN{" "}
                <NumberFormat
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </Typography>
              <br />
              <Button
                className={classes.button}
                variant="contained"
                size="large"
                startIcon={<CreditCardIcon />}
                onClick={() => handleCheckout()}
              >
                Checkout
              </Button>
            </Box>
          </div>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
}

export default Cart;
