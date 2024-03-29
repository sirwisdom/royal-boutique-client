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
import Dashboard from "./pages/Dashboard/Dashboard";
import MakeOrder from "./pages/MakeOrder/MakeOrder";
import MyProfile from "./pages/MyProfile/MyProfile";
import EditAccount from "./pages/EditAccount/EditAccount";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import Orders from "./pages/AllOrders/AllOrders";

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

          <Route path="/dashboard/my-orders" component={Orders} exact />
          <Route
            path="/dasboard/my-orders/order-detail/:orderId"
            component={OrderDetailsPage}
            exact
          />
          <Route path="/dashboard/edit-account" component={EditAccount} exact />
          <Route path="/dashboard/my-account" component={MyProfile} exact />
          <Route path="/dashboard/make-order" component={MakeOrder} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/shop" component={Shop} exact />
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
