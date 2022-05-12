import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import ForgottenPassword from "./pages/ForgottenPassword";
import PasswordReset from "./pages/PasswordReset";
import NotFoundPage from "pages/NotFoundPage";
import UserLogin from "userPages/pages/auth/UserLogin";
import UserResetPassword from "userPages/pages/auth/UserResetPassword";
import UserSetPassword from "./userPages/pages/auth/UserSetPassword";
import PrivateRoutes from "./config/PrivateRoutes";

function Learner() {
  useEffect(() => {
    console.log("learner");

    const viewport: any = document.querySelector('meta[name="viewport"]');

    if (viewport) {
      viewport.content = "initial-scale=1";
      viewport.content = "width=device-width";
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path={"/user-login"} component={UserLogin} />
        <Route exact path={"/"} component={UserLogin} />
        <Route exact path={"/user-reset-password"} component={UserResetPassword} />
        <Route exact path="/user-set-password/:signature/:token" component={UserSetPassword} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />
        <Route exact path="/reset-password/:signature/:token" component={PasswordReset} />
        <PrivateRoutes />
        {/*<ProtectedRoute exact path={"/user-intro/:stepId"} component={Intro} />*/}
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default Learner;
