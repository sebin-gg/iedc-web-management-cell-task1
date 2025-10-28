import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search events...' }) {
  return (
    <div className="w-full max-w-md">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="Search"
      />
    </div>
  );
}