import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, username, setIsAuthenticated, setUsername }) => {
  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    // Clear any authentication tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-blue-200">TaskTide</Link> {/* Make the logo a clickable Link */}
      </div>
      <nav className="flex-1">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/planner" className="hover:underline">Planner</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </nav>

      <div className="flex space-x-4">
        {!isAuthenticated ? (
          <>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign Up
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <span className="text-white">{username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
