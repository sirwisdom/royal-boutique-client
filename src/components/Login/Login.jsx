import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (user !== undefined && user.data !== undefined) {
  //     window.location.href = `/dashboard/${user.data._id}`;
  //   }
  // }, []);
  let loginSchema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string(),
  });

  const handleSubmit = (data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(formData));
  };
  return (
    <div className="login-container">
      <div className="form-wrapper ">
        <div className="login-form-branding">
          <h1 className="login-heading">Hi, Welcome</h1>
          <p className="login-text"> Enter your email and password to login</p>
        </div>
        <div className="login-form-container ">
          <div className="form">
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(data) => {
                handleSubmit(data);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-div">
                    <label htmlFor="email" className="login-form-label">
                      Email address
                    </label>
                    <Field
                      type="email"
                      className="login-form-control"
                      id="email"
                      name="email"
                      placeholder="ebi@gmail.com"
                    />{" "}
                    <i className="fas fa-envelope "></i>
                    {errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-div">
                    <label htmlFor="password" className="login-form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      className="login-form-control"
                      id="password"
                      name="password"
                    />{" "}
                    <i className="fas fa-lock "></i>
                    {errors.password && touched.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : null}
                  </div>

                  <br />

                  {user.isLogining ? (
                    <button
                      type="submit"
                      disabled
                      className="login-btn btn-block"
                    >
                      <i className="fa fa-spinner fa-spin"></i> Loading
                    </button>
                  ) : (
                    <button type="submit" className="login-btn btn-block">
                      Login
                    </button>
                  )}
                  <br />
                  <br />
                  <div className="recover-div">
                    <p>
                      <Link
                        to="/confirmemail"
                        className="form-signup-link text-center"
                      >
                        I forgot my password?
                      </Link>{" "}
                    </p>

                    {/* <p>
                      <Link
                        to="/signup"
                        className="form-signup-link text-center"
                      >
                        Create Account
                      </Link>{" "}
                    </p> */}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
