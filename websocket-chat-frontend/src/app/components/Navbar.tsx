import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo or App Name */}
        <div className="text-teal-400 font-bold text-2xl">
          ChatSphere
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white text-lg">Home</a>
          <a href="#features" className="text-gray-300 hover:text-white text-lg">Features</a>
          <a href="#about" className="text-gray-300 hover:text-white text-lg">About</a>
        </div>

        
      </div>
    </nav>
  );
};

export default Navbar;
