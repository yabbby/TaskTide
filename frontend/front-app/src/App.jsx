import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';


// Components for each page
const Home = () => (
  <div className="text-center p-8">
    <h1 className="text-4xl font-bold mb-4">Welcome to TaskTide</h1>
    <p className="text-lg">Your ultimate weekly planner app to stay organized and productive!</p>
  </div>
);

const About = () => (
  <div className="text-center p-8">
    <h1 className="text-4xl font-bold mb-4">About TaskTide</h1>
    <p className="text-lg">
      TaskTide is designed to help you plan your week efficiently, keep track of your tasks, 
      and achieve your goals. Our intuitive interface makes managing your time a breeze.
    </p>
  </div>
);

const Planner = () => (
  <div className="text-center p-8">
    <h1 className="text-4xl font-bold mb-4">Your Weekly Planner</h1>
    <p className="text-lg">Start planning your week by adding tasks and deadlines below:</p>
    {/* Add functionality to display and manage tasks here */}
  </div>
);

const Contact = () => (
  <div className="text-center p-8">
    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
    <p className="text-lg mb-4">If you have any questions or feedback, feel free to reach out to us:</p>
    <ul className="text-lg">
      <li>Email: <a href="mailto:support@tasktide.com" className="text-blue-600 hover:underline">support@tasktide.com</a></li>
      <li>Phone: +123 456 7890</li>
    </ul>
  </div>
);

// App Component with Navigation
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/message') // Replace PORT with your backend port
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <p className="text-center text-gray-700 mt-8">{message}</p>
      </main>
    </Router>
  );
}

export default App;
