import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <div className='bg-[#3A5F9C] sticky top-0 z-50'>
        <Navbar></Navbar>

      </div>
      <div className='container mx-auto min-h-[calc(100vh-65px)]'>
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default App;