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
import Test from "./components/test/test.tsx";
import AuthT from "./auth/AuthT.tsx";
import AuthProvider from "./auth/AuthContext.tsx";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Branding />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<AuthT b={false} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />

        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
