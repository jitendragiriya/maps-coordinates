import React from 'react';

const OfflinePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Offline</h1>
        <p className="text-gray-600">You are currently offline. Please check your internet connection and try again.</p>
      </div>
    </div>
  );
};

export default OfflinePage;
