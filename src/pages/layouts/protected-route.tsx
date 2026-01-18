import { ROUTER_PATH } from "@/constants/router-path";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to={ROUTER_PATH.LOGIN} replace />;
  }

  return <Outlet />;
}
