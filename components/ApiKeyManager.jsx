'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      toast.error('Failed to fetch API keys');
    }
  };

  const createApiKey = async (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      });
      
      const newKey = await response.json();
      setApiKeys([...apiKeys, newKey]);
      setNewKeyName('');
      toast.success('API key created successfully');
    } catch (error) {
      toast.error('Failed to create API key');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteApiKey = async (id) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;

    try {
      await fetch(`/api/keys/${id}`, { method: 'DELETE' });
      setApiKeys(apiKeys.filter(key => key.id !== id));
      toast.success('API key deleted successfully');
    } catch (error) {
      toast.error('Failed to delete API key');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-8">
      {/* Create new API key */}
      <form onSubmit={createApiKey} className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Create New API Key</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Enter API key name"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Key'}
          </button>
        </div>
      </form>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{apiKey.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                </p>
                <div 
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="mt-2 font-mono text-sm bg-gray-100 px-3 py-1 rounded cursor-pointer hover:bg-gray-200"
                >
                  {apiKey.key}
                </div>
              </div>
              <button
                onClick={() => deleteApiKey(apiKey.id)}
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {apiKeys.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No API keys found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}