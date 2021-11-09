import React from "react";
import { isLoggedIn } from "../../services/auth";
import { Route, withRouter, Redirect } from "react-router";
import { LOGIN_PAGE } from "../../common/constants";

const ProtectedRoute = ({ component: Component, history, ...rest }: any) => {
  return isLoggedIn() ? <Route component={Component} {...rest} /> : <Redirect to={LOGIN_PAGE} />;
};

export default withRouter(ProtectedRoute);
