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
  const sentinelRef = useRef(null);

  //init
  useEffect(() => {
    dispatch(fetchInit(pageRef.current, perPageRecord));
  }, []);

  // fetch more articles when sentinel comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && pageRef.current < fetchPageLength) {
        pageRef.current += 1;
        dispatch(getArticles(pageRef.current, perPageRecord));
      }
    });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchPageLength, articles]);

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
              ref={articles.length - 1 === index ? sentinelRef : null}
            />
          );
        })}
      </div>
      <div ref={sentinelRef}></div>
      <div>{loading && <Loader style={'h-[15vh]  min-h-[15vh]'} />}</div>
      <ListErrors errors={error} />
    </div>
  );
};

export default Articles;
