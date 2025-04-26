import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  // If the user is logged in and tries to visit the login page, redirect them to the dashboard
  if (accessToken && window.location.pathname === "/") {
    return <Navigate to="/dashboard/home" replace />;
  }

  // If not authenticated, redirect to login page
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
