import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { getAllowedRoutes } from "./utils";
import { isLoggedIn } from "../services/auth";
import PrivateRoutesConfig from "./PrivateRoutesConfig";
import MapAllowedRoutes from "./MapAllowedRoutes";

function PrivateRoutes() {
  let allowedRoutes = [];

  if (isLoggedIn()) {
    allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
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
