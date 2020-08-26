import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { store } from "react-notifications-component";
import * as yup from "yup";
import { url } from "../../config";

import "./confirmemailform.css";

const ConfirmEmailForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    email: "",
  };

  let emailResetSchema = yup.object().shape({
    email: yup.string().email().min(6).max(255).required("Enter a valid email"),
  });

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const result = await axios.post(`${url}/admin/confirmEmail`, values);
      if (result.status === 200) {
        setSubmitting(false);
        return store.addNotification({
          message: `An email have been sent to your email address with instructions to reset your password`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 6000,
            onScreen: true,
          },
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 4000);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      if (error.response.status === 400) {
        return store.addNotification({
          message: `No user with email "${values.email}" was found `,
          type: "danger",
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
      store.addNotification({
        message: `Sorry, an unexpected error occured while verifying your email`,
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
  };
  return (
    <section className="emailreset-container">
      <div className="emailreset-form-wrapper ">
        <div className="emailreset-form-container ">
          <h3 className="emailreset-form-header">
            Enter your email to reset your password
          </h3>{" "}
          <div className="emailreset-form">
            <Formik
              initialValues={initialValues}
              validationSchema={emailResetSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(data) => {
                handleSubmit(data);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="emailreset-form-div">
                    <label htmlFor="email" className="emailreset-form-label">
                      Enter your Email
                    </label>
                    <Field
                      type="email"
                      className="emailreset-form-control"
                      id="email"
                      name="email"
                    />{" "}
                    {errors.email && touched.email ? (
                      <div className="text-danger">
                        {" "}
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.email}
                      </div>
                    ) : null}
                  </div>

                  <br />

                  {submitting ? (
                    <button type="submit" disabled className="emailreset-btn">
                      <i className="fa fa-spinner fa-spin"></i> Loading
                    </button>
                  ) : (
                    <button type="submit" className="emailreset-btn">
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
    </section>
  );
};

export default ConfirmEmailForm;
