import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("accessToken");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  // Check if user is logged in and has a valid token
  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace />;
  }

  // Check if token is expired
  if (tokenExpiry) {
    const expiryTime = parseInt(tokenExpiry, 10);
    if (Date.now() > expiryTime) {
      // Token expired, clear auth data and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("isLoggedIn");
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
