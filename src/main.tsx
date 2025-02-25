import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import Branding from "./components/branding/Branding.tsx";
import SignUp from "./components/signup/Signup.tsx";
import SignIn from "./components/signin/Signin.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import AuthProvider from "./auth/AuthContext.tsx";
import { Guard } from "./auth/Guard.tsx";
import DashboardLayout from "./components/test/DashboardLayout.tsx";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Branding />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={<Guard authorized={false} redirect="/dashboard" />}>
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route
          path="/layout"
          element={
            <DashboardLayout
              children={
                <>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                  <h1>abc</h1>
                </>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

/*
 <Route element={<AuthSwitch authorized={true} redirect="/signin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        */
