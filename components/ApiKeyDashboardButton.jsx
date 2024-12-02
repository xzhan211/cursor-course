'use client';

import { useRouter } from 'next/navigation';

export default function ApiKeyDashboardButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/dashboard')}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
    >
      Manage API Keys
    </button>
  );
}