import React, { useEffect, useState } from 'react';
import { Button } from '../components/Ui/ButtonComponents';

export default function RegistrationsPage() {
  const key = 'iedc_event_registrations';
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    setItems(Array.isArray(data) ? data : []);
  }, []);

  function refresh() {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    setItems(Array.isArray(data) ? data : []);
  }

  function clearAll() {
    if (!confirm('Clear all registrations?')) return;
    localStorage.removeItem(key);
    setItems([]);
  }

  function exportCSV() {
    if (!items.length) return;
    const header = Object.keys(items[0]);
    const rows = items.map(i => header.map(h => `"${String(i[h] ?? '').replace(/"/g,'""')}"`).join(','));
    const csv = [header.join(','), ...rows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'iedc_registrations.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Event Registrations</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh}>
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </Button>
          <Button onClick={exportCSV}>Export CSV</Button>
          <Button variant="destructive" onClick={clearAll}>Clear All</Button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-muted">No registrations found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg bg-[var(--card-bg)]">
          <table className="w-full">
            <thead className="border-b bg-gray-50 dark:bg-gray-800">
              <tr>
                {Object.keys(items[0]).map(k => (
                  <th key={k} className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-color)]">
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((row, idx) => (
                <tr key={idx} className={`
                  ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}
                `}>
                  {Object.keys(items[0]).map(k => (
                    <td key={k} className="px-4 py-3 text-sm whitespace-normal break-words text-[var(--text-color)]">
                      {String(row[k] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}