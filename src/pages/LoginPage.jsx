import React from 'react';
import SignInForm from '../features/auth/SignInForm';
import withLoginSignupRedirect from '../hoc/withLoginSignupRedirect';

const LoginPage = () => {
  return (
    <section>
      <SignInForm />
    </section>
  );
};

export default withLoginSignupRedirect(LoginPage);
