'use client';

import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Valid API Key', {
          style: {
            background: '#10B981',
            color: 'white'
          }
        });
      } else {
        toast.error(`Invalid API Key: ${data.error}`, {
          style: {
            background: '#EF4444',
            color: 'white'
          }
        });
      }
    } catch (error) {
      toast.error('Error validating API key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-2xl mx-auto p-6">
        <Toaster position="top-right" />
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Playground</h1>
        </div>
        
        {/* API Key Validation Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="Enter your API key (e.g., sk_...)"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-colors
                ${isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                }`}
            >
              {isLoading ? 'Validating...' : 'Validate API Key'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 