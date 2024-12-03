import ApiKeyManager from '@/components/ApiKeyManager';
import { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-8">API Key Management</h1>
      <ApiKeyManager />
    </div>
  );
}