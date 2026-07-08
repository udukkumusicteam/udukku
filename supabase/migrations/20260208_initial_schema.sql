-- =====================================================================
-- Udukku — Initial schema
-- 4 tables backing every form on the site
--   1. session_bookings   — Reserve my free Session, Start Your Riyaz (UMR),
--                           Individual & Group Wellness (Music Meditation)
--   2. corporate_bookings — Music Meditation · Corporate Wellness
--   3. contact_messages   — Contact Us
--   4. city_requests      — Want Us To Visit Your City (Events)
--
-- RLS is enabled on every table. The frontend uses the publishable/anon key
-- and needs to INSERT (form submissions) and SELECT / UPDATE / DELETE
-- (Admin Dashboard read + status change + delete). The public-anon policies
-- below match the current app which has no user auth. If you later add auth
-- to /admin, tighten SELECT/UPDATE/DELETE to `authenticated` only.
-- =====================================================================

-- ------------------- prerequisites -------------------
create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- ------------------- helpers -------------------------
-- Reusable status check for every table
--   'New' | 'Contacted' | 'Closed'
-- Kept as a plain text column + check constraint (simpler to migrate than a
-- true PostgreSQL enum if we later need to add another status).

-- =====================================================================
-- 1. session_bookings
-- =====================================================================
create table if not exists public.session_bookings (
  id               uuid          primary key default gen_random_uuid(),
  form_type        text          not null
                                 check (form_type in ('main_booking', 'umr', 'mm_individual')),
  -- Contact (at least one of email or phone is required)
  name             text          not null,
  email            text,
  phone            text,
  -- Main booking + MM individual
  instrument       text,
  experience       text,
  preferred_date   date,
  preferred_time   text,
  -- UMR (Start Your Riyaz) specific
  location         text,
  frequency        text          check (frequency in ('once-twice', 'thrice-plus') or frequency is null),
  -- Music Meditation Individual specific
  plan             text          check (plan in ('weekly-reset', 'music-reset', 'deep-practice') or plan is null),
  goals            text,
  -- Free-form additional notes
  notes            text,
  -- Admin workflow
  status           text          not null default 'New'
                                 check (status in ('New', 'Contacted', 'Closed')),
  created_at       timestamptz   not null default now(),
  -- At least one contact channel present
  constraint session_bookings_has_contact
    check (email is not null and length(trim(email)) > 0
           or phone is not null and length(trim(phone)) > 0)
);

create index if not exists idx_session_bookings_created_at
  on public.session_bookings (created_at desc);
create index if not exists idx_session_bookings_form_type
  on public.session_bookings (form_type);
create index if not exists idx_session_bookings_status
  on public.session_bookings (status);

-- =====================================================================
-- 2. corporate_bookings
-- =====================================================================
create table if not exists public.corporate_bookings (
  id             uuid          primary key default gen_random_uuid(),
  contact_name   text          not null,
  work_email     text          not null,
  company_name   text          not null,
  team_size      text,
  goals          text,
  status         text          not null default 'New'
                               check (status in ('New', 'Contacted', 'Closed')),
  created_at     timestamptz   not null default now()
);

create index if not exists idx_corporate_bookings_created_at
  on public.corporate_bookings (created_at desc);
create index if not exists idx_corporate_bookings_status
  on public.corporate_bookings (status);

-- =====================================================================
-- 3. contact_messages
-- =====================================================================
create table if not exists public.contact_messages (
  id           uuid          primary key default gen_random_uuid(),
  name         text          not null,
  email        text          not null,
  subject      text,
  message      text          not null,
  status       text          not null default 'New'
                             check (status in ('New', 'Contacted', 'Closed')),
  created_at   timestamptz   not null default now()
);

create index if not exists idx_contact_messages_created_at
  on public.contact_messages (created_at desc);
create index if not exists idx_contact_messages_status
  on public.contact_messages (status);

-- =====================================================================
-- 4. city_requests
-- =====================================================================
create table if not exists public.city_requests (
  id               uuid          primary key default gen_random_uuid(),
  name             text          not null,
  email            text          not null,
  city             text          not null,
  event_interest   text,
  status           text          not null default 'New'
                                 check (status in ('New', 'Contacted', 'Closed')),
  created_at       timestamptz   not null default now()
);

create index if not exists idx_city_requests_created_at
  on public.city_requests (created_at desc);
create index if not exists idx_city_requests_status
  on public.city_requests (status);

-- =====================================================================
-- Row Level Security
-- Enable + open the policies the frontend needs.
-- =====================================================================

-- session_bookings
alter table public.session_bookings enable row level security;

create policy "public can insert session_bookings"
  on public.session_bookings for insert to anon, authenticated
  with check (true);

create policy "public can read session_bookings"
  on public.session_bookings for select to anon, authenticated
  using (true);

create policy "public can update session_bookings"
  on public.session_bookings for update to anon, authenticated
  using (true) with check (true);

create policy "public can delete session_bookings"
  on public.session_bookings for delete to anon, authenticated
  using (true);

-- corporate_bookings
alter table public.corporate_bookings enable row level security;

create policy "public can insert corporate_bookings"
  on public.corporate_bookings for insert to anon, authenticated
  with check (true);

create policy "public can read corporate_bookings"
  on public.corporate_bookings for select to anon, authenticated
  using (true);

create policy "public can update corporate_bookings"
  on public.corporate_bookings for update to anon, authenticated
  using (true) with check (true);

create policy "public can delete corporate_bookings"
  on public.corporate_bookings for delete to anon, authenticated
  using (true);

-- contact_messages
alter table public.contact_messages enable row level security;

create policy "public can insert contact_messages"
  on public.contact_messages for insert to anon, authenticated
  with check (true);

create policy "public can read contact_messages"
  on public.contact_messages for select to anon, authenticated
  using (true);

create policy "public can update contact_messages"
  on public.contact_messages for update to anon, authenticated
  using (true) with check (true);

create policy "public can delete contact_messages"
  on public.contact_messages for delete to anon, authenticated
  using (true);

-- city_requests
alter table public.city_requests enable row level security;

create policy "public can insert city_requests"
  on public.city_requests for insert to anon, authenticated
  with check (true);

create policy "public can read city_requests"
  on public.city_requests for select to anon, authenticated
  using (true);

create policy "public can update city_requests"
  on public.city_requests for update to anon, authenticated
  using (true) with check (true);

create policy "public can delete city_requests"
  on public.city_requests for delete to anon, authenticated
  using (true);

-- =====================================================================
-- End of migration
-- =====================================================================
