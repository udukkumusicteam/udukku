// ---------------------------------------------------------------------------
// API SERVICE LAYER
// ---------------------------------------------------------------------------
// This module is the single integration point between the UI and any backend.
// Today it persists submissions to `localStorage` and reads marketing content
// from mockData. To wire up a real backend (Supabase / MongoDB / Firebase /
// REST API), replace the function bodies below — the public API & shapes
// stay the same.
//
// Example future wiring (Supabase):
//   const { data, error } = await supabase.from('bookings').insert(payload);
//   if (error) throw error;
//   return data[0];
//
// Example future wiring (REST):
//   const res = await fetch(`${API_BASE}/bookings`, { method: 'POST', body });
//   if (!res.ok) throw new Error('Failed');
//   return res.json();
// ---------------------------------------------------------------------------

import {
  STATS,
  TUTORS,
  TESTIMONIALS,
  VISION_MISSION,
  HERO_PILLS,
  COURSE_CATEGORIES,
  BOTTOM_CTA,
  SITE,
  INSTRUMENTS,
} from '../data/mockData';

const BOOKINGS_KEY = 'udukku.bookings';
const CONTACTS_KEY = 'udukku.contacts';
const SUBMISSIONS_KEY = 'udukku.submissions';
const MIGRATION_FLAG = 'udukku.submissions.migrated_v1';

// simulate network latency so loading states feel real
const wait = (ms = 450) => new Promise((r) => setTimeout(r, ms));

const readStore = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors – non-blocking for the demo
  }
};

const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// ---------------------------------------------------------------------------
// Unified submissions store
// Every form on the site funnels through bookingService or contactService,
// which mirror each submission into `udukku.submissions` with a formId +
// formLabel so the Admin dashboard can group them dynamically.
// ---------------------------------------------------------------------------

const BOOKING_FIELDS = (p) => ({
  Name: p.name,
  Email: p.email,
  Phone: p.phone,
  'Instrument of interest': p.instrument,
  'Experience level': p.experience,
  'Preferred date': p.preferredDate,
  'Preferred time': p.preferredTime,
  Notes: p.notes,
});

const CONTACT_FIELDS = (p) => ({
  Name: p.name,
  Email: p.email,
  Subject: p.subject,
  Message: p.message,
});

const inferFormMeta = (payload, kind) => {
  if (kind === 'contact') {
    const subject = String(payload?.subject || '').toLowerCase();
    if (subject.startsWith('bring udukku to')) {
      return { formId: 'events-bring-udukku', formLabel: 'Bring Udukku to Your City' };
    }
    if (subject.startsWith('corporate wellness proposal')) {
      return { formId: 'mm-corporate', formLabel: 'Music Meditation · Corporate Wellness' };
    }
    return { formId: 'contact', formLabel: 'Contact Us' };
  }
  // booking kind
  const exp = String(payload?.experience || '');
  if (exp.startsWith('UMR')) {
    return { formId: 'umr-booking', formLabel: 'Udukku Music Room Booking' };
  }
  if (exp.startsWith('Music Meditation · Individual')) {
    return {
      formId: 'mm-individual',
      formLabel: 'Music Meditation · Individual & Group Wellness',
    };
  }
  return { formId: 'main-booking', formLabel: 'Main Booking Form' };
};

const pushSubmission = ({ id, formId, formLabel, fields, submittedAt }) => {
  const rec = {
    id: id || uid(),
    formId,
    formLabel,
    fields,
    status: 'New',
    submittedAt: submittedAt || new Date().toISOString(),
  };
  const all = readStore(SUBMISSIONS_KEY);
  all.unshift(rec);
  writeStore(SUBMISSIONS_KEY, all);
  return rec;
};

// -------- Content (read-only, comes from mock today) ----------
export const contentService = {
  getStats: async () => {
    await wait(120);
    return STATS;
  },
  getTutors: async () => {
    await wait(120);
    return TUTORS;
  },
  getTestimonials: async () => {
    await wait(120);
    return TESTIMONIALS;
  },
  getVisionMission: async () => {
    await wait(80);
    return VISION_MISSION;
  },
  getHeroPills: async () => HERO_PILLS,
  getCategories: async () => COURSE_CATEGORIES,
  getBottomCTA: async () => BOTTOM_CTA,
  getSite: async () => SITE,
  getInstruments: async () => INSTRUMENTS,
};

