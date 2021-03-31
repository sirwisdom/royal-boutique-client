import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { Link, Redirect } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import backgroundImage from "../../Assets/img15.jpeg";

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
    fontweight: 600,
    fontFamily: "Poppins, sans-serif",
  },
  textField: {
    fontweight: 500,
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
  },
  submit: {
    fontFamily: "Poppins, sans-serif",
    margin: theme.spacing(3, 0, 2),
  },
  links: {
    textDecoration: "none",
  },
}));

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
  });

  const handleSubmit = (data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(formData));
  };
  return user.isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.formTitle} component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            className={classes.form}
            initialValues={initialValues}
            validationSchema={loginSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(data) => {
              handleSubmit(data);
            }}
          >
            {({ errors, touched, handleBlur, handleChange }) => (
              <Form>
                <TextField
                  classesName={classes.textField}
                  variant="outlined"
                  error={errors.email && touched.email}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  classesName={classes.textField}
                  variant="outlined"
                  error={errors.password && touched.password}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/forgot-password" className={classes.links}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" className={classes.links}>
                      {"Don't have an account? Sign Up"}
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
