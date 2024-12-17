'use client';

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ApiKeysPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">API Keys Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Here you can manage your API keys...</p>
        {/* Add API key management UI here */}
      </div>
    </div>
  )
} 