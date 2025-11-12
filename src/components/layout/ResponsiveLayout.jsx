import React from 'react';

export default function ResponsiveLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}