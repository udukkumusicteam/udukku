# Udukku — Product Requirements Document

## Original problem statement
Build a premium, multi-page Music Learning platform website + mobile web app named "Udukku" recreating https://udukkusample.onhercules.app/ to pixel-level. React + Tailwind + Lucide + shadcn/ui, organic warm earthy-musical palette. Pages: Home, Booking, About, Contact. User additionally requested: no real backend / no Emergent dependencies — use a service-layer abstraction (`apiService.js`) with mock data + an Admin Dashboard. Must be fully exportable to GitHub and deployable to Vercel.

## Personas
- **Aspiring student** — wants to book a free demo session
- **Returning learner** — explores tutors, story, philosophy
- **Studio admin** — reviews bookings and contact messages in the admin dashboard
- **Curious visitor on mobile** — needs a fluid touch-friendly experience

## Tech stack
- React 19, react-router-dom v7, Tailwind 3, shadcn/ui (Sheet, Sonner), lucide-react
- Font: Hanken Grotesk via Google Fonts
- Mock service layer at `src/services/apiService.js` (persists to `localStorage`)
- NO backend, NO MongoDB usage, NO Emergent integration

## What's implemented (2026-02-19)
- Full Tailwind palette + custom utilities (cream / brown / orange / hero gradient)
- Sticky header with scroll-blur and mobile Sheet drawer
- Hero with 130° gradient, radial overlay, hero pills
- Stats section (3-column cream)
- Vision & Mission section (image w/ multiply blend, dual text columns)
- Tutors slider — horizontal scroll, prev/next arrows with disabled-on-boundary, wheel-to-x mapping, snap scrolling
- Testimonials grid w/ large translucent quote glyph
- Bottom CTA full-bleed image w/ dark tint overlay
- 4-col Footer w/ social icons
- Pages: Home, Booking, About, Contact, Admin
- Booking + Contact forms with sonner success toasts and inline success blocks
- Admin dashboard (read-only with delete) reading from same service layer
- ScrollToTop on route change

## Backlog
### P1
- Lazy-load images / next-gen formats
- Add framer-motion entrance animations for sections
- Optional: integrate with real backend (Supabase/MongoDB) via apiService swap

### P2
- Add light visual edits when user supplies brand imagery
- Add a "Pricing / Packages" section
- Add SEO meta + open-graph images per route
