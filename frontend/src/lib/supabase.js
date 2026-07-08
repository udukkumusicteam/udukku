// Shared Supabase client for the whole app.
// The URL + publishable/anon key come from the frontend .env file.
import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!url || !key) {
  // Surface a friendly console error early — the site will still boot but
  // any form submission will fail fast rather than hanging.
  // eslint-disable-next-line no-console
  console.error(
    '[supabase] Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY. Check frontend/.env',
  );
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
  global: { headers: { 'x-udukku-client': 'web' } },
});
