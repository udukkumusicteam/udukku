# Udukku — Music Learning Platform PRD

## Original problem statement
Build a premium, fully functional, multi-page Music Learning platform website named **"Udukku"**. Must feature structural routing (Home, Booking, About Us, Contact Us) and recreate a specific organic, warm, earthy-musical aesthetic using React, Tailwind CSS, Lucide React, and shadcn/ui.

## Hard constraints
- **Frontend only.** No real backend, no MongoDB. Mock data via `apiService.js`.
- Copy must be warm, peaceful, contemplative, and contain **zero em dashes**.
- Color palette: oranges, creams, browns. Typography: Hanken Grotesk.
- Portable, deployable to Vercel/GitHub.

## Architecture
```
/app/frontend/
├── src/
│   ├── App.js                  # Router
│   ├── data/mockData.js        # Single source of truth for copy + contact
│   ├── services/apiService.js  # Mock async service layer
│   ├── pages/                  # Home, About, Contact, Booking, Admin
│   └── components/             # Hero, Gallery, WaveDivider, TutorsSlider, etc.
```

## Implemented (as of 06 Feb 2026)
- Multi-page routing with shared Header, Footer, WaveDivider.
- Home page: Hero, VisionMission, "What is Udukku?", TutorsSlider, Gallery, Testimonials.
- About: Story, Founder, finalized image layouts.
- Contact page: collaboration/event-focused copy, address with icons.
- Booking page: lesson booking form via mock `apiService.js`.
- Unified spacing (`py-16 md:py-20`) and tone audit (no em dashes).
- Photo Gallery populated with real Udukku DSC photographs (grid-flow-dense).
- Global animations: RevealObserver, FloatingParticles, staggered fade-ins.
- Custom Udukku SVG branding via Logo.jsx and BrandIcon.jsx with cream/orange cross-fade.
- Admin dashboard shows all form-submission fields.
- Multi-page Services Hub: `/services`, `/services/instruments`, `/services/music-room`, `/services/music-meditation`, `/services/events`.
- **06 Feb 2026** — Fixed BackLink overlap bug on all 4 services sub-pages: changed `inline-flex` to `flex w-fit` so the "Back to Services" link occupies its own line above the eyebrow/H1. Verified by testing agent at 1440x900 and 375x800 viewports (report: /app/test_reports/iteration_1.json).
- **06 Feb 2026** — Rebuilt `/services` as a minimal hero-only landing page (header + full-screen hero + 4 nav pills at the bottom of the hero + footer). No cards, no extra sections. Pills grid: 4-col desktop / 2-col tablet / 1-col mobile. Verified by testing agent across desktop/tablet/mobile viewports (report: /app/test_reports/iteration_2.json).
- **06 Feb 2026** — Removed the global Footer from the `/services` landing page only via a `ConditionalFooter` component; footer remains on all other routes including the 4 services sub-pages.
- **06 Feb 2026** — Rebuilt `/services/music-room` (Udukku Music Room) to match the uploaded brochure and reference photos: dark-brown theme, orange accents, editorial hero with italic-serif accent, 5 "What you sign up for" feature cards, 2 pricing plans (Habit 12-Day, Habit 24-Day highlighted "MOST POPULAR"), cashback tiers, Cashback Offer + Referrals cards, closing "The room is open. Your riyaz is waiting." Booking form now uses ONLY the requested fields: Name, WhatsApp, City/Country, Practice Frequency (Once or Twice / Thrice or more), Preferred Time (Morning/Afternoon/Evening/Night). Header adapts (cream logo, white nav, white Book Now, dark scrolled overlay) for this dark route. `bookingService.create` relaxed to accept phone-or-email. Verified: `/app/test_reports/iteration_3.json`.
- **06 Feb 2026** — Redesigned `/services/events` as a premium editorial page while preserving Udukku branding: orange hero (headline "Where music becomes community."), editorial CSS-columns masonry gallery of 9 real Udukku event photos with hover captions, storytelling numbered category index (01–08) replacing the previous icon-card grid (Corporate Events, Cultural Festivals, School & College Programs, Private Concerts, Spiritual Gatherings, Community Events, Workshops, Custom Performances) with hover-to-orange row interaction, and a new "Bring Udukku to Your City" orange-gradient card with a 4-field enquiry form (Your Name, Email, Your City, What kind of event interests you?) and dark "Send My Request" button that persists to `udukku.contacts` via mock `contactService`. Verified: `/app/test_reports/iteration_4.json`.
- **07 Feb 2026** — Multiple polish passes: category cards on Events reduced to text-only labels; various headings tightened ("Evenings that stayed with us.", "A few kinds of evenings.", trimmed subparagraphs on Services + About + Events); pill contents on `/services` no longer truncate (iteration_6 verified); 4 sub-page heroes each given a distinct look (Instruments cream split, Music Meditation serene cream — later replaced, Events full-bleed photo, Music Room dark editorial). Header logic extended with `isDarkTheme` + `isPhotoHero` + `wantsCreamLogo` so the logo and nav adapt correctly across all heroes.
- **07 Feb 2026** — Full asset localization refactor: created `public/assets/{images/{events,people,about},logos,icons,backgrounds,fonts,illustrations,videos,audio}/` structure, downloaded and check-in all 9 Udukku event photos, founder + 6 tutor headshots, story image, "What is Udukku?" screenshot, and story-hero background. Moved logos + brand icon into `assets/logos/` and `assets/icons/`. Installed `@fontsource-variable/hanken-grotesk` and imported from `src/index.js`; removed Google Fonts `@import` from `index.css` and the Inter link + Google Fonts preconnect from `public/index.html`. Every asset now resolves via `/assets/*` — zero external CDN calls verified (`iteration_7.json`). Added `public/assets/README.md` documenting the structure and the "no external assets" rule for future work.
- **08 Feb 2026** — Full rewrite of `/services/music-meditation` from brochure reference: (a) new two-column hero with "Experience the *Healing Power* of Music" + "Book Individual Session" / "Corporate Enquiry" CTAs, (b) "Why Music Wellness?" 6-card grid, (c) two "Choose Your Wellness Journey" cards, (d) ONE interactive Program Explorer with a tab toggle that renders only Individual OR Corporate at a time with a smooth fade transition, (e) Individual panel with elements, program structure, outcomes, 3 regular pricing plans (Weekly Reset ₹799, Music Reset ₹999, Deep Practice ₹1499), pricing note "International pricing available upon request.", and a "Book My Wellness Session" primary CTA, (f) Corporate panel with WHY / RESET-REGULATE-RESTORE journey / EMPLOYEE OUTCOMES / a delivery format list with EXACTLY the 6 required items and NO participant counts, ending with "Request Corporate Proposal", (g) FAQ (single-open), (h) dark "Book Your Session" card with a dynamic radio-driven form that swaps fields, goals, and submit label ("Book My Session" / "Request Corporate Proposal"), (i) closing orange CTA banner with "Book Individual Session" and "Talk to Our Team" CTAs. ALL CTAs across the page correctly scroll to the Program Explorer or the Booking Form and preselect the right tab/kind (plan cards also preselect the plan). Verified 93/93 assertions in `/app/test_reports/iteration_8.json`.

## Backlog
- **P1** — Verify Booking & Contact forms cleanly express mock loading/success/error states from `apiService.js`.
- **P2** — Add a "Submit a memory" community upload link below Gallery (pending user approval).
- **P2** — Embed WhatsApp action button or Google Map on Contact page (pending user approval).

## Notes for next agent
- Do NOT introduce a real backend or DB.
- Maintain `WaveDivider` and `py-16 md:py-20` spacing.
- Avoid the words "studio", "walk-ins", or "Tuesday to Sunday" on Contact.
- All copy: natural punctuation, never em dashes.
