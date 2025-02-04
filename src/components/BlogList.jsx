import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blogService';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await blogService.getAllPosts();
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8">
      {posts.map(post => (
        <div 
          key={post.id} 
          className="mb-6 p-6 border rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <Link 
            to={`/post/${post.id}`} 
            className="text-blue-600 hover:underline"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;