import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import Placeholder from '../assets/placeholder.jpg';

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


  if (loading) return (
    <div className="container mx-auto mt-8 flex justify-center items-center">
      <div className="text-xl">Loading...</div>
    </div>
  );

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div
            key={post.id}
            className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 w-full">
              <img
                src={Placeholder}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 line-clamp-2 h-14">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3 h-20">
                {post.excerpt}
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-1">👁️</span>
                    {post.viewCount || 0}
                  </div>
                  <button
                    className="flex items-center hover:text-red-500 transition-colors duration-200"
                  >
                    <span className="mr-1">
                      ❤️
                    </span>
                    0
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {post.createdAt?.toDate().toLocaleDateString()}
                </div>
              </div>

              <Link
                to={`/post/${post.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;