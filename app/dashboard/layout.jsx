'use client';

import { useState } from 'react';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0
        h-screen
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        w-64 bg-white shadow-lg
        z-40
      `}>
        <Sidebar />
      </div>

      {/* Main Content Wrapper */}
      <main className={`
        flex-1
        transition-all duration-300 ease-in-out
        min-h-screen
        ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-64'}
      `}>
        {/* Content Container */}
        <div className={`
          mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8
          ${isSidebarOpen ? '' : '-ml-64'}
        `}>
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 