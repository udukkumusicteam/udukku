import React, { useEffect, useState } from 'react';
import { bookingService, contactService } from '../services/apiService';
import { Trash2, RefreshCw, Mail, Phone, User, Calendar, Clock, Music, Sparkles, MessageSquare, Tag, Hash } from 'lucide-react';

// Lightweight read-only admin dashboard backed by the service layer.
// Each submission renders every field exactly as the client filled it in.
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
              Every field from every form, exactly as submitted. Wire any
              backend in{' '}
              <code className="bg-white px-1 rounded">src/services/apiService.js</code>.
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

        <div className="mt-8 space-y-5">
          {loading && <p className="text-brown-mid">Loading…</p>}

          {tab === 'bookings' && (
            <EmptyOr
              items={bookings}
              empty="No bookings yet — submit the booking form to see entries here."
              testid="bookings-list"
            >
              {bookings.map((b, idx) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  index={idx}
                  onDelete={() => removeBooking(b.id)}
                />
              ))}
            </EmptyOr>
          )}

          {tab === 'contacts' && (
            <EmptyOr
              items={contacts}
              empty="No messages yet — try the contact form."
              testid="contacts-list"
            >
              {contacts.map((c, idx) => (
                <ContactCard
                  key={c.id}
                  contact={c}
                  index={idx}
                  onDelete={() => removeContact(c.id)}
                />
              ))}
            </EmptyOr>
          )}
        </div>
      </section>
    </main>
  );
}

/* -------------------------------- UI bits -------------------------------- */

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

const EmptyOr = ({ items, empty, testid, children }) => {
  if (!items?.length) {
    return (
      <div
        data-testid={testid}
        className="bg-white border border-brown-dark/10 rounded-3xl p-10 text-brown-mid text-sm"
      >
        {empty}
      </div>
    );
  }
  return <div data-testid={testid} className="space-y-5">{children}</div>;
};

const SubmissionShell = ({ index, createdAt, id, onDelete, deleteLabel, children }) => (
  <article className="bg-white border border-brown-dark/10 rounded-3xl p-6 md:p-8">
    <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-5 border-b border-brown-dark/10">
      <div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-brown-mid">
          Submission #{index + 1}
        </div>
        <div className="mt-1 text-brown-dark font-medium">
          {new Date(createdAt).toLocaleString()}
        </div>
        <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-brown-mid/80 font-mono">
          <Hash className="w-3 h-3" /> {id}
        </div>
      </div>
      <button
        onClick={onDelete}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-brown-dark/15 text-brown-dark/80 hover:bg-orange hover:text-white hover:border-orange transition-colors text-xs"
        aria-label={deleteLabel}
      >
        <Trash2 className="w-3.5 h-3.5" /> Delete
      </button>
    </header>
    <div className="pt-5">{children}</div>
  </article>
);

const FieldRow = ({ icon: Icon, label, value, mono, wide }) => {
  const display =
    value === undefined || value === null || value === '' ? (
      <span className="text-brown-mid/50 italic">Not provided</span>
    ) : (
      value
    );
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-brown-mid mb-1">
        {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />}
        {label}
      </div>
      <div
        className={`text-brown-dark text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words ${
          mono ? 'font-mono text-[13px]' : ''
        }`}
      >
        {display}
      </div>
    </div>
  );
};

const BookingCard = ({ booking, index, onDelete }) => (
  <SubmissionShell
    index={index}
    createdAt={booking.createdAt}
    id={booking.id}
    onDelete={onDelete}
    deleteLabel="Delete booking"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
      <FieldRow icon={User} label="Name" value={booking.name} />
      <FieldRow icon={Mail} label="Email" value={booking.email} mono />
      <FieldRow icon={Phone} label="Phone" value={booking.phone} mono />
      <FieldRow icon={Music} label="Instrument of interest" value={booking.instrument} />
      <FieldRow icon={Sparkles} label="Experience level" value={booking.experience} />
      <FieldRow icon={Calendar} label="Preferred date" value={booking.preferredDate} />
      <FieldRow icon={Clock} label="Preferred time" value={booking.preferredTime} />
      <FieldRow
        icon={MessageSquare}
        label="Notes from the student"
        value={booking.notes}
        wide
      />
    </div>
  </SubmissionShell>
);

const ContactCard = ({ contact, index, onDelete }) => (
  <SubmissionShell
    index={index}
    createdAt={contact.createdAt}
    id={contact.id}
    onDelete={onDelete}
    deleteLabel="Delete message"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
      <FieldRow icon={User} label="Name" value={contact.name} />
      <FieldRow icon={Mail} label="Email" value={contact.email} mono />
      <FieldRow icon={Tag} label="Subject" value={contact.subject} wide />
      <FieldRow
        icon={MessageSquare}
        label="Message"
        value={contact.message}
        wide
      />
    </div>
  </SubmissionShell>
);
