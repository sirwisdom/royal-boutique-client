import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "react-notifications-component/dist/theme.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ConfirmEmailForm from "./components/ConfrimEmailForm/ConfirmEmailForm";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import store from "./redux/store";
import {
  logOutUser,
  setUser,
  setAuthorizationHeader,
} from "./redux/actions/userActions";
import Home from "./components/Home/Home";
import { Authenticate } from "./ProtectedRoute";
import ApproveTestimonies from "./components/ApproveTestimonies/ApproveTestimonies";
import UploadSermon from "./components/UploadSermon/UploadSermon";
import Testimony from "./components/Testimony/Testimony";
import AllTestimonies from "./components/AllTestimonies/AllTestimonies";
import AllSermons from "./components/AllSermons/AllSermons";
import UploadProgram from "./components/UploadProgram/UploadProgram";
import AllPrograms from "./components/AllPrograms/AllPrograms";
import Footer from "./components/Footer/Footer";
import EditProgram from "./components/EditProgram/EditProgram";
import AllBranches from "./components/AllBranches/AllBranches";
import UploadBranch from "./components/UploadBranch/UploadBranch";
import EditBranch from "./components/EditBranch/EditBranch";
import FourZeroFour from "./components/FourZeroFour/FourZeroFour";
import LivePage from "./components/LivePage/LivePage";

function App() {
  if (localStorage.JWT_TOKEN) {
    setAuthorizationHeader(localStorage.JWT_TOKEN);
    try {
      const decodedToken = jwtDecode(localStorage.JWT_TOKEN);

      if (decodedToken !== undefined) {
        store.dispatch(setUser(decodedToken));

        if (decodedToken.exp < new Date().getTime() / 1000) {
          store.dispatch(logOutUser());
        }
      }
    } catch (error) {
      store.dispatch(logOutUser());
      console.log(error);
    }
  }
  const [showNav, setShowNav] = useState(false);
  return (
    <Router>
      <Navbar showNav={showNav} setShowNav={setShowNav} />
      <div className="app-container">
        <Switch>
          <Route
            path="/dashboard/:userId/allbranches/:branchId"
            component={Authenticate(EditBranch)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/allprograms/:programId"
            component={Authenticate(EditProgram)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/approvetestimonies/:testimonyId"
            component={Authenticate(Testimony)}
          />{" "}
          <Route
            path="/dashboard/:userId/livepage"
            component={Authenticate(LivePage)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/approvetestimonies"
            component={Authenticate(ApproveTestimonies)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/uploadbranch"
            component={Authenticate(UploadBranch)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/allbranches"
            component={Authenticate(AllBranches)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/allprograms"
            component={Authenticate(AllPrograms)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/allsermons"
            component={Authenticate(AllSermons)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/alltestimonies"
            component={Authenticate(AllTestimonies)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/uploadprogram"
            component={Authenticate(UploadProgram)}
            exact
          />{" "}
          <Route
            path="/dashboard/:userId/uploadsermon"
            component={Authenticate(UploadSermon)}
            exact
          />{" "}
          <Route path="/dashboard" component={Authenticate(Home)} exact />
          <Route exact path="/login" component={Login} />
          <Route path="/confirmemail" component={ConfirmEmailForm} exact />
          <Route
            path="/changepassword/:token"
            component={ChangePassword}
            exact
          />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/login" component={Login} exact />
          <Route path="*" component={() => <FourZeroFour />} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
