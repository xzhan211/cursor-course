'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      setApiKeys(data.keys || []);
    } catch (error) {
      toast.error('Failed to fetch API keys');
    } finally {
      setIsLoading(false);
    }
  };

  const createApiKey = async (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      });
      const data = await response.json();
      
      if (response.ok) {
        toast.success('API key created successfully');
        setNewKeyName('');
        fetchApiKeys();
      } else {
        throw new Error(data.message || 'Failed to create API key');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const startEditing = (key) => {
    setEditingKey(key.id);
    setEditName(key.name);
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditName('');
  };

  const updateApiKey = async (keyId) => {
    if (!editName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });

      if (response.ok) {
        toast.success('API key updated successfully');
        setEditingKey(null);
        fetchApiKeys();
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update API key');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteApiKey = async (keyId) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;

    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('API key deleted successfully');
        fetchApiKeys();
      } else {
        throw new Error('Failed to delete API key');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create new API key form */}
      <form onSubmit={createApiKey} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Enter API key name"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isCreating}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {isCreating ? 'Creating...' : 'Create API Key'}
          </button>
        </div>
      </form>

      {/* API keys list */}
      <div className="space-y-4">
        {apiKeys.length === 0 ? (
          <p className="text-gray-500">No API keys found</p>
        ) : (
          apiKeys.map((key) => (
            <div
              key={key.id}
              className="p-4 border rounded-lg flex items-center justify-between"
            >
              <div className="flex-1">
                {editingKey === key.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => updateApiKey(key.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium">{key.name}</h3>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(key.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-mono mt-1">{key.key}</p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!editingKey && (
                  <button
                    onClick={() => startEditing(key)}
                    className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteApiKey(key.id)}
                  className="px-3 py-1 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}