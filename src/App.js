import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "react-notifications-component/dist/theme.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import FourZeroFour from "./components/FourZeroFour/FourZeroFour";
import About from "./pages/About/About";
import Shop from "./pages/Shop/Shop";
import  ItemInfo  from "./pages/ItemInfo/ItemInfo";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import {useDispatch} from 'react-redux'
import {getCartItems} from './redux/actions/cartActions'

function App() {
  const [showNav, setShowNav] = useState(false);
  const  dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCartItems())

  }, [dispatch])
  return (
    <Router>
      <Navbar showNav={showNav} setShowNav={setShowNav} />
      <div className="app-container">
        <Switch>
          <Route path="/shop/:itemId" component={ItemInfo} exact />{" "}
          <Route path="/contact" component={Contact} exact />{" "}
          <Route path="/cart" component={Cart} exact />{" "}
          <Route path="/shop" component={Shop} exact />{" "}
          <Route path="/about" component={About} exact />{" "}
          <Route path="/" component={Home} exact />
          <Route path="*" component={() => <FourZeroFour />} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
