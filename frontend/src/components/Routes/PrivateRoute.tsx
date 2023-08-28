import { Navigate, Outlet } from "react-router-dom";
import useStore from "../../store";

const PrivateRoute = () => {
  const { auth } = useStore();
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
