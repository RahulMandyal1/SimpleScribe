import React from 'react';
import SignupForm from '../features/signup/SignupForm';
import withLoginSignupRedirect from '../hoc/withLoginSignupRedirect';

const SignUp = () => {
  return (
    <section className='h-screen bg-purple-black p-4 py-10 px-4 md:flex md:items-center md:justify-center md:py-0 md:px-8'>
      <SignupForm />
    </section>
  );
};

export default withLoginSignupRedirect(SignUp);
