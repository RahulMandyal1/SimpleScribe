import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <header className='flex w-full items-center justify-between px-8 py-4 font-galano font-normal'>
      <div className='font-extrabold'>
        <span>SimpleScribe</span>
      </div>
      <nav className='flex items-center justify-between'>
        <li className='mx-4'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'font-semibold text-green' : 'text-black')}
          >
            Home
          </NavLink>
        </li>
        <li className='mx-4'>
          <NavLink
            to='/login'
            className={({ isActive }) => (isActive ? 'font-semibold text-green' : 'text-black')}
          >
            Login
          </NavLink>
        </li>
        <li className='mx-4'>
          <NavLink
            to='/signup'
            className={({ isActive }) => (isActive ? 'font-semibold text-green' : 'text-black')}
          >
            signup
          </NavLink>
        </li>
      </nav>
    </header>
  );
};

export default NavigationBar;
