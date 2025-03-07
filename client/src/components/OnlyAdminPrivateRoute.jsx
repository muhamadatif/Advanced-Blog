import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

const OnlyAdminPrivateRoute = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const currentUser = useAuthUser();

  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default OnlyAdminPrivateRoute;
