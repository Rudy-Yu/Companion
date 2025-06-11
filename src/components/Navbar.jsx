import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayfulButton } from './PlayfulButton';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Companion
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/companions"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Find Companions
                </Link>
                <Link
                  to="/bookings"
                  className="text-gray-600 hover:text-gray-800"
                >
                  My Bookings
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Profile
                </Link>
                <PlayfulButton
                  onClick={onLogout}
                  variant="secondary"
                >
                  Logout
                </PlayfulButton>
              </>
            ) : (
              <>
                <PlayfulButton
                  onClick={() => navigate('/login')}
                  variant="secondary"
                >
                  Login
                </PlayfulButton>
                <PlayfulButton
                  onClick={() => navigate('/register')}
                  variant="primary"
                >
                  Register
                </PlayfulButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 