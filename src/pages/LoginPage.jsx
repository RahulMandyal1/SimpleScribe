import React from 'react';
import SignInForm from '../features/auth/SignInForm';
import withLoginSignupRedirect from '../hoc/withLoginSignupRedirect';

const LoginPage = () => {
  return (
    <section className='h-screen bg-purple-black p-4 py-10 px-4 md:flex md:items-center md:justify-center md:py-0 md:px-8'>
      <SignInForm />
    </section>
  );
};

export default withLoginSignupRedirect(LoginPage);
