import React, { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const fetchedComments = await blogService.getComments(postId);
            setComments(fetchedComments);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await blogService.addComment(postId, {
                content: newComment
            });
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await blogService.deleteComment(commentId);
            fetchComments();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    if (loading) return <div>Loading comments...</div>;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Comments</h3>

            <form onSubmit={handleSubmit} className="mb-6">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Write a comment..."
                    rows="3"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Comment
                </button>
            </form>

            <div className="space-y-4">
                {comments.map(comment => (
                    <div key={comment.id} className="p-4 border rounded">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-600 text-sm">
                                    {new Date(comment.createdAt.toDate()).toLocaleDateString()}
                                </p>
                                <p className="mt-2">{comment.content}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(comment.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;