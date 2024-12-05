'use client';

export default function CopyNotification({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 
        bg-green-600 text-white px-4 py-2 rounded-md 
        flex items-center gap-2 shadow-lg
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 13l4 4L19 7" 
        />
      </svg>
      <span>Copied API Key to clipboard</span>
      <button 
        onClick={onClose}
        className="ml-2 hover:text-white/80"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>
    </div>
  );
} 