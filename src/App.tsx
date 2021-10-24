import React from "react";
import "./App.css";
import { LOGIN_PAGE } from "./common/constants";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ForgottenPassword from "./pages/ForgottenPassword";
import DashBoard from "./pages/Dashboard";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={LOGIN_PAGE} component={LoginPage} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />
        <Route path="/reset-password/:signature/:token" component={PasswordReset} />
        <ProtectedRoute exact path="/dashboard" component={DashBoard} />
      </Switch>
    </Router>
  );
}

export default App;
