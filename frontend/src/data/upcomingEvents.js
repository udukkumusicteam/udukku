/**
 * Upcoming Events data source.
 *
 * The UI in `pages/services/Events.jsx` reads from `fetchUpcomingEvents()`.
 * Today it returns the static `SAMPLE_UPCOMING_EVENTS` list; when the
 * Supabase `upcoming_events` table is ready, replace the body of
 * `fetchUpcomingEvents` (and only that) with the query below — no component
 * changes required.
 *
 * Suggested Supabase table (`upcoming_events`):
 *   id            uuid primary key default uuid_generate_v4()
 *   cover_image   text          -- public URL or /assets/... path
 *   title         text not null
 *   category      text not null -- Concert | Workshop | Music Room | Community Event
 *   event_date    date not null
 *   event_time    text          -- free-form, e.g. "7:00 PM IST"
 *   venue         text
 *   description   text
 *   status        text          -- Upcoming | Limited Seats | Sold Out
 *   cta_label     text          -- "Register Now" | "Learn More"
 *   cta_url       text          -- external link or slug
 *   created_at    timestamptz default now()
 *
 * Example Supabase swap:
 *
 *   import { supabase } from '../lib/supabase';
 *
 *   export const fetchUpcomingEvents = async () => {
 *     const today = new Date().toISOString().slice(0, 10);
 *     const { data, error } = await supabase
 *       .from('upcoming_events')
 *       .select('*')
 *       .gte('event_date', today)
 *       .order('event_date', { ascending: true });
 *     if (error) throw error;
 *     return data ?? [];
 *   };
 */

export const SAMPLE_UPCOMING_EVENTS = [
  {
    id: 'evt-001',
    cover_image: '/assets/images/events/indian-classical-evening.jpg',
    title: 'An Evening of Ragas',
    category: 'Concert',
    event_date: '2026-08-16',
    event_time: '7:30 PM IST',
    venue: 'Ranga Shankara, Bengaluru',
    description:
      'A quiet, intimate hour of Hindustani ragas performed by our resident tutors and their students, curated for a small listening room.',
    status: 'Upcoming',
    cta_label: 'Register Now',
    cta_url: '#',
  },
  {
    id: 'evt-002',
    cover_image: '/assets/images/events/workshop-in-session.jpg',
    title: 'Tabla Foundations Workshop',
    category: 'Workshop',
    event_date: '2026-08-24',
    event_time: '11:00 AM IST',
    venue: 'Online via Zoom',
    description:
      'A two-hour hands-on introduction to teentaal, dadra and the language of the tabla. Beginners welcome; instrument not required.',
    status: 'Limited Seats',
    cta_label: 'Register Now',
    cta_url: '#',
  },
  {
    id: 'evt-003',
    cover_image: '/assets/images/events/community-listening-circle.jpg',
    title: 'Riyaz Circle: Sunday Morning',
    category: 'Music Room',
    event_date: '2026-09-01',
    event_time: '9:00 AM IST',
    venue: 'Online, Udukku Music Room',
    description:
      'Bring your practice, whatever it is. A weekly ninety-minute room for musicians who want to sit and play in gentle company.',
    status: 'Upcoming',
    cta_label: 'Learn More',
    cta_url: '#',
  },
];

export const fetchUpcomingEvents = async () => {
  return [];
};