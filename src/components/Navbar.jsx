import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-2xl font-bold">My Blog</Link>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/create" className="bg-white text-blue-600 px-3 py-2 rounded">
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
