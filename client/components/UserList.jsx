import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This will also delete all their posts.')) {
      return;
    }

    try {
      await axios.delete(`/api/users/${userId}`);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium mb-4">Users</h2>
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user.id} className="py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                title="Delete user"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
          {users.length === 0 && (
            <p className="py-4 text-gray-500 text-center">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}