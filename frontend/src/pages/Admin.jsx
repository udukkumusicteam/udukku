import React, { useEffect, useState } from 'react';
import { bookingService, contactService } from '../services/apiService';
import { Trash2, RefreshCw } from 'lucide-react';

// Lightweight read-only admin dashboard backed by the service layer.
// When real backend lands, no changes needed here.
export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [tab, setTab] = useState('bookings');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const [b, c] = await Promise.all([
      bookingService.list(),
      contactService.list(),
    ]);
    setBookings(b);
    setContacts(c);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const removeBooking = async (id) => {
    await bookingService.remove(id);
    load();
  };
  const removeContact = async (id) => {
    await contactService.remove(id);
    load();
  };

  return (
    <main data-testid="admin-page" className="bg-cream min-h-screen">
      <section className="udukku-section pt-32 md:pt-40 pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Admin
            </span>
            <h1 className="text-display mt-3 text-4xl sm:text-5xl text-brown-dark">
              Submissions Dashboard
            </h1>
            <p className="text-brown-mid mt-2 text-sm max-w-lg">
              Data is read through the same service layer as the public site.
              Wire any backend in <code className="bg-white px-1 rounded">src/services/apiService.js</code>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={load}
              data-testid="admin-refresh"
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white border border-brown-dark/15 text-brown-dark hover:bg-brown-dark hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 inline-flex p-1 bg-white rounded-full border border-brown-dark/10">
          <TabBtn active={tab === 'bookings'} onClick={() => setTab('bookings')} testid="tab-bookings">
            Bookings ({bookings.length})
          </TabBtn>
          <TabBtn active={tab === 'contacts'} onClick={() => setTab('contacts')} testid="tab-contacts">
            Contacts ({contacts.length})
          </TabBtn>
        </div>

        <div className="mt-8">
          {loading && <p className="text-brown-mid">Loading…</p>}

          {tab === 'bookings' && (
            <Table
              data-testid="bookings-table"
              empty="No bookings yet — submit the booking form to see entries here."
              cols={['When', 'Name', 'Email', 'Instrument', 'Date', '']}
              rows={bookings.map((b) => [
                new Date(b.createdAt).toLocaleString(),
                b.name,
                b.email,
                b.instrument || '—',
                b.preferredDate || '—',
                <button
                  key="del"
                  onClick={() => removeBooking(b.id)}
                  className="text-orange hover:text-orange-dark"
                  aria-label="Delete booking"
                >
                  <Trash2 className="w-4 h-4" />
                </button>,
              ])}
              items={bookings}
            />
          )}

          {tab === 'contacts' && (
            <Table
              data-testid="contacts-table"
              empty="No messages yet — try the contact form."
              cols={['When', 'Name', 'Email', 'Subject', 'Message', '']}
              rows={contacts.map((c) => [
                new Date(c.createdAt).toLocaleString(),
                c.name,
                c.email,
                c.subject || '—',
                <span key="msg" className="line-clamp-2 text-brown-mid">
                  {c.message}
                </span>,
                <button
                  key="del"
                  onClick={() => removeContact(c.id)}
                  className="text-orange hover:text-orange-dark"
                  aria-label="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>,
              ])}
              items={contacts}
            />
          )}
        </div>
      </section>
    </main>
  );
}

const TabBtn = ({ active, onClick, children, testid }) => (
  <button
    onClick={onClick}
    data-testid={testid}
    className={`h-10 px-5 rounded-full text-sm transition-colors ${
      active ? 'bg-brown-dark text-white' : 'text-brown-dark hover:text-orange'
    }`}
  >
    {children}
  </button>
);

const Table = ({ cols, rows, empty, items, ...rest }) => {
  if (!items?.length) {
    return (
      <div className="bg-white border border-brown-dark/10 rounded-3xl p-10 text-brown-mid text-sm" {...rest}>
        {empty}
      </div>
    );
  }
  return (
    <div className="bg-white border border-brown-dark/10 rounded-3xl overflow-hidden" {...rest}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream text-brown-mid">
            <tr>
              {cols.map((c, i) => (
                <th key={i} className="text-left font-medium px-5 py-3 uppercase tracking-widest text-xs">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-brown-dark/10 text-brown-dark">
                {r.map((cell, j) => (
                  <td key={j} className="px-5 py-4 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
