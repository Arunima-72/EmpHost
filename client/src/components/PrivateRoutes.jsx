import { Navigate, Outlet, useLocation } from 'react-router-dom';
const PrivateRoutes = ({ allowedRoles }) => {
  const token = localStorage.getItem('logintoken');
  const role = localStorage.getItem('userRole');

  const isAuthorized = token && allowedRoles.includes(role);

  return isAuthorized ? <Outlet /> : <Navigate to="/emp" />;
};


export default PrivateRoutes