// Supabase-backed services for every form on the site.
// Each module exposes create + list + updateStatus + remove.
// The Admin dashboard consumes `submissionsService` which unifies the four
// tables into a single normalised submissions stream.
import { supabase } from '../../lib/supabase';

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

const throwIfError = (error, action) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(`[supabase] ${action} failed`, error);
    throw new Error(error.message || `${action} failed`);
  }
};

const nonEmpty = (v) => (v === undefined || v === '' ? null : v);

/* ================================================================== */
/*  1. session_bookings                                                */
/* ================================================================== */

export const sessionBookingsService = {
  /** Reserve My Free Session (main booking form) */
  async createMainBooking({ name, email, phone, instrument, experience, preferredDate, preferredTime, notes }) {
    if (!name || (!email && !phone)) {
      throw new Error('Name and a contact (email or phone) are required');
    }
    const { data, error } = await supabase
      .from('session_bookings')
      .insert({
        form_type: 'main_booking',
        name,
        email: nonEmpty(email),
        phone: nonEmpty(phone),
        instrument: nonEmpty(instrument),
        experience: nonEmpty(experience),
        preferred_date: nonEmpty(preferredDate),
        preferred_time: nonEmpty(preferredTime),
        notes: nonEmpty(notes),
      })
      .select()
      .single();
    throwIfError(error, 'createMainBooking');
    return data;
  },

  /** Start Your Riyaz (Udukku Music Room) */
  async createUMR({ name, whatsapp, location, frequency, preferredTime, notes }) {
    if (!name || !whatsapp) throw new Error('Name and WhatsApp number are required');
    const { data, error } = await supabase
      .from('session_bookings')
      .insert({
        form_type: 'umr',
        name,
        // The UMR form collects `whatsapp`; the column is `phone`.
        phone: whatsapp,
        location: nonEmpty(location),
        frequency: nonEmpty(frequency),
        preferred_time: nonEmpty(preferredTime),
        notes: nonEmpty(notes),
      })
      .select()
      .single();
    throwIfError(error, 'createUMR');
    return data;
  },

  /** Music Meditation · Individual & Group Wellness */
  async createMMIndividual({ name, email, phone, plan, goals, notes }) {
    if (!name || !email) throw new Error('Name and email are required');
    const { data, error } = await supabase
      .from('session_bookings')
      .insert({
        form_type: 'mm_individual',
        name,
        email,
        phone: nonEmpty(phone),
        plan: nonEmpty(plan),
        goals: nonEmpty(goals),
        notes: nonEmpty(notes),
      })
      .select()
      .single();
    throwIfError(error, 'createMMIndividual');
    return data;
  },

  async list() {
    const { data, error } = await supabase
      .from('session_bookings')
      .select('*')
      .order('created_at', { ascending: false });
    throwIfError(error, 'session_bookings.list');
    return data || [];
  },

  /**
   * Returns the number of rows the server actually changed.
   * 0 means the request was accepted but matched nothing — usually a missing
   * RLS UPDATE policy, or an id that isn't in this table.
   */
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('session_bookings')
      .update({ status })
      .eq('id', id)
      .select('id');
    throwIfError(error, 'session_bookings.updateStatus');
    return data?.length ?? 0;
  },

  /** Returns the number of rows actually deleted. 0 means nothing matched. */
  async remove(id) {
    const { data, error } = await supabase
      .from('session_bookings')
      .delete()
      .eq('id', id)
      .select('id');
    throwIfError(error, 'session_bookings.remove');
    return data?.length ?? 0;
  },
};

/* ================================================================== */
/*  2. corporate_bookings                                              */
/* ================================================================== */

