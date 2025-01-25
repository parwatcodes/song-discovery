import React from 'react';
import Navbar from './pages/Navbar'; // Adjust the import path as necessary

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
