import React from 'react';
import CreatePost from '../components/CreatePost';

const CreatePostPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Create New Blog Post</h1>
      <CreatePost />
    </div>
  );
};

export default CreatePostPage;