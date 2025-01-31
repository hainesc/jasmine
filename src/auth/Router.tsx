import { Navigate, Outlet, PathRouteProps, Route } from "react-router";

import { useAuth } from "./AuthContext";

interface AuthSwitchProps extends PathRouteProps {
  authorized: boolean;
  redirect?: string;
}

export function AuthSwitch({ authorized, redirect }: AuthSwitchProps): Route {
  let { accessToken } = useAuth();
  if (authorized) {
    return accessToken ? (
      <Outlet />
    ) : (
      <Navigate to={redirect || "/"} replace={true} />
    );
  } else {
    return accessToken ? (
      <Navigate to={redirect || "/"} replace={true} />
    ) : (
      <Outlet />
    );
  }
}
