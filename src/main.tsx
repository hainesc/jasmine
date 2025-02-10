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
import { AuthSwitch } from "./auth/Router.tsx";
import Navigation from "./components/dashboard/Navigation.tsx";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Branding />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<Navigation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          element={<AuthSwitch authorized={false} redirect="/dashboard" />}
        >
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
/*
 <Route element={<AuthSwitch authorized={true} redirect="/signin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        */
