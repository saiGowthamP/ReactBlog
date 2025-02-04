import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ post, onDelete }) => {
  return (
    <div className="border rounded p-6 mb-4 shadow-md">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="flex justify-between items-center">
        <Link 
          to={`/post/${post.id}`} 
          className="text-blue-600 hover:underline"
        >
          Read More
        </Link>
        {onDelete && (
          <button 
            onClick={() => onDelete(post.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
