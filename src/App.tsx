import React from "react";
import "./App.css";
import { LOGIN_PAGE } from "./common/constants";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ForgottenPassword from "./pages/ForgottenPassword";
import DashBoardPage from "./pages/DashboardPage";
import PasswordReset from "./pages/PasswordReset";
import CohortsPage from "./pages/CohortsPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import FeedbackPage from "./pages/FeedbackPage";
import UsersPage from "./pages/UsersPage";
import AddCohortPage from "./pages/AddCohortPage";
import CohortDetailsPage from "./pages/CohortDetailsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={LOGIN_PAGE} component={LoginPage} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />
        <Route path="/reset-password/:signature/:token" component={PasswordReset} />
        <ProtectedRoute exact path="/dashboard" component={DashBoardPage} />
        <ProtectedRoute exact path="/cohorts" component={CohortsPage} />
        <ProtectedRoute exact path="/cohorts/add" component={AddCohortPage} />
        <ProtectedRoute exact path="/cohorts/:cohortId" component={CohortDetailsPage} />
        <ProtectedRoute exact path="/programmes" component={ProgrammesPage} />
        <ProtectedRoute exact path="/feedback" component={FeedbackPage} />
        <ProtectedRoute exact path="/users" component={UsersPage} />
      </Switch>
    </Router>
  );
}

export default App;
