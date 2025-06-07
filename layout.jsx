import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

/**
 * Layout - Komponen layout utama
 * 
 * @param {Object} props - Props komponen
 * @param {React.ReactNode} props.children - Konten halaman
 * @param {boolean} props.isLoggedIn - Status login pengguna
 * @param {Object} props.user - Data pengguna yang login
 * @returns {React.ReactElement}
 */
const Layout = ({ children, isLoggedIn = false, user = null }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

