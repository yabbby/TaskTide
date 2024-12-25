import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = ({ setIsAuthenticated, setUsername }) => {
  const [firstName, setFirstName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userData = { firstName, username, email, password };

    try {
      const response = await axios.post('http://localhost:5000/api/signup', userData);
      setMessage(response.data.message);

      // After successful sign-up, store user data and token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      setIsAuthenticated(true);
      setUsername(response.data.email);

      navigate('/login');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message === 'Duplicate username or email') {
          setMessage('Username or email already exists. Please try a different one.');
        } else {
          setMessage(`Error: ${error.response.data.message || 'Server error occurred.'}`);
        }
      } else if (error.request) {
        setMessage('Network error. Please try again.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tl from-cyan-200 to-white" style={{ backgroundImage: 'url("/back.jpg")' }}>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-black" htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
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
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
