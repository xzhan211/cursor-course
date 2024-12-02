import ApiKeyManager from '@/components/ApiKeyManager';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">API Key Management</h1>
      <ApiKeyManager />
    </div>
  );
}