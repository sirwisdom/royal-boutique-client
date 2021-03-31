import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import FourZeroFour from "./components/FourZeroFour/FourZeroFour";
import About from "./pages/About/About";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import SignUp from "./pages/SignUp/SignUp";
import SingleProductDetail from "./pages/SingleProductPage/SingleProductPage";

function Routes() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Switch>
          <Route
            path="/shop/:productName/:productId"
            component={SingleProductDetail}
            exact
          />
          <Route path="/contact" component={Contact} exact />{" "}
          <Route path="/cart" component={Cart} exact />{" "}
          <Route path="/shop" component={Shop} exact />{" "}
          <Route path="/about" component={About} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/" component={Home} exact />
          <Route path="*" component={() => <FourZeroFour />} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default Routes;
