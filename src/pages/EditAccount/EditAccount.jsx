import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSnackbar } from "../../redux/actions/uiActions";
import backgroundImage from "../../Assets/img13.jpeg";
import { usersApiEndPoint } from "../../Utils/config";
import nigeriaStates from "../../Utils/NigeriaStates";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // backgroundImage: `linear-gradient(to bottom, rgba(3, 41, 44, 0.758), rgba(214, 214, 214, 0.959)), url(${backgroundImage})`,
    // backgroundRepeat: "no-repeat",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    // backgroundSize: "cover",
    // backgroundPosition: "center",
  },
  image: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formPaperStyle: {
    maxWidth: "750px",
    margin: theme.spacing(3, "auto"),
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formTitle: {
    fontweight: 700,
    fontFamily: "Poppins, sans-serif",
  },
  textField: {
    fontweight: 500,
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    borderColor: theme.palette.grey[900],
    outlineColor: theme.palette.grey[900],
    "&:focus": {
      borderColor: theme.palette.grey[900],
      outlineColor: theme.palette.grey[900],
    },
  },
  submit: {
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.yellow.dark,
    transition: "background 0.5s ease-in",
    "&:hover": {
      backgroundColor: theme.palette.grey[900],
    },
  },
  btnBox: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const shippmentInitialValues = {
  address: "",
  city: "",
  state: "",
};
let shipmentSchema = yup.object().shape({
  address: yup.string().required().label("Address"),
  city: yup.string().required().label("City"),
  state: yup.string().required().label("State"),
});
function EditAccount() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.user.data);

  let decorator = {
    title:
      "Edit My Profile, | AE Wisdom Final Year Project Computer Sci. Dept FUO",
    description: "",
    keywords: " ",
  };
  if (userData && userData.firstName) {
    decorator.title = `${userData.firstName} ${userData.lastName}'s Edit profile, | AE Wisdom Final Year Project Computer Sci. Dept FUO`;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let personalDetailsSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2)
      .max(40)
      .required("First Name is a required field"),
    lastName: yup
      .string()
      .min(2)
      .max(40)
      .required("Last Name is a required field"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
  });
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

  const handleChangePersonalDetails = (values, helpers) => {
    axios
      .put(`${usersApiEndPoint}/personal/${userData._id}`, values)
      .then((res) => {
        dispatch(setSnackbar("Account Updated Successfully", "success"));
        helpers.setSubmitting(false);
        setTimeout(() => {
          history.push("/dashboard/my-account");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        helpers.setSubmitting(false);
        if (err.response && err.response.data && err.response.data.msg) {
          return dispatch(setSnackbar(err.response.data.msg, "error"));
        }
        if (err.message) {
          dispatch(setSnackbar(err.message, "error"));
        }
      });
  };

  const handleUpdateShipment = (values, helpers) => {
    const data = {};
    data.shippingLocation = values;

    axios
      .put(`${usersApiEndPoint}/shipping/${userData._id}`, data)
      .then((res) => {
        dispatch(
          setSnackbar(
            `Default shipping information have been updated successfully`,
            "success"
          )
        );
        helpers.setSubmitting(false);
        setTimeout(() => {
          history.push("/dashboard/my-account");
        }, 2000);
      })
      .catch((err) => {
        helpers.setSubmitting(false);
        console.log(err);

        if (err.response && err.response.data && err.response.data.msg) {
          return dispatch(setSnackbar(`${err.response.data.msg}`, "error"));
        }
        if (err.message) {
          dispatch(setSnackbar(err.message, "error"));
        }

        helpers.setSubmitting(false);
      });
  };

  return (
    <div className={classes.root}>
      <MetaDecorator decorator={decorator} />
      <Container>
        <Paper className={classes.formPaperStyle} elevation={1}>
          <Typography
            className={classes.formTitle}
            component="h1"
            variant="h5"
            align="center"
            gutterBottom
          >
            Edit Personal Information
          </Typography>

          <Formik
            className={classes.form}
            initialValues={initialValues}
            validationSchema={personalDetailsSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values, helpers) => {
              handleChangePersonalDetails(values, helpers);
            }}
          >
            {({ errors, touched, handleBlur, handleChange, isSubmitting }) => (
              <Form autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      error={errors.firstName && touched.firstName}
                      helperText={touched.firstName && errors.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      autoComplete="off"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      error={errors.lastName && touched.lastName}
                      helperText={touched.lastName && errors.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="off"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      fullWidth
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      error={errors.password && touched.password}
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
                <Box className={classes.btnBox}>
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
                        <CircularProgress size="1rem" /> &nbsp;Updating{" "}
                      </>
                    ) : (
                      <> Update</>
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>

      <Container>
        <Paper className={classes.formPaperStyle} elevation={1}>
          <Typography
            className={classes.formTitle}
            component="h1"
            variant="h5"
            align="center"
            gutterBottom
          >
            Edit Shippment Information
          </Typography>

          <Formik
            className={classes.form}
            initialValues={shippmentInitialValues}
            validationSchema={shipmentSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values, helpers) => {
              handleUpdateShipment(values, helpers);
            }}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              values,
              isSubmitting,
            }) => (
              <Form autoComplete="off">
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Field
                      error={errors.address && touched.address}
                      as={TextField}
                      helperText={errors.address}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="address"
                      label="Address"
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                        autoComplete="off"
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

                  <Grid item xs={12}>
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
                        autoComplete="off"
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
                <Box className={classes.btnBox}>
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
                        <CircularProgress size="1rem" /> &nbsp;Updating{" "}
                      </>
                    ) : (
                      <> Update</>
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
}
export default EditAccount;
