import React from "react";
import "./App.css";
import { LOGIN_PAGE } from "./common/constants";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ForgottenPassword from "./pages/ForgottenPassword";
import DashBoard from "./pages/Dashboard";
import PasswordReset from "./pages/PasswordReset";
import CohortsPage from "./pages/CohortsPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import FeedbackPage from "./pages/FeedbackPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={LOGIN_PAGE} component={LoginPage} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />
        <Route path="/reset-password/:signature/:token" component={PasswordReset} />
        <ProtectedRoute exact path="/dashboard" component={DashBoard} />
        <ProtectedRoute exact path="/cohorts" component={CohortsPage} />
        <ProtectedRoute exact path="/programmes" component={ProgrammesPage} />
        <ProtectedRoute exact path="/feedback" component={FeedbackPage} />
        <ProtectedRoute exact path="/users" component={UsersPage} />
      </Switch>
    </Router>
  );
}

export default App;
