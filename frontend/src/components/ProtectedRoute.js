import { Navigate } from "react-router-dom";
import { hasPermission } from "../utils/permissions";
import { getCurrentUser } from "../utils/user";



const ProtectedRoute = ({ permission, children }) => {
  if (!hasPermission(permission)) {
    alert("Access Denied: You do not have permission.");
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
