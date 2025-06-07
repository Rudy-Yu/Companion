import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlayfulButton from '@/components/ui/custom/playful-button';
import { ROUTES } from '@/lib/constants';

/**
 * Navbar - Komponen navigasi utama
 * 
 * @param {Object} props - Props komponen
 * @param {boolean} props.isLoggedIn - Status login pengguna
 * @param {Object} props.user - Data pengguna yang login
 * @returns {React.ReactElement}
 */
const Navbar = ({ isLoggedIn = false, user = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center">
          <span className="bg-gradient-to-r from-[#6366f1] to-[#ec4899] bg-clip-text text-2xl font-bold text-transparent">
            Rental Kompanion
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link to={ROUTES.HOME} className="text-sm font-medium hover:text-primary">
            Beranda
          </Link>
          <Link to={ROUTES.COMPANION_LIST} className="text-sm font-medium hover:text-primary">
            Kompanion
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            Layanan
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            Tentang Kami
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to={user?.role === 'companion' ? ROUTES.COMPANION_PROFILE : ROUTES.USER_PROFILE}>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.name || 'Profil'}</span>
                </Button>
              </Link>
              <PlayfulButton variant="primary" size="sm">
                Logout
              </PlayfulButton>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <PlayfulButton variant="primary" size="sm">
                  Sign Up
                </PlayfulButton>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container mx-auto border-t border-border px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link 
              to={ROUTES.HOME} 
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              to={ROUTES.COMPANION_LIST} 
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Kompanion
            </Link>
            <Link 
              to="#" 
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Layanan
            </Link>
            <Link 
              to="#" 
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to={user?.role === 'companion' ? ROUTES.COMPANION_PROFILE : ROUTES.USER_PROFILE}
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil
                </Link>
                <PlayfulButton variant="primary" size="sm" isFullWidth>
                  Logout
                </PlayfulButton>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to={ROUTES.LOGIN}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link 
                  to={ROUTES.REGISTER}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PlayfulButton variant="primary" size="sm" isFullWidth>
                    Sign Up
                  </PlayfulButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

