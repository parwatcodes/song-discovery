import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
        <main style={{
          minHeight: 'calc(100vh - 210px)',
        }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
