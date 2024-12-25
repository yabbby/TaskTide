import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

// Import pages
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import PlannerPage from './Pages/PlannerPage';
import ContactUsPage from './Pages/ContactUsPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';

function App() {
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Store username

  useEffect(() => {
    axios.get('http://localhost:5000/api/message')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <Header 
        isAuthenticated={isAuthenticated} 
        username={username} 
        setIsAuthenticated={setIsAuthenticated} 
        setUsername={setUsername} 
      /> {/* Pass authentication state to Header */}
      
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          
          {/* Protect PlannerPage with ProtectedRoute */}
          <Route 
            path="/planner" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PlannerPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/login" 
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} 
          />
          <Route 
            path="/signup" 
            element={<SignUpPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} 
          />
        </Routes>
        <p className="text-center text-gray-700 mt-8">{message}</p>
      </main>
    </Router>
  );
}

export default App;
