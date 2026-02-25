import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("demoUser"));

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}