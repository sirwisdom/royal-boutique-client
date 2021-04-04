import axios from "axios";
import jwtDecode from "jwt-decode";
import { usersApiEndPoint } from "../../Utils/config";
import { setSnackbar } from "./uiActions";

export function loginUser(data) {
  return (dispatch) => {
    dispatch({
      type: "LOGINING_USER",
    });

    axios
      .post(`${usersApiEndPoint}/loginUser`, data)
      .then((res) => {
        const token = res.data;
        localStorage.setItem("WISDOM_BOUTIQUE_TOKEN", token);
        setAuthorizationHeader(token);
        const decodedToken = jwtDecode(token);
        dispatch(setUser(decodedToken));

        window.location.href = `/dashboard`;
        dispatch({
          type: "COMPLETE_LOGINING_USER",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.msg) {
          return dispatch(setSnackbar(err.response.data.msg, "error"));
        }
        if (err.message) {
          dispatch(setSnackbar(err.message, "error"));
        }
        if (err.response)
          dispatch({
            type: "COMPLETE_LOGINING_USER",
          });
      });
  };
}

export function setUser(data) {
  return { type: "SET_USER", payload: data };
}

export function authenticateUser(data) {
  return (dispatch) => {
    dispatch({ type: "AUTHENTICATE_USER" });
  };
}

export function signUpUser(data) {
  return (dispatch) => {
    dispatch({ type: "SIGNING_USER" });
    axios
      .post(`${usersApiEndPoint}/admin/adminRegister`, data)
      .then((res) => {
        dispatch({ type: "REGISTER_USER" });
        console.log("response", res);

        if (res.status === 200) {
          dispatch({ type: "COMPLETE_SIGNING_USER" });
          setTimeout(() => {
            window.location.href = "/login";
          }, 4000);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "COMPLETE_SIGNING_USER" });
        dispatch(setSignUpErrors(err.message));
        if (err.response && err.response.data && err.response.data.msg) {
        }
      });
  };
}

export function setSignUpErrors(data) {
  return (dispatch) => {
    window.scrollTo(0, 0);
    dispatch({
      type: "SET_SIGNUP_ERRORS",
      payload: data,
    });
  };
}

export function clearSignUpErrors() {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_SIGNUP_ERRORS",
    });
  };
}

export function logOutUser() {
  return (dispatch) => {
    localStorage.removeItem("WISDOM_BOUTIQUE_TOKEN");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT_USER" });
    window.location.href = "/";
  };
}

export const setAuthorizationHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
