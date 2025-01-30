import { setRef } from "@mui/material";
import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// TODO: rename file name to Context
interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: string | null;
  signIn: (accessToken: string, refreshToken: string, user: string) => void; // Signin callback
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      axios
        .post("/api/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            refresh_token: refreshToken,
          }),
        })
        .then((resp) => {
          let token = resp.data.token;
          signIn(token, refresh, resp.data.user);
        })
        .catch((error) => {
          // handle refresh token error
          console.log(error);
          // delete the wrong fresh token.
          // signOut();
        });
    }
  }, []);
  const signIn = (accessToken: string, refreshToken: string, user: string) => {
    console.log("sign in: ", { accessToken, refreshToken, user });
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
    setIsAuthenticated(true);
  };
  const signOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        refreshToken,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
