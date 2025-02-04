import React from 'react';
import BlogList from '../components/BlogList';

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Welcome to My Blog</h1>
      <BlogList />
    </div>
  );
};

export default HomePage;