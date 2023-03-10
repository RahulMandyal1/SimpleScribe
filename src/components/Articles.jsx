import React, { useEffect, useRef } from 'react';
import {
  favouriteArticle,
  getArticles,
  unFavouriteArticle,
  fetchInit
} from '../features/articles/articlesAPI';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/loader/Loader';
import Article from './Article';
import ListErrors from '../components/ListErrors';
import { LOGIN_URL } from '../constant/url';
import { useNavigate } from 'react-router-dom';

const Articles = () => {
  const { articles, loading, error, totalArticles } = useSelector((state) => state.articles);
  const perPageRecord = 10;
  const fetchPageLength = Math.floor(totalArticles / perPageRecord) - 1;
  const dispatch = useDispatch();
  const pageRef = useRef(0);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //init
  useEffect(() => {
    dispatch(fetchInit(pageRef.current, perPageRecord));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 100 && pageRef.current < fetchPageLength) {
        pageRef.current += 1;
        dispatch(getArticles(pageRef.current, perPageRecord));
        // Scroll to the new Y position
        return window.scrollTo({
          top: scrollTop - 200,
          behavior: 'smooth'
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchPageLength]);

  //favorite article
  const handleFavouriteArticle = (article) => {
    if (user) {
      if (article?.favorited) {
        //if user has already liked article then dislike it
        dispatch(unFavouriteArticle(article?.slug, user?.token));
      } else {
        //like article
        dispatch(favouriteArticle(article?.slug, user?.token));
      }
    } else {
      navigate(LOGIN_URL);
    }
  };

  return (
    <div>
      <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2'>
        {articles?.map((article, index) => {
          return (
            <Article
              article={article}
              handleFavouriteArticle={handleFavouriteArticle}
              key={index}
            />
          );
        })}
      </div>
      <div>{loading && <Loader style={'h-[15vh]  min-h-[15vh]'} />}</div>
      <ListErrors errors={error} />
    </div>
  );
};

export default Articles;
