import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { getAllowedRoutes } from "./utils";
import { isLoggedIn } from "../services/auth";
import PrivateRoutesConfig from "./PrivateRoutesConfig";
import LeanerPrivateRoutesConfig from "./LearnerPrivateRoutesConfig";
import MapAllowedRoutes from "./MapAllowedRoutes";

function PrivateRoutes() {
  let allowedRoutes = [];

  if (isLoggedIn()) {
    let config =
      process.env.REACT_APP_BUILD_TARGET === "admin"
        ? PrivateRoutesConfig
        : LeanerPrivateRoutesConfig;
    allowedRoutes = getAllowedRoutes(config);
  } else {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <MapAllowedRoutes routes={allowedRoutes} basePath="/app" isAddNotFound />
    </Fragment>
  );
}

export default PrivateRoutes;
