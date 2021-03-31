import React, { useEffect } from "react";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "react-notifications-component/dist/theme.css";
import "./App.css";
import { useDispatch } from "react-redux";
import { getCartItems } from "./redux/actions/cartActions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./Routes";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./Utils/theme";
// import "swiper/css/swiper.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  return (
    <div>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
