import React from "react";
import { useContext, useState, createContext } from "react";
import axios, { AxiosInstance } from "axios";
import { Navigate, Outlet } from "react-router";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  // api: AxiosInstance;
  user: string | null;
}

let AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = React.useState<string | null>(null);

  // read cookie and set refresh token here.
  setRefreshToken("todo");
  if (refreshToken) {
    axios
      .post("/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + accessToken,
        },
        params: {
          refresh_token: refreshToken,
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      })
      .then((response) => {
        if (response) {
          setAccessToken(response.data.token);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let value = { accessToken, refreshToken, user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

interface AuthSwithProps {
  b?: boolean;
}

function AuthSwith({ b }: AuthSwithProps) {
  let auth = useAuth();
  return auth.accessToken && b ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace={true} />
  );
}

export default {
  AuthProvider,
  useAuth,
  AuthSwith,
  AuthContext,
};
