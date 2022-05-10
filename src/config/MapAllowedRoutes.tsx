import React, { memo } from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "pages/NotFoundPage";

/*
 * This is the route utility component used for generating
 * routes and child routes it only requires routes array and basePath
 */
function MapAllowedRoutes({ routes, isAddNotFound }: any) {
  return (
    <Switch>
      {routes.map((route: any) => {
        const { path, component: Component, children, title, permission, ...rest } = route;
        return (
          <Route {...rest} key={path} path={`${path}`} exact={true}>
            <Component children={children} />
          </Route>
        );
      })}
      {isAddNotFound && (
        <Route>
          <NotFoundPage />
        </Route>
      )}
    </Switch>
  );
}

export default memo(MapAllowedRoutes);
