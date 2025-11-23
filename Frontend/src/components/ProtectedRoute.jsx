import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const userType = localStorage.getItem("user_type");
  if (!userType) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(userType)) {
    if (userType === "admin") return <Navigate to="/admin" replace />;
    if (userType === "candidate") return <Navigate to="/home" replace />;
  }
  return children;
}
