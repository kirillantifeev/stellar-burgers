import { Preloader } from '@ui';
import { RootState, useSelector } from '../services/store';
import { Navigate, Outlet, useLocation } from 'react-router';

export const ProtectedRoute = () => {
  const { isLoading, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();

  // if (isLoading) {
  //   return <Preloader />;
  // }

  if (!isLoggedIn) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <Outlet />; // <--- используйте Outlet для дочерних маршрутов
};
