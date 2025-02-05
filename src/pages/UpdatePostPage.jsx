import React from 'react';
import UpdatePost from '../components/UpdatePost';

const CreatePostPage = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center my-8">Update Blog Post</h1>
            <UpdatePost />
        </div>
    );
};

export default CreatePostPage;