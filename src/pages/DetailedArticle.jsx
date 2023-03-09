import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDetailedArticle,
  getArticleAllComments,
  createComment,
  deleteComment
} from '../features/articles/detailedArticleAPI';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';
import { Link } from 'react-router-dom';
import { LOGIN_URL, SIGNUP_URL } from '../constant/url';
import { formatDate } from '../utils/globalFun';
import Icon from '../components/Icon';

const DetailedArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { article, loading, comments, commentStatus } = useSelector(
    (state) => state.detailedArticle
  );
  const [commentText, setCommentText] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDetailedArticle(slug));
    dispatch(getArticleAllComments(slug, user?.token));
  }, []);

  //comment input on Change
  const handleChange = ({ target }) => {
    setCommentText(target.value);
  };

  const handleSubmit = () => {
    if (commentText !== '') {
      dispatch(createComment(slug, commentText, user?.token));
    }
    setCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(slug, commentId, user?.token));
  };

  if (loading) {
    return <Loader style={'h-[40vh]  min-h-[40vh]'} />;
  }

  return (
    <section className=' p-4 px-4 md:px-8 '>
      {!loading && (
        <div
          className='my-2 h-auto rounded-sm bg-white p-4 text-black shadow-sm
      '
        >
          <article>
            <header>
              <h2
                className='text-xl font-bold capitalize md:text-3xl
            '
              >
                {article?.title}
              </h2>
            </header>
            <p className='my-2 text-justify text-sm text-slategray md:text-base'>{article?.body}</p>
            <div className='my-4 flex flex-1 flex-wrap items-center'>
              <div className='flex'>
                <img
                  src={article?.author?.image}
                  className='h-10 w-10 rounded-full object-cover'
                  alt='userprofile'
                />
                <div name='user-info' className='mx-2'>
                  <h3 className='text-green '>{article?.author?.username}</h3>
                  <p className=' text-[11px] text-slategray'>{formatDate(article?.updatedAt)}</p>
                </div>
              </div>
              <div className='my-4 flex items-center md:my-0'>
                {article?.tagList.map((tag) => {
                  return (
                    <div
                      className='mx-1 rounded-full border border-[#dddddd] px-2 py-1 text-[12px]'
                      key={tag}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
          {user ? (
            <div name='comments-container'>
              <h3 className='my-2 text-xl font-semibold'>Comments</h3>
              <div className='input-container'>
                <input
                  type='text'
                  placeholder='Enter a comment'
                  value={commentText}
                  onChange={handleChange}
                />
              </div>
              <button
                type='submit'
                onClick={handleSubmit}
                className='
                  rounded-[3px] bg-green py-[8px] px-[25px] font-bold text-white
                  '
              >
                comment
              </button>
              <div className='my-2  '>
                {comments?.map((comment) => {
                  return (
                    <div className='relative py-2 shadow-sm'>
                      <div className='flex'>
                        <img
                          src={comment?.author?.image}
                          className='h-10 w-10 rounded-full object-cover'
                          alt='userprofile'
                        />
                        <div name='user-info relative inline-block' className='mx-2'>
                          <h3 className='text-green '>{comment?.author?.username}</h3>
                          <p className=' text-[11px] text-slategray'>
                            {formatDate(comment?.updatedAt)}
                          </p>
                        </div>

                        {comment?.author.username === user?.username && (
                          <div
                            className='absolute right-0 top-0'
                            onClick={() => {
                              handleDeleteComment(comment?.id);
                            }}
                          >
                            <Icon name='delete' color={'red'} size={'20px'} />
                          </div>
                        )}
                      </div>
                      <div
                        className='text-slategray
                    '
                      >
                        <p>{comment?.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {commentStatus && <Loader />}
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              <p
                className='text-sm md:text-base
              '
              >
                <Link to={LOGIN_URL} className='font-semibold text-green'>
                  SigIn
                </Link>
                <span className='mx-2'>or</span>
                <Link to={SIGNUP_URL} className='font-semibold text-green'>
                  Sign Up
                </Link>
                <span className='mx-2'>to</span>
                add comments on this article.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default DetailedArticle;
