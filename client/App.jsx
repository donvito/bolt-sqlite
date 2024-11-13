import React, { useState } from 'react';
import UserList from './components/UserList';
import PostList from './components/PostList';
import CreateUser from './components/CreateUser';
import CreatePost from './components/CreatePost';

export default function App() {
  const [view, setView] = useState('users');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <h1 className="text-xl font-bold">Node.js + React App</h1>
              <button
                onClick={() => setView('users')}
                className={`px-3 py-2 rounded-md ${
                  view === 'users' ? 'bg-gray-900 text-white' : 'text-gray-900'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setView('posts')}
                className={`px-3 py-2 rounded-md ${
                  view === 'posts' ? 'bg-gray-900 text-white' : 'text-gray-900'
                }`}
              >
                Posts
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {view === 'users' ? (
          <div className="space-y-6">
            <CreateUser />
            <UserList />
          </div>
        ) : (
          <div className="space-y-6">
            <CreatePost />
            <PostList />
          </div>
        )}
      </main>
    </div>
  );
}