import { Navigate } from "react-router-dom";
import { useMemo } from "react";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("accessToken");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  const isTokenExpired = useMemo(() => {
    if (!tokenExpiry) return false;
    const expiryTime = parseInt(tokenExpiry, 10);
    // eslint-disable-next-line react-hooks/purity
    return Date.now() > expiryTime;
  }, [tokenExpiry]);

  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("isLoggedIn");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
