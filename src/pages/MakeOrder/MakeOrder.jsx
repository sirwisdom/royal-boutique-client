import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { setSnackbar } from "../../redux/actions/uiActions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ordersApiEndpoint } from "../../Utils/config";
import paystackImage from "../../Assets/paystack.png";
import nigeriaStates from "../../Utils/NigeriaStates";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";

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

        if (res.data && res.data.message) {
          dispatch(
            setSnackbar(`Order have been placed successfully`, "success")
          );
        } else {
          dispatch(setSnackbar(`${res.data.message}`, "success"));
        }
        helpers.setSubmitting(false);

        // setTimeout(() => {
        //   helpers.resetForm();
        // }, 3000);
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

  return (
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
                      variant="body1"
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
