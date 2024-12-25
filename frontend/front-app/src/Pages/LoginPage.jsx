import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password }; // Username is not needed for login

    try {
      const response = await axios.post('http://localhost:5000/api/login', userData);
      setMessage(response.data.message);

      // After successful login, store token and user details
      localStorage.setItem('token', response.data.token); // Store token
      localStorage.setItem('username', response.data.username); // Store username
      setIsAuthenticated(true);
      setUsername(response.data.username);

      // Redirect to home page after login
      navigate('/');
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Server error occurred.'}`);
      } else if (error.request) {
        setMessage('Network error. Please try again.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
