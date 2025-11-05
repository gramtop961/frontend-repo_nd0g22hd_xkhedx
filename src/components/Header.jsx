import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-white/70 backdrop-blur sticky top-0 z-20 border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 text-white text-lg font-bold">TD</span>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Travel Diary</h1>
            <p className="text-sm text-gray-500">Pin places you\'ve visited on a beautiful world map</p>
          </div>
        </div>
        <a
          className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          href="#add"
        >
          Add a place
        </a>
      </div>
    </header>
  );
}
