import Routes from './routes/index';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { validateCurrentUser } from './features/auth/authAPI';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Validate User token
  useEffect(() => {
    dispatch(validateCurrentUser(user?.token));
  }, [user]);

  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
