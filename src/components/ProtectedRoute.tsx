import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuth) {
    // redirect to login, preserve original location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
