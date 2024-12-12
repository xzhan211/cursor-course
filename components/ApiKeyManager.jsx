'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import CreateApiKeyModal from './CreateApiKeyModal';
import CopyNotification from './CopyNotification';

// Simple SVG icons as components
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');
  const [revealedKeys, setRevealedKeys] = useState({});
  const [showCopyNotification, setShowCopyNotification] = useState(false);

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

  const createApiKey = async ({ name, monthlyLimit }) => {
    if (!name.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, monthlyLimit }),
      });
      const data = await response.json();
      
      if (response.ok) {
        toast.success('API key created successfully');
        setIsModalOpen(false);
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
    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete API key');
      }

      // Update the UI by removing the deleted key
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
      toast.success('API key deleted successfully');
    } catch (error) {
      console.error('Error deleting key:', error);
      toast.error('Failed to delete API key');
    }
  };

  const toggleKeyVisibility = (keyId) => {
    setRevealedKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyNotification(true);
      setTimeout(() => {
        setShowCopyNotification(false);
      }, 3000);
    } catch (err) {
      toast.error('Failed to copy API key');
    }
  };

  const maskApiKey = (key) => {
    return `${key.slice(0, 3)}${'•'.repeat(30)}${key.slice(-4)}`;
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <CopyNotification 
        isVisible={showCopyNotification}
        onClose={() => setShowCopyNotification(false)}
      />

      {/* Header Section - Updated colors */}
      <div className="bg-gradient-to-r from-rose-100 via-purple-100 to-blue-100 rounded-xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-sm font-medium text-gray-600">CURRENT PLAN</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">Researcher</h2>
          </div>
          <button className="bg-white/90 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-all">
            Manage Plan
          </button>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">API Limit</span>
            <span className="text-xs bg-white/50 rounded-full px-2 py-0.5 text-gray-600">?</span>
          </div>
          <div className="bg-white/30 rounded-full h-2 w-full">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '0%' }}></div>
          </div>
          <span className="text-sm text-gray-700 mt-1 block">0/1,000 Requests</span>
        </div>
      </div>

      {/* API Keys Section - Updated colors */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            + Create New Key
          </button>
        </div>

        <CreateApiKeyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={createApiKey}
        />

        {/* API Keys Table - Updated colors */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Key</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apiKeys.map((key) => (
                <tr key={key.id} className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {editingKey === key.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{key.name}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700">0</td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-900">
                    {revealedKeys[key.id] ? key.key : maskApiKey(key.key)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title={revealedKeys[key.id] ? "Hide API Key" : "Show API Key"}
                      >
                        {revealedKeys[key.id] ? <EyeSlashIcon /> : <EyeIcon />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title="Copy to Clipboard"
                      >
                        <ClipboardIcon />
                      </button>
                      {editingKey === key.id ? (
                        <>
                          <button
                            onClick={() => updateApiKey(key.id)}
                            className="p-1 text-green-600 hover:text-green-700 font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEditing(key)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title="Edit"
                        >
                          <PencilIcon />
                        </button>
                      )}
                      <button
                        onClick={() => deleteApiKey(key.id)}
                        className="p-1 text-gray-500 hover:text-red-600"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}