export const corporateBookingsService = {
  async create({ contactName, workEmail, companyName, teamSize, goals }) {
    if (!contactName || !workEmail || !companyName) {
      throw new Error('Contact name, work email and company name are required');
    }
    const { data, error } = await supabase
      .from('corporate_bookings')
      .insert({
        contact_name: contactName,
        work_email: workEmail,
        company_name: companyName,
        team_size: nonEmpty(teamSize),
        goals: nonEmpty(goals),
      })
      .select()
      .single();
    throwIfError(error, 'corporate_bookings.create');
    return data;
  },

  async list() {
    const { data, error } = await supabase
      .from('corporate_bookings')
      .select('*')
      .order('created_at', { ascending: false });
    throwIfError(error, 'corporate_bookings.list');
    return data || [];
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('corporate_bookings')
      .update({ status })
      .eq('id', id)
      .select('id');
    throwIfError(error, 'corporate_bookings.updateStatus');
    return data?.length ?? 0;
  },

  async remove(id) {
    const { data, error } = await supabase
      .from('corporate_bookings')
      .delete()
      .eq('id', id)
      .select('id');
    throwIfError(error, 'corporate_bookings.remove');
    return data?.length ?? 0;
  },
};

/* ================================================================== */
/*  3. contact_messages                                                */
/* ================================================================== */

export const contactMessagesService = {
  async create({ name, phone, email, subject, message }) {
    if (!name || !email || !message) {
      throw new Error('Name, email and message are required');
    }
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        // Added: the contact form now collects a WhatsApp number.
        phone: nonEmpty(phone),
        email,
        subject: nonEmpty(subject),
        message,
      })
      .select()
      .single();
    throwIfError(error, 'contact_messages.create');
    return data;
  },

  async list() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    throwIfError(error, 'contact_messages.list');
    return data || [];
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select('id');
    throwIfError(error, 'contact_messages.updateStatus');
    return data?.length ?? 0;
  },

  async remove(id) {
    const { data, error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)
      .select('id');
    throwIfError(error, 'contact_messages.remove');
    return data?.length ?? 0;
  },
};

/* ================================================================== */
/*  4. city_requests                                                   */
/* ================================================================== */

export const cityRequestsService = {
  async create({ name, email, phone, city, eventInterest }) {
    if (!name || !email || !city) {
      throw new Error('Name, email and city are required');
    }
    const { data, error } = await supabase
      .from('city_requests')
      .insert({
        name,
        email,
        // Added: the "Bring Udukku To You" form now collects a WhatsApp number.
        phone: nonEmpty(phone),
        city,
        event_interest: nonEmpty(eventInterest),
      })
      .select()
      .single();
    throwIfError(error, 'city_requests.create');
    return data;
  },

  async list() {
    const { data, error } = await supabase
      .from('city_requests')
      .select('*')
      .order('created_at', { ascending: false });
    throwIfError(error, 'city_requests.list');
    return data || [];
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('city_requests')
      .update({ status })
      .eq('id', id)
      .select('id');
    throwIfError(error, 'city_requests.updateStatus');
    return data?.length ?? 0;
  },

  async remove(id) {
    const { data, error } = await supabase
      .from('city_requests')
      .delete()
      .eq('id', id)
      .select('id');
    throwIfError(error, 'city_requests.remove');
    return data?.length ?? 0;
  },
};

/* ================================================================== */
/*  Unified submissions feed for the Admin Dashboard                   */
/* ================================================================== */

const SESSION_FORM_META = {
  main_booking: { formId: 'main-booking', formLabel: 'Reserve My Free Session' },
  umr: { formId: 'umr-booking', formLabel: 'Start Your Riyaz (Udukku Music Room)' },
  mm_individual: {
    formId: 'mm-individual',
    formLabel: 'Individual & Group Wellness',
  },
};

const PLAN_LABEL = {
  'weekly-reset': 'Weekly Reset',
  'music-reset': 'Music Reset',
  'deep-practice': 'Deep Practice',
};

const FREQUENCY_LABEL = {
  'once-twice': 'Once or twice a week',
  'thrice-plus': 'Thrice or more a week',
};

