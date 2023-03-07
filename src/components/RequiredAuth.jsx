import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const authed = user?.email && user?.token;

  return authed ? children : <Navigate to='/login' replace state={{ path: location.pathname }} />;
};

export default RequireAuth;
