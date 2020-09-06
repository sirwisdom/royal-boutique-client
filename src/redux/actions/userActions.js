import axios from "axios";
import jwtDecode from "jwt-decode";
import { store } from "react-notifications-component";
import { url } from "../../config";

export function loginUser(data) {
  return (dispatch) => {
    dispatch({
      type: "LOGINING_USER",
    });

    axios
      .post(`${url}/admin/adminLogin`, data)
      .then((res) => {
        const token = res.data.data;
        localStorage.setItem("JWT_TOKEN", token);
        setAuthorizationHeader(token);
        const decodedToken = jwtDecode(token);
        dispatch(setUser(decodedToken));

        window.location.href = `/`;
        dispatch({
          type: "COMPLETE_LOGINING_USER",
        });
      })
      .catch((err) => {
        console.log(err);

        if (err.response)
          store.addNotification({
            message: `${err.response.data.msg}`,
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
      .post(`${url}/admin/adminRegister`, data)
      .then((res) => {
        dispatch({ type: "REGISTER_USER" });
        console.log("response", res);

        if (res.status === 200) {
          store.addNotification({
            message: `Your account have been created successfully`,
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 4000,
              onScreen: true,
            },
          });
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
          return store.addNotification({
            message: `${err.response.data.msg}`,
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
    localStorage.removeItem("JWT_TOKEN");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT_USER" });
    window.location.href = "/login";
  };
}

export const setAuthorizationHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
