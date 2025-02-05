import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogService } from '../services/blogService';
import Comments from '../components/comments';
import Placeholder from '../assets/placeholder.jpg'


const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await blogService.getPostById(id);
        setPost(fetchedPost);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await blogService.deletePost(id);
      window.location.replace('/');
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="container mx-auto mt-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="aspect-w-16 aspect-h-9 w-full">
        <img
          src={Placeholder}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="flex items-center text-gray-600 mb-6 space-x-4">
        <p>{new Date(post.createdAt.toDate()).toLocaleDateString()}</p>
        <div className="flex items-center space-x-2">
          <span>👁️ {post.viewCount || 0} views</span>
        </div>
        <button
          className={`flex items-center space-x-1 `}
        >
          <span>❤️</span>
          <span>0</span>
        </button>
      </div>

      <div className="prose">{post.content}</div>

      <div className="mt-8">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded mr-4"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => window.location.replace(`/edit/${id}`)}
        >
          Edit
        </button>
      </div>

      <Comments postId={id} />
    </div>
  );
};

export default PostDetailPage;