import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgottenPassword from "./pages/ForgottenPassword";
import DashBoard from "./pages/Dashboard";
import { LOGIN_PAGE } from "./common/constants";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={LOGIN_PAGE} component={LoginPage} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />
        <ProtectedRoute exact path="/dashboard" component={DashBoard}/>
      </Switch>
    </Router>
  );
}

export default App;
