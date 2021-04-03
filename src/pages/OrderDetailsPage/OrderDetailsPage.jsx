import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// import PrintIcon from "@material-ui/icons/Print";
import axios from "axios";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import { ordersApiEndpoint } from "../../Utils/config";
import Preloader from "../../components/Preloader/Preloader";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import dayjs from "dayjs";
import OrderCancelDialog from "./OrderCancelDialog";
// import OrderPaymentDialog from "./OrderPaymentDialog";
import { setSnackbar } from "../../redux/actions/uiActions";
// import { authenticateCustomerCare } from "../../utils/customerCareAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),

    width: "100%",
  },
  orderHeader: {
    fontWeight: 600,
    color: theme.palette.yellow.dark,
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
    color: theme.palette.purple.main,
    marginBottom: theme.spacing(2),
  },
  subHeaderBox: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(1, 0, 1, 1),
  },
  orderSubHeader: {
    fontWeight: 500,
    color: theme.palette.yellow.dark,
  },
  productImage: {
    objectFit: "contain",
    width: "40px",
    height: "40px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  successText: {
    color: theme.palette.success.main,
  },
  errorText: {
    color: theme.palette.error.main,
  },
  priceBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(2),
  },
  paymentButton: {
    textTransform: "capitalize",
    color: theme.palette.grey[50],
    fontFamily: "Poppins, sans-serif",
    background: theme.palette.yellow.dark,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  },
  cancelButton: {
    textTransform: "capitalize",
    color: theme.palette.grey[50],
    fontFamily: "Poppins, sans-serif",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: theme.spacing(2),
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

function OrderDetailsPage(props) {
  const { match } = props;
  const { params } = match;
  const { orderId } = params;

  const [orderDetail, setOrderDetail] = useState({});
  const [openCancelOrderDialog, setOpenCancelOrderDialog] = useState(false);

  const [hasChange, setHasChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const handleCloseOrderDialog = () => {
    setOpenCancelOrderDialog(false);
  };

  const classes = useStyles();

  const toggleHasChange = () => {
    setHasChange(!hasChange);
  };

  // const handlePrintOrderDetail = () => {
  //   const printableElements = document.getElementById("printArea").innerHTML;
  //   const orderDetailsHTML =
  //     "<html><head><title></title></head><body>" +
  //     printableElements +
  //     "</body></html>";
  //   const oldPage = document.body.innerHTML;
  //   document.body.innerHTML = orderDetailsHTML;
  //   window.print();
  //   document.body.innerHTML = oldPage;
  // };

  useEffect(() => {
    axios
      .get(`${ordersApiEndpoint}/${orderId}`)
      .then((res) => {
        setOrderDetail(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        if (err.message) {
          dispatch(setSnackbar(err.message, "error"));
        }
      });
  }, [orderId, hasChange, dispatch]);

  const decorator = {
    title:
      "My Order Detail | AE Wisdom Final Year Project Computer Sci. Dept FUO",
    description: "",
    keywords: "",
  };
  return loading ? (
    <Preloader />
  ) : (
    <div className={classes.root}>
      <MetaDecorator decorator={decorator} />
      <OrderCancelDialog
        openCancelOrderDialog={openCancelOrderDialog}
        orderId={orderDetail._id}
        handleCloseOrderDialog={handleCloseOrderDialog}
        toggleHasChange={toggleHasChange}
      />
      <Container maxWidth="lg">
        {/* Begining of Order Printable area container */}
        <div id="printArea">
          <Typography
            variant="h5"
            component="h5"
            color="textPrimary"
            className={classes.orderHeader}
          >
            Order Information
          </Typography>
          <br />

          {/*  Beginging of Order's section  */}
          <section>
            <Box variant="dense" className={classes.subHeaderBox}>
              <Typography variant="h6" className={classes.orderSubHeader}>
                Order Details
              </Typography>
            </Box>
            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Order Status:
              </Typography>{" "}
              &nbsp;
              {orderDetail.isCancelled ? (
                <Typography color="secondary" component="span" variant="body1">
                  Cancelled
                </Typography>
              ) : (
                <Typography
                  className={classes.successText}
                  component="span"
                  variant="body1"
                >
                  Active
                </Typography>
              )}
            </Box>
            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Order ID:
              </Typography>{" "}
              &nbsp;
              <Typography component="span" variant="body1">
                {orderDetail.orderId}
              </Typography>
            </Box>
            {/* <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Delivery Option:
              </Typography>{" "}
              &nbsp;
              <Typography
                className={classes.capitalize}
                component="span"
                variant="body1"
              >
                {orderDetail.deliveryOption}
              </Typography>
            </Box> */}
            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Order Delivery Status:
              </Typography>{" "}
              &nbsp;
              <Typography
                className={
                  orderDetail.isDelivered
                    ? classes.successText
                    : classes.errorText
                }
                component="span"
                variant="body1"
              >
                {orderDetail.isDelivered ? "Delivered" : "Not Delivered"}
              </Typography>
            </Box>

            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Order Dispatch Status:
              </Typography>{" "}
              &nbsp;
              <Typography
                className={
                  orderDetail.isShipped
                    ? classes.successText
                    : classes.errorText
                }
                component="span"
                variant="body1"
              >
                {orderDetail.isShipped ? "Dispatched" : "Not Dispatch"}
              </Typography>
            </Box>

            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Order Payment Status:
              </Typography>{" "}
              &nbsp;
              <Typography
                className={
                  orderDetail.isPaid ? classes.successText : classes.errorText
                }
                component="span"
                variant="body1"
              >
                {orderDetail.isPaid ? "Paid" : "Awaiting"}
              </Typography>
            </Box>

            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Payment Refernce:
              </Typography>{" "}
              &nbsp;
              <Typography
                className={classes.capitalize}
                component="span"
                variant="body1"
              >
                {orderDetail.reference
                  ? `${orderDetail.reference}`
                  : "Not Available"}
              </Typography>
            </Box>
            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Order Date:
              </Typography>{" "}
              &nbsp;
              <Typography component="span" variant="body1">
                {dayjs(orderDetail.createdAt).format("DD MMMM YYYY, HH:mm a")}
              </Typography>
            </Box>
          </section>
          {/*  End of Order's section  */}
          <br />

          {/*  Begining of Shiping's details section  */}
          <section>
            <Box variant="dense" className={classes.subHeaderBox}>
              <Typography variant="h6" className={classes.orderSubHeader}>
                Shipment Details
              </Typography>
            </Box>

            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Address:
              </Typography>{" "}
              &nbsp;
              <Typography component="span" variant="body1">
                {orderDetail.shipment?.address}
              </Typography>
            </Box>

            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                City:
              </Typography>{" "}
              &nbsp;
              <Typography component="span" variant="body1">
                {orderDetail.shipment?.city}
              </Typography>
            </Box>
            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                State:
              </Typography>{" "}
              &nbsp;
              <Typography component="span" variant="body1">
                {orderDetail.shipment?.state}
              </Typography>
            </Box>

            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Recipient:
              </Typography>{" "}
              &nbsp;
              <Typography component="span" variant="body1">
                {orderDetail.shipment?.firstName}{" "}
                {orderDetail.shipment?.lastName}
              </Typography>
            </Box>

            <Box mt={1} mb={1}>
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
              >
                Recipient Phone:
              </Typography>{" "}
              &nbsp;
              <Typography component="span" variant="body1">
                {orderDetail.shipment?.phone
                  ? orderDetail.shipment?.phone
                  : "Phone Number is not provided"}
              </Typography>
            </Box>
          </section>
          {/*End of Shiping details */}
          <br />
          <br />
          {orderDetail.orderedItems && orderDetail.orderedItems.length > 0 ? (
            <>
              <Box variant="dense" className={classes.subHeaderBox}>
                <Typography variant="h6">Products Details</Typography>
              </Box>
              <br />
              <section>
                {orderDetail && orderDetail.orderedItems && (
                  <Typography gutterBottom variant="body1">
                    There are {orderDetail.orderedItems.length} ordered items
                  </Typography>
                )}
              </section>
              <section>
                {orderDetail.orderedItems.length < 1 ? (
                  <div>
                    <Box m={6}>
                      <Typography variant="h5" align="center">
                        Sorry, no products were orderd
                      </Typography>
                    </Box>
                  </div>
                ) : (
                  <div>
                    <Paper elevation={0} className={classes.paper}>
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-labelledby="tableTitle"
                          aria-label="orders table"
                          size="medium"
                        >
                          <EnhancedTableHead />
                          <TableBody>
                            {orderDetail.orderedItems &&
                              orderDetail.orderedItems.length > 0 &&
                              orderDetail.orderedItems.map((item, index) => {
                                return (
                                  <TableRow hover tabIndex={-1} key={index}>
                                    <TableCell align="left">
                                      {item.isTypesImageAvailable ? (
                                        <img
                                          className={classes.productImage}
                                          src={
                                            item.types[item.typesIndex]
                                              ?.images[0]
                                          }
                                          alt="product"
                                        />
                                      ) : (
                                        <img
                                          className={classes.productImage}
                                          src={item?.images[0]}
                                          alt="product"
                                        />
                                      )}
                                    </TableCell>
                                    <TableCell
                                      className={classes.capitalize}
                                      align="left"
                                    >
                                      {item?.productName}{" "}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className={classes.capitalize}
                                    >
                                      <NumberFormat
                                        value={item?.price}
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
                                      {item.selectedSize
                                        ? `${item?.selectedSize}`
                                        : `${item?.size}`}
                                    </TableCell>
                                    <TableCell>{item?.qty}</TableCell>

                                    <TableCell
                                      align="left"
                                      className={classes.capitalize}
                                    >
                                      <NumberFormat
                                        value={item?.price * item.qty}
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
                                    ></TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>{" "}
                        <NumberFormat
                          value={orderDetail.amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => (
                            <Box mt={1} className={classes.priceBox}>
                              <Typography
                                component="span"
                                variant="body1"
                                color="textSecondary"
                                align="right"
                              >
                                Total Price: &nbsp;
                              </Typography>{" "}
                              <Typography
                                component="span"
                                variant="body1"
                                color="textPrimary"
                                align="right"
                              >
                                &#8358;{value}
                              </Typography>{" "}
                            </Box>
                          )}
                        />
                      </TableContainer>{" "}
                    </Paper>{" "}
                  </div>
                )}
              </section>
            </>
          ) : null}
          <br />
          <br />
        </div>
        {/*  End of Order Printable area container div*/}
        {/*  Begining of Button section*/}
        <section>
          <Box className={classes.buttons} mb={3} mt={2}>
            <div>
              {orderDetail.isPaid ? null : (
                <Button
                  variant="contained"
                  className={classes.paymentButton}
                  onClick={() => setOpenCancelOrderDialog(true)}
                >
                  Make Payment
                </Button>
              )}
            </div>
            <div>
              {" "}
              <Button
                variant="contained"
                className={classes.cancelButton}
                disabled={
                  (orderDetail && orderDetail.isDelivered) ||
                  orderDetail.isCancelled
                }
                color="secondary"
                onClick={() => setOpenCancelOrderDialog(true)}
              >
                {orderDetail && orderDetail.isCancelled
                  ? "Cancelled"
                  : "Cancel Order"}
              </Button>
            </div>
          </Box>

          <Box className={classes.buttons} mb={3} mt={4}>
            {/* <div>
              <Button
                startIcon={<PrintIcon />}
                variant="contained"
                color="primary"
                onClick={() => handlePrintOrderDetail()}
              >
                Print
              </Button>
            </div> */}
          </Box>
        </section>
      </Container>
    </div>
  );
}

export default OrderDetailsPage;
