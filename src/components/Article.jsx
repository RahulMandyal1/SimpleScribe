import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/globalFun';
import Icon from '../components/Icon';

const Article = ({ article, handleFavouriteArticle }) => {
  return (
    <article
      className='w-full rounded-[3px] bg-white p-4 text-black
        '
    >
      <div
        className='flex items-center justify-between
            '
      >
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
        <div
          className={`flex items-center justify-center rounded-[3px] border border-green p-1 px-2 ${
            article?.favorited && 'bg-green text-white'
          }`}
          onClick={() => {
            handleFavouriteArticle(article);
          }}
        >
          <Icon name='like' size={'20px'} color={'red'} />
          <span className='mx-1 text-sm'>{article?.favoritesCount}</span>
        </div>
      </div>
      <h3 className='text-md my-2 font-semibold'>
        <Link to={`/article/${article?.slug}`}>{article?.title.slice(0, 70)}</Link>
      </h3>
      <p className='my-2 text-slategray'>{article?.description.slice(0, 150)}...</p>
      <div
        className='my-2 flex  flex-wrap items-center justify-between 
      '
      >
        <div className='flex flex-shrink flex-wrap items-center'>
          {article?.tagList.map((tag) => {
            return (
              <div
                className='mx-1 my-1 rounded-full border border-[#dddddd] px-2 py-1 text-[12px] md:my-0'
                key={tag}
              >
                {tag}
              </div>
            );
          })}
        </div>
        <button className=' my-2 text-sm font-semibold text-green md:my-0'>
          <Link to={`/article/${article?.slug}`}>ReadMore..</Link>
        </button>
      </div>
    </article>
  );
};

export default Article;
