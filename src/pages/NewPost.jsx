import React from 'react';
import { Field, Formik, useFormik, Form } from 'formik';
import Icon from '../components/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { createNewArticle } from '../features/articles/articleAPI';
import * as yup from 'yup';
import ListErrors from '../components/ListErrors';
import { useNavigate } from 'react-router-dom';

const validate = yup.object().shape({
  title: yup.string().required('This is a required field*'),
  description: yup.string().required('This is a required field*'),
  body: yup.string().required('This is a required field*')
});

const NewPost = () => {
  const { loading, error } = useSelector((state) => state.article);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      body: '',
      tagList: []
    },
    onSubmit: (values) => {
      dispatch(createNewArticle(formik.values, user.token, navigate));
    },
    validateOnChange: true,
    validationSchema: validate
  });

  const buttonDisabled = formik.errors.title || formik.errors.description || formik.errors.body;
  return (
    <div className='p-4 py-10 px-4 text-white md:px-8 '>
      <Formik>
        <Form onSubmit={formik.handleSubmit}>
          <div className='mx-auto w-full rounded-[3px] bg-white p-4 py-8 font-galano md:w-[500px]'>
            <div className='input-container'>
              <Field
                name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder='title'
                className={formik.touched.title && formik.errors.title && 'red-border'}
              />
            </div>
            <div className='input-container h-[50px]'>
              <Field
                name='description'
                as={'textarea'}
                row={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder='description'
                className={formik.errors.description && formik.touched.description && 'red-border'}
              />
            </div>
            <div className='input-container h-[100px]'>
              <Field
                name='body'
                as={'textarea'}
                row={4}
                value={formik.values.body}
                onChange={formik.handleChange}
                placeholder='body'
                className={formik.errors.body && formik.touched.body && 'red-border'}
              />
            </div>
            <div className='input-container'>
              <Field
                name='tags'
                value={formik.values.tags}
                onChange={formik.handleChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ',') {
                    event.preventDefault();
                    const newTag = event.target.value.trim();
                    if (newTag !== '' && !formik.values.tagList.includes(newTag)) {
                      formik.setFieldValue('tagList', [...formik.values.tagList, newTag]);
                    }
                    event.target.value = '';
                  }
                }}
                placeholder='Tags'
              />
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
              Create New Post
            </button>

            <div className='my-[12px]'>
              <ListErrors errors={error} />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewPost;
