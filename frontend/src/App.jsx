import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import MoreProjects from "./pages/MoreProjects";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const ChatBot = lazy(() => import("./components/ChatBot"));

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
}

function App() {
  const { pathname } = useLocation();
  const isPrivateRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<MoreProjects />} />
        <Route
          path="/moreprojects"
          element={<Navigate to="/projects" replace />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isPrivateRoute && (
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      )}
    </ErrorBoundary>
  );
}

export default App;
