import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { store } from "react-notifications-component";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import * as yup from "yup";
import "./changepassword.css";
import { url } from "../../config";
import axios from "axios";

const ChangePassword = (props) => {
  const token = props.match.params.token;

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken !== undefined) {
          console.log("decodedddd", decodedToken);
          if (decodedToken.exp < new Date().getTime() / 1000) {
            setIsTokenExpired(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    // return () => {

    // }
  }, []);

  let changePasswordSchema = yup.object().shape({
    password: yup.string().min(6).max(50).required("Enter a new password"),
    confirmPassword: yup
      .string()
      .min(6)
      .max(50)
      .required("Your password don't match"),
  });

  const handleSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return store.addNotification({
        message: `Your password does not match`,
        type: "warning",
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 6000,
          onScreen: true,
        },
      });
    }
    setisSubmitting(true);

    try {
      const result = await axios.put(`${url}/admin/resetPassword/${token}`, {
        password: data.password,
      });
      if (result.status === 200)
        store.addNotification({
          message: `Your password have been updated successfully`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      setisSubmitting(false);
      setTimeout(() => {
        window.location.href = `/login`;
      }, 5000);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setisSubmitting(false);
        return store.addNotification({
          message: `${error.response.data.msg}`,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 4000,
            onScreen: true,
          },
        });
      }

      store.addNotification({
        message: `Sorry, your password could not be updated`,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      });
      setisSubmitting(false);
    }
  };
  return (
    <>
      <div className="change-password-form-wrapper ">
        {isTokenExpired ? (
          <div className="text-danger">
            {" "}
            <i className="fas fa-exclamation-circle"></i> The token provided
            have expired, <Link to="/confirmemail">generate a new request</Link>
          </div>
        ) : null}
        <div className="change-password-form-container ">
          <div className="change-password-form">
            <h2 className="change-password-heading">Change Password</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={changePasswordSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(data) => {
                handleSubmit(data);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <div className="change-passord-form-div">
                    <label
                      htmlFor="password"
                      className="change-password-form-label"
                    >
                      Enter a new Password
                    </label>
                    <Field
                      type="password"
                      className="change-password-form-control"
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
                  <div className="change-password-form-div">
                    <label
                      htmlFor="confirmPassword"
                      className="change-password-form-label"
                    >
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      className="change-password-form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                    />{" "}
                    {values.confirmPassword !== values.password ? (
                      <div className="text-danger">
                        {" "}
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {"Your passwords don't match"}
                      </div>
                    ) : null}
                  </div>

                  <br />

                  {isSubmitting ? (
                    <button
                      type="submit"
                      disabled
                      className="change-password-btn btn-block"
                    >
                      <i className="fa fa-spinner fa-spin"></i> Submitting
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="change-password-btn btn-block"
                      disabled={isTokenExpired}
                    >
                      Submit
                    </button>
                  )}
                  <br />
                  <br />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
