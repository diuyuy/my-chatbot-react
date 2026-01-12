import { ROUTER_PATH } from "@/constants/router-path";
import type { User } from "better-auth";
import { Navigate, Outlet, useLoaderData } from "react-router";

export default function ProtectedRoute() {
  const user = useLoaderData<User | null>();

  if (!user) {
    return <Navigate to={ROUTER_PATH.LOGIN} replace />;
  }

  return <Outlet />;
}
