import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withLoginSignupRedirect = (Component) => {
  const AuthedComponent = (props) => {
    const { user } = useSelector((state) => state?.auth);
    const navigate = useNavigate();

    if (user?.email && user?.token) {
      return navigate('/');
    } else {
      return <Component {...props} />;
    }
  };

  return AuthedComponent;
};

export default withLoginSignupRedirect;
