import { Navigate, Outlet, PathRouteProps } from "react-router";

import { useAuth } from "./AuthContext";

interface AuthSwitchProps extends PathRouteProps {
  authorized?: boolean;
  redirect?: string;
}

export function AuthSwitch({ authorized, redirect }: AuthSwitchProps) {
  let { accessToken } = useAuth();
  return accessToken && authorized ? (
    <Outlet />
  ) : (
    <Navigate to={redirect || "/"} replace={true} />
  );
}
