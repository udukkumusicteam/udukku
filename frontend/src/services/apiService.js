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
    if (!payload?.name || !payload?.email) {
      throw new Error('Name and email are required');
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

export default {
  contentService,
  bookingService,
  contactService,
};
