import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/Navigation';

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <main className=' p-4 px-4 md:px-8'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
