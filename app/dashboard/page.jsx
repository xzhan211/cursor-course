import ApiKeyManager from '@/components/ApiKeyManager';
import { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  return (
    <div className="w-full">
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'text-sm sm:text-base',
        }}
      />
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-900">
        Overview
      </h1>
      <div className="w-full overflow-x-auto">
        <ApiKeyManager />
      </div>
    </div>
  );
}