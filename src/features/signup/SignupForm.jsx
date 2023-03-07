import React, { useState } from 'react';
import { Field, Formik, useFormik, Form } from 'formik';
import { createUser } from './SignupAPI';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/Icon';
import ListErrors from '../../components/ListErrors';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state?.signUp);
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(createUser(values));
    }
  });

  //Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((previousState) => {
      return !previousState;
    });
  };

  return (
    <Formik>
      <Form onSubmit={formik.handleSubmit}>
        <div className='mx-auto w-full font-galano md:w-[400px]'>
          <div className='input-container'>
            <Field
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder='Username'
            />
          </div>
          <div className='input-container'>
            <Field
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder='Email'
            />
          </div>
          <div className='mb-4'>
            <div className='input-container relative mb-2'>
              <Field
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder='Password'
              />
              <div
                className='absolute right-1 top-0 flex h-full w-6 items-center justify-center'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <Icon name='eyeopen' size={'15px'} color='#737376' />
                ) : (
                  <Icon name='eyeclose' size={'15px'} color='#737376' />
                )}
              </div>
            </div>
            <p className='my-2 text-sm text-slategray'>
              Minimum 7 characters, contain both numeric and alphabetic characters.
            </p>
          </div>
          <button
            type='submit'
            className='flex h-[42px] w-full items-center justify-center rounded-[3px] bg-darkorchid font-bold tracking-[1px] text-white'
            onClick={formik.handleSubmit}
          >
            {loading && <Icon name='loader' size={'32px'} />}
            Create Account
          </button>
          <div className='my-[12px]'>
            <ListErrors errors={error} />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default SignupForm;
