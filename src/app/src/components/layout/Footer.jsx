import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto">
        <p className="text-center">&copy; {new Date().getFullYear()} Running App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;