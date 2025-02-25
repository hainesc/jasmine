import { Navigate, Outlet } from "react-router";

import { useAuth } from "./AuthContext";

interface GuardProps {
  authorized: boolean;
  redirect?: string;
}

// Rename it to Guard
export function Guard({ authorized, redirect }: GuardProps) {
  let { accessToken } = useAuth();
  if (authorized) {
    return accessToken ? (
      <Outlet />
    ) : (
      <Navigate to={redirect || "/"} replace={true} />
    );
  } else {
    console.log(accessToken);
    return accessToken ? (
      <Navigate to={redirect || "/"} replace={true} />
    ) : (
      <Outlet />
    );
  }
}
