import React from 'react';

const Header = () => (
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <div className="text-2xl font-bold">TaskTide</div>
    <nav className="flex-1">
      <ul className="flex justify-center space-x-6">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="/about" className="hover:underline">About</a></li>
        <li><a href="/planner" className="hover:underline">Planner</a></li>
        <li><a href="/contact" className="hover:underline">Contact</a></li>
      </ul>
    </nav>
    <div className="flex space-x-4">
      <a 
        href="/signup" 
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Sign Up
      </a>
      <a 
        href="/login" 
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Login
      </a>
    </div>
  </header>
);

export default Header;

