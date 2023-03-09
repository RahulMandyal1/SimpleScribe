import React, { useState } from 'react';
import { Field, Formik, useFormik, Form } from 'formik';
import { createUser } from './SignupAPI';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/Icon';
import ListErrors from '../../components/ListErrors';
import * as yup from 'yup';

const validate = yup.object().shape({
  email: yup.string().required('This is a required field*'),
  password: yup.string().required('This is a required field*'),
  username: yup.string().required('This is a required field*')
});

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
    },
    validateOnChange: true,
    validationSchema: validate
  });

  //Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((previousState) => {
      return !previousState;
    });
  };

  const buttonDisabled = formik.errors.email || formik.errors.password || formik.errors.username;

  return (
    <Formik>
      <Form onSubmit={formik.handleSubmit}>
        <div className='mx-auto w-full rounded-[3px] bg-white p-4 py-8 font-galano shadow-md md:w-[400px]'>
          <div className='input-container'>
            <Field
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder='Username'
              className={formik.errors.username && formik.touched.username && 'red-border'}
            />
          </div>
          <div className='input-container'>
            <Field
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder='Email'
              className={formik.errors.email && formik.touched.email && 'red-border'}
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
                className={formik.errors.password && formik.touched.password && 'red-border'}
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
            className={`
            flex h-[42px] w-full items-center justify-center rounded-[3px] bg-darkorchid font-bold tracking-[1px] text-white ${
              buttonDisabled && 'opacity-70'
            }`}
            onClick={formik.handleSubmit}
            disabled={buttonDisabled && true}
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
