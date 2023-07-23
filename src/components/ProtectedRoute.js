import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export const ProtectedRoute = ({ user, redirectPath = "/", children }) => {
  if (!auth?.currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
