import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  incrementCartItem,
  decrementCartItem,
  clearCart,
} from "../../redux/actions/cartActions";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { setSnackbar } from "../../redux/actions/uiActions";
import { useHistory, Redirect } from "react-router-dom";
import { ordersApiEndpoint } from "../../Utils/config";
import paystackImage from "../../Assets/paystack.png";
import nigeriaStates from "../../Utils/NigeriaStates";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import swal from "sweetalert";

const initialValues = {
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
};
let userSchema = yup.object().shape({
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  phone: yup.string().required().label("Phone number"),
  address: yup.string().required().label("Address"),
  city: yup.string().required().label("City"),
  state: yup.string().required().label("State"),
});
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignTracks: "center",
    alignItems: "center",
  },
  formPaperStyle: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
  formTitle: {
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
    color: theme.palette.yellow.main,
  },
  containerStyle: {
    padding: theme.spacing(4, 2),
    display: "flex",
    flexDirection: "column",
    alignTracks: "center",
    alignItems: "center",
  },
  toolbarDiv: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    padding: theme.spacing(3, 1, 0, 0),
  },
  adminIcon: {
    fontSize: "2rem",
  },
  toolbarline: {
    position: "relative",
    display: "block",
    width: "100%",
    height: "2px",
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
    width: "40px",
    height: "40px",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  paystackImage: {
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "250px",
    },
  },
  submit: {
    textTransform: "capitalize",
    margin: theme.spacing(3, 0, 2),
    fontFamily: "Poppins, sans-serif",
    float: "right",
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
function MakeOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const decorator = {
    title:
      "Make Order For Products | AE Wisdom Final Year Project Computer Sci. Dept FUO ",
    description: "",
    keywords: "",
  };
  let totalPrice = 0;

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.data);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  cartItems.map((item) => (totalPrice = item.price + totalPrice));

  totalPrice = cartItems.reduce(
    (total, item) => item.product?.price * item.qty + total,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history]);
  const handleSubmit = (values, helpers) => {
    const data = {};
    data.orderedItems = cartItems;
    data.shipment = values;
    data.amount = totalPrice;
    data.customerId = userData._id;
    axios
      .post(`${ordersApiEndpoint}`, data)
      .then((res) => {
        const { data } = res;
        swal(
          "THANK YOU",
          "Your order have been made, go to your dashboard and pay for your order"
        );
        helpers.setSubmitting(false);

        setTimeout(() => {
          helpers.resetForm();
          history.push(`/dasboard/my-orders/order-detail/${data._id}`);
          dispatch(clearCart());
        }, 2000);
      })
      .catch((err) => {
        helpers.setSubmitting(false);
        console.log(err);

        if (err.response && err.response.data) {
          return dispatch(setSnackbar(`${err.response.data}`, "error"));
        }
        if (err.message) {
          dispatch(setSnackbar(err.message, "error"));
        }

        helpers.setSubmitting(false);
      });
  };

  const renderStates = () => {
    return nigeriaStates.map((item, index) => {
      return (
        <MenuItem value={item.states.name} key={index}>
          {item.states.name}
        </MenuItem>
      );
    });
  };

  const renderCities = (lgaState) => {
    let lgas = [];

    let selectedState;
    if (lgaState) {
      nigeriaStates.map((item) => {
        if (
          lgaState.toLocaleLowerCase() === item.states.name.toLocaleLowerCase()
        ) {
          selectedState = item.states;
        }
        return selectedState;
      });

      selectedState.locals.map((item) => lgas.push(item.name));

      return lgas.map((item, index) => {
        return (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        );
      });
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length < 1) {
      return history.push("/shop");
    }
  }, [cartItems, history]);
  return !isAuthenticated ? (
    <Redirect to="/login" />
  ) : (
    <div className={classes.root}>
      <MetaDecorator decorator={decorator} />
      <Container
        // component={Paper}
        maxWidth="lg"
        className={classes.containerStyle}
      >
        <div className={classes.paper}>
          <Box pt={2} pl={2}>
            <Typography component="h6" align="center" variant="h6">
              Order Checkout Form
            </Typography>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(values, helpers) => {
              handleSubmit(values, helpers);
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              values,
            }) => (
              <Form className={classes.form} noValidate>
                <Paper className={classes.formPaperStyle}>
                  <Box mt={2} mb={2}>
                    <Typography
                      variant="h6"
                      align="left"
                      className={classes.formTitle}
                    >
                      Shipping Details
                    </Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        error={errors.firstName && touched.firstName}
                        helperText={errors.firstName}
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        label="Recipient First Name"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        error={errors.lastName && touched.lastName}
                        helperText={errors.lastName}
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        label="Recipient Last Name"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={TextField}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Field
                        error={errors.phone && touched.phone}
                        as={TextField}
                        helperText={errors.phone}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="tel"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        error={errors.address && touched.address}
                        as={TextField}
                        helperText={errors.address}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>State</InputLabel>
                        <Field
                          name="state"
                          as={Select}
                          error={errors.state && touched.state}
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="State"
                          align="left"
                        >
                          {renderStates()}
                        </Field>
                        {touched.state && errors.state ? (
                          <FormHelperText>
                            {touched.state && errors.state}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>City</InputLabel>
                        <Field
                          disabled={!values.state}
                          name="city"
                          as={Select}
                          error={errors.city && touched.city}
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="City"
                          align="left"
                        >
                          {renderCities(values.state)}
                        </Field>
                        {touched.city && errors.city ? (
                          <FormHelperText>
                            {touched.city && errors.city}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>

                {/* End of Shipping Details Section */}
                {cartItems && cartItems.length > 0 ? (
                  <Paper elevation={2} className={classes.formPaperStyle}>
                    <div>
                      <TableContainer>
                        <Typography
                          className={classes.formTitle}
                          gutterBottom
                          align="left"
                          variant="h6"
                        >
                          Order Summary
                        </Typography>
                        <Table
                          className={classes.table}
                          aria-labelledby="tableTitle"
                          aria-label="enhanced table"
                          size="small"
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
                                      {moreInfo &&
                                      moreInfo.isTypesImageAvailable ? (
                                        <img
                                          className={classes.categoryImage}
                                          src={
                                            product?.types[moreInfo.typesIndex]
                                              ?.images[0]
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
                                            dispatch(
                                              decrementCartItem(
                                                item.product._id
                                              )
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            dispatch(
                                              incrementCartItem(
                                                item.product._id
                                              )
                                            )
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
                                        size="small"
                                        onClick={() =>
                                          dispatch(
                                            removeItemFromCart(
                                              item?.product?._id
                                            )
                                          )
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
                      </Box>
                    </div>
                  </Paper>
                ) : null}
                <div>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    className={classes.submit}
                  >
                    {isSubmitting ? (
                      <>
                        {" "}
                        <CircularProgress size="1rem" /> &nbsp;Submitting{" "}
                      </>
                    ) : (
                      <> Make Order</>
                    )}
                  </Button>
                </div>
                {/* End of Personal Details Section */}
              </Form>
            )}
          </Formik>
        </div>
        <Box mt={5} mb={3}>
          {" "}
          <img
            src={paystackImage}
            alt="accepted payment mode"
            className={classes.paystackImage}
          />
        </Box>
      </Container>
    </div>
  );
}

export default MakeOrder;
