import React, { useState } from 'react';
import { Field, Formik, useFormik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/Icon';
import { loginUser } from './authAPI';
import ListErrors from '../../components/ListErrors';
import * as yup from 'yup';

const validate = yup.object().shape({
  email: yup.string().required('This is a required field*'),
  password: yup.string().required('This is a required field*')
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, user } = useSelector((state) => state?.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(loginUser(values));
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

  const buttonDisabled = formik.errors.email || formik.errors.password;

  return (
    <Formik>
      <Form onSubmit={formik.handleSubmit}>
        <div className='mx-auto w-full rounded-[3px] bg-white p-4 py-8 font-galano md:w-[400px]'>
          <div className='input-container'>
            <Field
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder='Email'
              className={formik.errors.email && formik.touched.email && 'red-border'}
            />
          </div>
          <div className='input-container relative'>
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
            Sign In
          </button>

          <div className='my-[12px]'>
            <ListErrors errors={error} />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default SignInForm;
