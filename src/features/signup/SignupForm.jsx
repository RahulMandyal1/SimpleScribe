import React from 'react';
import { Field, Formik, useFormik, Form } from 'formik';
import { createUser } from './SignupAPI';
import { useDispatch } from 'react-redux';

const SignupForm = () => {
  const dispatch = useDispatch();
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
            <div className='input-container mb-2'>
              <Field
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder='Password'
              />
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
            Create Account
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignupForm;