// -------- Bookings ----------
export const bookingService = {
  async create(payload) {
    await wait();
    // Some booking flows collect a phone / WhatsApp number instead of email.
    // We accept either as a valid contact point so the mock stays flexible.
    if (!payload?.name || (!payload?.email && !payload?.phone)) {
      throw new Error('Name and a contact (email or phone) are required');
    }
    const record = {
      id: uid(),
      ...payload,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const all = readStore(BOOKINGS_KEY);
    all.unshift(record);
    writeStore(BOOKINGS_KEY, all);
    // Mirror into unified submissions store for the Admin dashboard.
    const meta = payload?._meta || inferFormMeta(payload, 'booking');
    pushSubmission({
      id: record.id,
      formId: meta.formId,
      formLabel: meta.formLabel,
      fields: payload?._meta?.fields || BOOKING_FIELDS(payload),
      submittedAt: record.createdAt,
    });
    return record;
  },
  async list() {
    await wait(150);
    return readStore(BOOKINGS_KEY);
  },
  async remove(id) {
    await wait(150);
    const all = readStore(BOOKINGS_KEY).filter((b) => b.id !== id);
    writeStore(BOOKINGS_KEY, all);
    return true;
  },
};

// -------- Contact ----------
export const contactService = {
  async create(payload) {
    await wait();
    if (!payload?.name || !payload?.email || !payload?.message) {
      throw new Error('Name, email and message are required');
    }
    const record = {
      id: uid(),
      ...payload,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const all = readStore(CONTACTS_KEY);
    all.unshift(record);
    writeStore(CONTACTS_KEY, all);
    // Mirror into unified submissions store for the Admin dashboard.
    const meta = payload?._meta || inferFormMeta(payload, 'contact');
    pushSubmission({
      id: record.id,
      formId: meta.formId,
      formLabel: meta.formLabel,
      fields: payload?._meta?.fields || CONTACT_FIELDS(payload),
      submittedAt: record.createdAt,
    });
    return record;
  },
  async list() {
    await wait(150);
    return readStore(CONTACTS_KEY);
  },
  async remove(id) {
    await wait(150);
    const all = readStore(CONTACTS_KEY).filter((c) => c.id !== id);
    writeStore(CONTACTS_KEY, all);
    return true;
  },
};

// -------- Unified submissions (used by the Admin dashboard) --------
export const submissionsService = {
  async list() {
    await wait(120);
    // First-run: migrate any legacy bookings/contacts that pre-date the
    // unified submissions store into it so nothing goes missing in the admin.
    if (!localStorage.getItem(MIGRATION_FLAG)) {
      const submissions = readStore(SUBMISSIONS_KEY);
      const knownIds = new Set(submissions.map((s) => s.id));
      readStore(BOOKINGS_KEY).forEach((b) => {
        if (knownIds.has(b.id)) return;
        const meta = inferFormMeta(b, 'booking');
        submissions.unshift({
          id: b.id,
          formId: meta.formId,
          formLabel: meta.formLabel,
          fields: BOOKING_FIELDS(b),
          status: 'New',
          submittedAt: b.createdAt || new Date().toISOString(),
        });
      });
      readStore(CONTACTS_KEY).forEach((c) => {
        if (knownIds.has(c.id)) return;
        const meta = inferFormMeta(c, 'contact');
        submissions.unshift({
          id: c.id,
          formId: meta.formId,
          formLabel: meta.formLabel,
          fields: CONTACT_FIELDS(c),
          status: 'New',
          submittedAt: c.createdAt || new Date().toISOString(),
        });
      });
      writeStore(SUBMISSIONS_KEY, submissions);
      try {
        localStorage.setItem(MIGRATION_FLAG, '1');
      } catch {
        // ignore quota errors
      }
    }
    return readStore(SUBMISSIONS_KEY);
  },
  async updateStatus(id, status) {
    await wait(120);
    const all = readStore(SUBMISSIONS_KEY).map((s) =>
      s.id === id ? { ...s, status } : s,
    );
    writeStore(SUBMISSIONS_KEY, all);
    return true;
  },
  async remove(id) {
    await wait(120);
    writeStore(
      SUBMISSIONS_KEY,
      readStore(SUBMISSIONS_KEY).filter((s) => s.id !== id),
    );
    // also drop from legacy stores so the Admin does not resurrect it
    writeStore(BOOKINGS_KEY, readStore(BOOKINGS_KEY).filter((b) => b.id !== id));
    writeStore(CONTACTS_KEY, readStore(CONTACTS_KEY).filter((c) => c.id !== id));
    return true;
  },
};

export default {
  contentService,
  bookingService,
  contactService,
  submissionsService,
};
