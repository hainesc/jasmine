import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import Branding from "./components/branding/Branding.tsx";
import SignUp from "./components/signup/Signup.tsx";
import SignIn from "./components/signin/SignIn.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import Test from "./components/test/test.tsx";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Branding />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);
