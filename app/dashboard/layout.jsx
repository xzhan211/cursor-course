'use client';

import { useState } from 'react';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0
        h-screen
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        w-64 bg-white shadow-lg
        z-40
        overflow-y-auto
      `}>
        <div className="pt-16">
          <Sidebar />
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        flex-1
        min-h-screen
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'}
        w-full
      `}>
        <div className="mx-auto w-full px-2 sm:px-4 lg:px-8 py-4 lg:py-8 pt-16">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
} 