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

## Implemented (as of 22 Jun 2026)
- Multi-page routing with shared Header, Footer, WaveDivider.
- Home page: Hero, VisionMission, "What is Udukku?", TutorsSlider, Gallery, Testimonials.
- About: Story, Founder, finalized image layouts.
- Contact page: collaboration/event-focused copy, address with icons.
- Booking page: lesson booking form via mock `apiService.js`.
- Unified spacing (`py-16 md:py-20`) and tone audit (no em dashes).
- Photo Gallery now populated with three DSC photographs from real Udukku life.

## Backlog
- **P1** — Verify Booking & Contact forms cleanly express mock loading/success/error states from `apiService.js`.
- **P2** — Add a "Submit a memory" community upload link below Gallery (pending user approval).
- **P2** — Embed WhatsApp action button or Google Map on Contact page (pending user approval).

## Notes for next agent
- Do NOT introduce a real backend or DB.
- Maintain `WaveDivider` and `py-16 md:py-20` spacing.
- Avoid the words "studio", "walk-ins", or "Tuesday to Sunday" on Contact.
- All copy: natural punctuation, never em dashes.
