import React, { useState, useEffect } from 'react';
import { Button } from '../Ui/ButtonComponents';

export default function EventRegistrationModal({ event, open, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!open) {
      setName('');
      setEmail('');
      setStatus(null);
    }
  }, [open]);

  if (!open || !event) return null;

  function saveRegistration(payload) {
    try {
      const key = 'iedc_event_registrations';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(payload);
      localStorage.setItem(key, JSON.stringify(existing));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setStatus({ type: 'error', message: 'Please provide name and email.' });
      return;
    }
    const payload = {
      eventId: event.id,
      eventTitle: event.title,
      name,
      email,
      registeredAt: new Date().toISOString(),
    };
    const ok = saveRegistration(payload);
    if (ok) {
      setStatus({ type: 'success', message: 'Registration successful — saved locally.' });
      setName('');
      setEmail('');
    } else {
      setStatus({ type: 'error', message: 'Failed to save registration.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg shadow-lg overflow-hidden
                      bg-white text-black dark:bg-gray-800 dark:text-gray-100">
        <div className="flex items-center justify-between px-6 py-3 border-b
                        border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Register: {event.title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-600 dark:text-gray-200">✕</button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md px-3 py-2 border
                         border-gray-300 bg-white text-black
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                         dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Your full name"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md px-3 py-2 border
                         border-gray-300 bg-white text-black
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                         dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          {status && (
            <div className={`text-sm ${status.type === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {status.message}
            </div>
          )}

          <div className="flex items-center justify-end space-x-2">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}