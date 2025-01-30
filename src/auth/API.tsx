import axios from "axios";
import AuthContext, { useAuth } from "./AuthContext";
import React from "react";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 4000,
});

instance.interceptors.request.use((config) => {
  const { accessToken } = useAuth();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const { refreshToken, signIn, signOut } = useAuth();
      if (refreshToken) {
        // TODO: don't use instance within interceptor here
        instance
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
            signIn(token, refreshToken, resp.data.user);
            error.config.headers.Authorization = `Bearer ${token}`;
            // make a retry
            return axios(error.config);
          })
          .catch((error) => {
            // handle refresh token error
            console.log(error);
            // delete the wrong fresh token.
            signOut();
            return Promise.reject(error);
          });
      }
    }
    return error;
  }
);

export default instance;