const normaliseSessionBooking = (r) => {
  const meta = SESSION_FORM_META[r.form_type] || {
    formId: `session-${r.form_type}`,
    formLabel: `Session Booking (${r.form_type})`,
  };
  const fields = { Name: r.name };
  if (r.email) fields.Email = r.email;
  if (r.phone) fields[r.form_type === 'umr' ? 'WhatsApp' : 'Phone'] = r.phone;
  if (r.instrument) fields.Instrument = r.instrument;
  if (r.experience) fields.Experience = r.experience;
  if (r.preferred_date) fields['Preferred date'] = r.preferred_date;
  if (r.preferred_time) fields['Preferred time'] = r.preferred_time;
  if (r.location) fields['City, Country'] = r.location;
  if (r.frequency) fields.Frequency = FREQUENCY_LABEL[r.frequency] || r.frequency;
  if (r.plan) fields.Plan = PLAN_LABEL[r.plan] || r.plan;
  if (r.goals) fields.Goals = r.goals;
  if (r.notes) fields.Notes = r.notes;
  return {
    id: r.id,
    _table: 'session_bookings',
    formId: meta.formId,
    formLabel: meta.formLabel,
    fields,
    status: r.status,
    submittedAt: r.created_at,
  };
};

const normaliseCorporate = (r) => ({
  id: r.id,
  _table: 'corporate_bookings',
  formId: 'mm-corporate',
  formLabel: 'Music Meditation · Corporate Wellness',
  status: r.status,
  submittedAt: r.created_at,
  fields: {
    'Contact name': r.contact_name,
    'Work email': r.work_email,
    'Company name': r.company_name,
    ...(r.team_size ? { 'Team size': r.team_size } : {}),
    ...(r.goals ? { Goals: r.goals } : {}),
  },
});

const normaliseContact = (r) => ({
  id: r.id,
  _table: 'contact_messages',
  formId: 'contact',
  formLabel: 'Contact Us',
  status: r.status,
  submittedAt: r.created_at,
  fields: {
    Name: r.name,
    Email: r.email,
    // Added: surface the new WhatsApp number in the dashboard + CSV export.
    ...(r.phone ? { WhatsApp: r.phone } : {}),
    ...(r.subject ? { Subject: r.subject } : {}),
    Message: r.message,
  },
});

const normaliseCity = (r) => ({
  id: r.id,
  _table: 'city_requests',
  formId: 'events-bring-udukku',
  formLabel: 'Want Us To Visit Your City',
  status: r.status,
  submittedAt: r.created_at,
  fields: {
    Name: r.name,
    Email: r.email,
    // Added: surface the new WhatsApp number in the dashboard + CSV export.
    ...(r.phone ? { WhatsApp: r.phone } : {}),
    City: r.city,
    ...(r.event_interest ? { 'Event interest': r.event_interest } : {}),
  },
});

const TABLE_TO_SERVICE = {
  session_bookings: sessionBookingsService,
  corporate_bookings: corporateBookingsService,
  contact_messages: contactMessagesService,
  city_requests: cityRequestsService,
};

export const submissionsService = {
  /** Fetch all submissions across the 4 tables, newest first. */
  async list() {
    const [sessions, corporate, contact, city] = await Promise.all([
      sessionBookingsService.list(),
      corporateBookingsService.list(),
      contactMessagesService.list(),
      cityRequestsService.list(),
    ]);
    return [
      ...sessions.map(normaliseSessionBooking),
      ...corporate.map(normaliseCorporate),
      ...contact.map(normaliseContact),
      ...city.map(normaliseCity),
    ].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  },

  async updateStatus(record, status) {
    const svc = TABLE_TO_SERVICE[record._table];
    if (!svc) throw new Error(`Unknown table: ${record._table}`);
    return svc.updateStatus(record.id, status);
  },

  async remove(record) {
    const svc = TABLE_TO_SERVICE[record._table];
    if (!svc) throw new Error(`Unknown table: ${record._table}`);
    return svc.remove(record.id);
  },
};

export default {
  sessionBookingsService,
  corporateBookingsService,
  contactMessagesService,
  cityRequestsService,
  submissionsService,
};
