import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium mb-4">Posts</h2>
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id} className="py-4">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <p className="text-gray-700 mt-1">{post.content}</p>
              <p className="text-gray-500 text-sm mt-1">User ID: {post.userId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}