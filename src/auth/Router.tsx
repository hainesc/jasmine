import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  RouteProps,
  PathRouteProps,
} from "react-router";

import AuthContext, { useAuth } from "./AuthContext";

interface AuthorizedRouteProps extends PathRouteProps {
  component: React.ComponentType<any>;
}

interface AuthSwitchProps {
  authorized?: boolean;
  redirect?: string;
}

function AuthSwitch({ authorized, redirect }: AuthSwitchProps) {
  let { accessToken } = useAuth();
  return accessToken && authorized ? (
    <Outlet />
  ) : (
    <Navigate to={redirect || "/"} replace={true} />
  );
}
export const AuthorizedRoute: React.FC<AuthorizedRouteProps> = function ({
  component: Component,
  ...rest
}: AuthorizedRouteProps) {
  let auth = useAuth();
  return auth.isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};
