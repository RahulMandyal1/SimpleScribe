import React, { useEffect, useRef } from 'react';
import {
  favouriteArticle,
  getArticles,
  unFavouriteArticle
} from '../features/articles/articlesAPI';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/loader/Loader';
import Article from './Article';
import ListErrors from '../components/ListErrors';

const Articles = () => {
  const { articles, loading, error, totalArticles } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const pageRef = useRef(0);
  const perPageRecord = 10;
  const { user } = useSelector((state) => state.auth);
  const lastPage = Math.ceil(totalArticles / perPageRecord);

  useEffect(() => {
    //limit of the article is by default set to 10
    dispatch(getArticles(pageRef.current, perPageRecord));
  }, []);

  //loads new articles
  const loadMoreArticles = async () => {
    if (pageRef.current <= lastPage) {
      pageRef.current += 1;
      dispatch(getArticles(pageRef.current, perPageRecord));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && pageRef.current < lastPage) {
      loadMoreArticles();
    }
  };

  const handleFavouriteArticle = (article) => {
    if (article?.favorited) {
      dispatch(unFavouriteArticle(article?.slug, user?.token));
    } else {
      dispatch(favouriteArticle(article?.slug, user?.token));
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
