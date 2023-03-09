import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_URL } from '../constant/url.js';

const NotFound = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center font-galano font-galano'>
      <h2>Oops! Page not found.</h2>
      <h1 className='text-platinium text-[120px] font-extrabold md:text-[200px]'>404</h1>
      <button className=' rounded-[3px] bg-green py-[10px] px-[25px] font-galano font-bold text-white'>
        <Link to={HOME_URL}>Go back home</Link>
      </button>
    </div>
  );
};

export default NotFound;
