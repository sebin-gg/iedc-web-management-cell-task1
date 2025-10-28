import React, { useState, useMemo } from 'react';
import { mockEvents } from '../components/Ui/data/mockdata';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/CardComponents';
import SearchBar from '../components/Ui/SearchBar';
import EventRegistrationModal from '../components/shared/EventRegistrationModal';
import { formatDate } from '../lib/utils';
import { Button } from '../components/Ui/ButtonComponents';

const EventsPage = () => {
  const [query, setQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockEvents;
    return mockEvents.filter(e =>
      e.title.toLowerCase().includes(q) ||
      (e.description || '').toLowerCase().includes(q) ||
      (e.date || '').toLowerCase().includes(q)
    );
  }, [query]);

  function openRegister(event) {
    setSelectedEvent(event);
    setModalOpen(true);
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <div className="flex items-center gap-4">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(event => (
          <Card key={event.id} className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <img src={event.image} alt={event.title} className="rounded-t-xl w-full h-40 object-cover" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600">{event.description}</CardDescription>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-muted">{formatDate(event.date)}</span>
              <div className="space-x-2">
                <Button size="sm" onClick={() => openRegister(event)}>Register</Button>
                <a href="#" className="text-sm text-blue-600 hover:underline">Details</a>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <EventRegistrationModal
        event={selectedEvent}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default EventsPage;