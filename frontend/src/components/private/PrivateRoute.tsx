import { UseAppSelector } from '@/redux/store';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { userInfo } = UseAppSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
