import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./signup.css";

import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/actions/userActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const SignupSchema = Yup.object({
    firstname: Yup.string().min(3).required("First Name is a required field"),
    lastname: Yup.string().min(3).required("Last Name is a required field"),
    phone: Yup.string().required("Please, Enter your phone number"),
    password: Yup.string()
      .min(6)
      .required("Password is a required field with minimum of 6 characters"),
    confirmPassword: Yup.string().min(6).required("Enter passwords that macth"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is a required field"),
  });

  const handleSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      // return dispatch(toast.alert("Your passwords don't match"));
    }
    const formData = {
      firstName: values.firstname,
      lastName: values.lastname,
      phone: values.phone,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      isAdmin: true,
    };

    dispatch(signUpUser(formData));
  };
  return (
    <div>
      <div className="signup-form-wrapper">
        <div className="signup-form-container">
          {/* <h2 className="mt-5 text-center signup-heading">Create Account</h2> */}
          <div className="signup-form">
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <div className="signup-form-group">
                    <label htmlFor="firstname">First Name</label>
                    <Field
                      type="text"
                      className="signup-form-control"
                      id="firstname"
                      name="firstname"
                      placeholder="Tonye"
                    />
                    {errors.firstname && touched.firstname ? (
                      <div className="text-danger">
                        {" "}
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.firstname}
                      </div>
                    ) : null}
                  </div>
                  <div className="signup-form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <Field
                      type="text"
                      className="signup-form-control"
                      id="lastname"
                      name="lastname"
                      placeholder="Peter "
                    />
                    {errors.lastname && touched.lastname ? (
                      <div className="text-danger">
                        {" "}
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.lastname}
                      </div>
                    ) : null}
                  </div>
                  <div className="signup-form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <Field
                      type="tel"
                      className="signup-form-control"
                      id="phone"
                      name="phone"
                      placeholder="08101234567"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-danger">
                        {" "}
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.phone}
                      </div>
                    ) : null}
                  </div>
                  <div className="signup-form-group">
                    <label htmlFor="email">Email address</label>
                    <Field
                      type="email"
                      className="signup-form-control"
                      id="email"
                      name="email"
                      placeholder="ebi@gmail.com"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-danger">
                        {" "}
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="signup-form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      className="signup-form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="password"
                      name="password"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-danger">
                        {" "}
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="signup-form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      type="password"
                      className="signup-form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                    />
                  </div>
                  {user.isSignUp ? (
                    <button type="submit" disabled className="signup-btn">
                      <i className="fa fa-spinner fa-spin"></i> Creating Account
                    </button>
                  ) : (
                    <button type="submit" className="signup-btn">
                      Create Account
                    </button>
                  )}
                </Form>
              )}
            </Formik>
            <br />
            <p className="text-center">
              <Link to="/login" className="signup-form-link">
                I already have an account Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
