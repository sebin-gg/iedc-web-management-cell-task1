import React, { useState } from 'react';

export default function AdminPasswordModal({ onSubmit, onClose, error }) {
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSubmit(password);
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-black dark:text-gray-100">Admin access — enter password</h3>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 bg-white text-black
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                         dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              autoFocus
            />
          </div>
          {error && <div className="text-sm text-red-600 dark:text-red-300">{error}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded border bg-white dark:bg-gray-700">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-[var(--accent)] text-white">Enter</button>
          </div>
        </form>
      </div>
    </div>
  );
}