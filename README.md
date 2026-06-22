# Udukku — Music Learning Platform

Premium, multi-page React app. Front-end only — all data flows through a
clean service layer (`src/services/apiService.js`) so the project remains
fully portable. There are **no Emergent dependencies**.

## Stack
- React 19 + react-router-dom 7
- Tailwind CSS (custom Udukku palette)
- shadcn/ui (Sheet, Sonner toaster)
- lucide-react icons
- Hanken Grotesk (Google Fonts)

## Pages
| Route       | Description                              |
| ----------- | ---------------------------------------- |
| `/`         | Home (hero, stats, vision, tutors, etc.) |
| `/booking`  | Booking form                              |
| `/about`    | About Us                                  |
| `/contact`  | Contact form                              |
| `/admin`    | Read-only submissions dashboard           |

## Architecture
```
src/
├── components/        # Section components (Header, Hero, ...)
├── pages/             # Route-level pages
├── data/mockData.js   # All marketing copy + sample content
└── services/
    └── apiService.js  # SINGLE integration point for backend
```

### Connecting a real backend
`src/services/apiService.js` exposes three services:
- `contentService` — site copy (currently from mock)
- `bookingService` — create / list / remove bookings
- `contactService` — create / list / remove messages

Today these persist to `localStorage`. To switch to Supabase, MongoDB, or any
REST API, replace the function bodies — the public shapes don't change.
See inline comments in the file for examples.

## Local dev
```bash
yarn install
yarn start
```

## Deploy (Vercel / Netlify / any static host)
This is a CRA build (`craco`):
```bash
yarn build
```
Output goes to `build/`. No backend env vars required.
