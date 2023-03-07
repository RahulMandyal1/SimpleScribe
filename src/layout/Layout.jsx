import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/Navigation';

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <main className='min-h-screen bg-purple-black font-galano text-white'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
