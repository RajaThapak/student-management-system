import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStorage } from "../auth/storage";

function ProtectedRoute() {
  const location = useLocation();

  if (!authStorage.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
