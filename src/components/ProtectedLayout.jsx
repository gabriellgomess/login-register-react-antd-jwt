import React from 'react';
import Nav from './Nav';
import '../App.css';

const ProtectedLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className='container'>
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
