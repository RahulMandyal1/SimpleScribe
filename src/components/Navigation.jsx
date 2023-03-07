import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from './Icon';
import { NEW_POST_URL, HOME_URL, LOGIN_URL, SIGNUP_URL } from '../constant/url';

const NavigationBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [showMenus, setShowMenus] = useState(false);

  //toggle Menus
  const toggleMenus = () => {
    setShowMenus((previousState) => {
      return !previousState;
    });
  };

  // close menus
  const handleCloseMenus = () => {
    setShowMenus(false);
  };

  const authorizedUser = user?.email && user?.token;

  return (
    <header className='relative flex w-full items-center justify-between px-4 py-4 font-galano font-normal md:px-8'>
      <div className='font-extrabold'>
        <span>SimpleScribe</span>
      </div>
      <div
        className='h-full md:hidden 
      '
        onClick={toggleMenus}
      >
        {showMenus ? (
          <Icon name='cross' color='#7F3F98' size={'20px'} />
        ) : (
          <Icon name='burgermenu' color='#7F3F98' size={'20px'} />
        )}
      </div>
      <nav
        className={`absolute  top-[110%]  right-4  rounded-[3px] bg-white shadow-lg md:rounded-none md:shadow-none ${
          showMenus ? 'flex' : 'hidden'
        } flex-col items-center justify-between py-6  md:relative md:inline-flex md:flex-row md:py-0`}
      >
        <li className='mx-4' onClick={handleCloseMenus}>
          <NavLink
            to={HOME_URL}
            className={({ isActive }) => (isActive ? 'font-semibold text-green' : 'text-black')}
          >
            Home
          </NavLink>
        </li>
        {!authorizedUser && (
          <>
            <li className='mx-4' onClick={handleCloseMenus}>
              <NavLink
                to={LOGIN_URL}
                className={({ isActive }) => (isActive ? 'font-semibold text-green' : 'text-black')}
              >
                Login
              </NavLink>
            </li>
            <li className='mx-4' onClick={handleCloseMenus}>
              <NavLink
                to={SIGNUP_URL}
                className={({ isActive }) => (isActive ? 'font-semibold text-green' : 'text-black')}
              >
                Signup
              </NavLink>
            </li>
          </>
        )}

        {authorizedUser && (
          <>
            <li className='mx-4' onClick={handleCloseMenus}>
              <NavLink
                to={NEW_POST_URL}
                className={({ isActive }) => (isActive ? 'font-semibold text-green' : 'text-black')}
              >
                NewPost
              </NavLink>
            </li>
            <li className='mx-4'>
              <div>
                <img
                  src={user?.image}
                  alt='user profile'
                  className='h-[40px] w-[40px] rounded-full object-cover'
                />
              </div>
            </li>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavigationBar;
