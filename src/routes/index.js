import React from 'react';
import Home from '../pages/Home';
import { useRoutes } from 'react-router';
import { HOME_URL, LOGIN_URL, NEW_POST_URL, SIGNUP_URL } from '../constant/url';
import Layout from '../layout/Layout';
import SignUp from '../pages/SignUp';
import LoginPage from '../pages/LoginPage';
import NewPost from '../pages/NewPost';
import RequireAuth from '../components/RequiredAuth';

const Routes = () => {
  const content = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: SIGNUP_URL,
          element: <SignUp />
        },
        {
          path: LOGIN_URL,
          element: <LoginPage />
        },
        {
          path: HOME_URL,
          element: <Home />
        },
        {
          path: NEW_POST_URL,
          element: (
            <RequireAuth>
              <NewPost />
            </RequireAuth>
          )
        }
      ]
    }
  ]);
  return content;
};
export default Routes;
