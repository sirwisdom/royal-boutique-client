import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSnackbar } from "../../redux/actions/uiActions";
import backgroundImage from "../../Assets/img13.jpeg";
import { usersApiEndPoint } from "../../Utils/config";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    marginTop: theme.spacing(6),
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
  links: {
    textDecoration: "none",
  },
}));

const initialValues = {
  email: "",
  password: "",
};

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let signUpSchema = yup.object().shape({
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

  const handleSubmit = (values, helpers) => {
    axios
      .post(usersApiEndPoint, values)
      .then((res) => {
        dispatch(setSnackbar("Registration Successful", "success"));
        helpers.setSubmitting(false);
        setTimeout(() => {
          history.replace("/login");
        }, 3000);
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
  return user.isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography className={classes.formTitle} component="h1" variant="h5">
            Sign Up
          </Typography>

          <Formik
            className={classes.form}
            initialValues={initialValues}
            validationSchema={signUpSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values, helpers) => {
              handleSubmit(values, helpers);
            }}
          >
            {({ errors, touched, handleBlur, handleChange }) => (
              <Form autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      classesName={classes.textField}
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
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      classesName={classes.textField}
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
                      classesName={classes.textField}
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      classesName={classes.textField}
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
                      id="password"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/login" className={classes.links}>
                      {"I have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
