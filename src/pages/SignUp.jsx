import React from 'react';
import SignupForm from '../features/signup/SignupForm';
import withLoginSignupRedirect from '../hoc/withLoginSignupRedirect';

const SignUp = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default withLoginSignupRedirect(SignUp);
