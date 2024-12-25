import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-darkblue text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 TaskTide. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://www.facebook.com" className="hover:text-blue-500">
            Facebook
          </a>
          <a href="https://www.twitter.com" className="hover:text-blue-500">
            Twitter
          </a>
          <a href="https://www.instagram.com" className="hover:text-blue-500">
            Instagram
          </a>
        </div>
        <p className="mt-4">Contact us: <a href="mailto:support@tasktide.com" className="hover:text-blue-500">support@tasktide.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
