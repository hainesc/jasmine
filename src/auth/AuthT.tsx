import { Outlet, Navigate } from "react-router";
interface AuthProps {
  b: boolean;
  cb?: string;
}

function AuthT({ b }: AuthProps) {
  return b ? <Outlet /> : <Navigate to="/signin" replace={true} />;
}
export default AuthT;
