import React from 'react';
import Nav from './Nav';

const ProtectedLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main>
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
