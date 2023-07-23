import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export const AdminRoute = ({ user, redirectPath = "/", children }) => {
  console.log(user);

  if (!auth?.currentUser?.uid === "vsfgXM6eWkXg7g1b3KoNGirxCKl2") {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
