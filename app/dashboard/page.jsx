import ApiKeyManager from '@/components/ApiKeyManager';
import { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  return (
    <div className="w-full max-w-full">
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'text-sm sm:text-base',
        }}
      />
      
      {/* Overview Section */}
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Overview
        </h1>

        {/* API Keys Section */}
        <div className="w-full">
          <div className="block sm:hidden"> {/* Mobile view */}
            <div className="space-y-4">
              <div className="flex flex-col space-y-4">
                <ApiKeyManager 
                  displayMode="mobile" 
                  className="max-w-full"
                  style={{ maxWidth: '100vw', overflowX: 'visible' }}
                />
              </div>
            </div>
          </div>
          <div className="hidden sm:block"> {/* Desktop view */}
            <ApiKeyManager displayMode="desktop" />
          </div>
        </div>
      </div>
    </div>
  );
}