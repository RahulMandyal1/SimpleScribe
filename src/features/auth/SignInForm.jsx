import React from 'react';
import { Field, Formik, useFormik, Form } from 'formik';
import { useDispatch } from 'react-redux';

const SignInForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);
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
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder='Password'
            />
          </div>
          <button
            type='submit'
            className='flex h-[42px] w-full items-center justify-center rounded-[3px] bg-darkorchid font-bold tracking-[1px] text-white'
            onClick={formik.handleSubmit}
          >
            Sign In
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignInForm;