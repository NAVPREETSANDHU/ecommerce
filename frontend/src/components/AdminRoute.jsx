import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//Admin Route component used admin role only
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;
