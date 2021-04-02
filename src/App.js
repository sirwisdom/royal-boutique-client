import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { useDispatch } from "react-redux";
import { getCartItems } from "./redux/actions/cartActions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./Routes";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./Utils/theme";
import CustomizedSnackbars from "./components/Snackbar/Snackbar";
import store from "./redux/store";
import {
  setAuthorizationHeader,
  logOutUser,
  setUser,
} from "./redux/actions/userActions";

function App() {
  if (localStorage.WISDOM_BOUTIQUE_TOKEN) {
    setAuthorizationHeader(localStorage.WISDOM_BOUTIQUE_TOKEN);
    try {
      const decodedToken = jwtDecode(localStorage.WISDOM_BOUTIQUE_TOKEN);

      if (decodedToken !== undefined) {
        store.dispatch(setUser(decodedToken));

        if (Date.now() >= decodedToken.exp * 1000) {
          store.dispatch(logOutUser());
        }
      }
    } catch (error) {
      store.dispatch(logOutUser());
      console.log(error);
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  return (
    <div>
      <CustomizedSnackbars />
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
