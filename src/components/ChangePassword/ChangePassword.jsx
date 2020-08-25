import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
// import toast from "siiimple-toast";
import * as yup from "yup";
import "./changepassword.css";
import { useSelector } from "react-redux";
import { url } from "../../config";
import axios from "axios";

const ChangePassword = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const user = useSelector((state) => state.user);

  let changePasswordSchema = yup.object().shape({
    password: yup.string().min(6).max(50).required("Enter a new password"),
    confirmPassword: yup.string().min(6).max(50).required(),
  });

  const handleSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      // return toast.alert("Your passwords don't match", {
      //   duration: 5000,
      // });
    }
    setisSubmitting(true);
    const formData = new FormData();

    formData.append("password", data.password);
    try {
      const result = await axios.put(
        `${url}/users/${user.data.data._id}`,
        formData
      );
      if (result.status === 200)
        // toast.success("Your password have been successfully updated", {
        //   duration: 5000,
        // });
        setisSubmitting(false);
      setTimeout(() => {
        window.location.href = `/dashboard/${user.data.data._id}/account/change-password`;
      }, 3000);
    } catch (error) {
      console.log(error);
      // toast.alert("Sorry, could not update your password");
      setisSubmitting(false);
    }
  };
  return (
    <>
      <div className="change-password-form-wrapper ">
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
