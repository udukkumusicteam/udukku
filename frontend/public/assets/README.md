# Udukku — Local Asset Structure

Every image, logo, icon, background, and font used by the Udukku website lives
inside this folder or is bundled from `node_modules` via the fontsource package.
There are no external CDN dependencies at runtime.

```
public/
└── assets/
    ├── images/
    │   ├── events/                    # Real Udukku event photographs
    │   │   ├── between-the-ragas.jpg
    │   │   ├── before-the-first-note.jpg
    │   │   ├── community-listening-circle.jpg
    │   │   ├── cultural-evening.jpg
    │   │   ├── gathering-in-the-round.jpg
    │   │   ├── indian-classical-evening.jpg
    │   │   ├── student-masterclass.jpg
    │   │   ├── the-closing-bow.jpg
    │   │   └── workshop-in-session.jpg
    │   ├── people/                    # Founder + tutor headshots
    │   │   ├── founder.jpg
    │   │   ├── tutor-1.jpg .. tutor-6.jpg
    │   ├── about/
    │   │   └── story.jpg
    │   └── what-is-udukku.png         # "What is Udukku?" hero panel
    ├── logos/
    │   ├── logo-cream.svg             # Light logo (dark / orange backgrounds)
    │   └── logo-orange.svg            # Dark logo (light / cream backgrounds)
    ├── icons/
    │   └── brand-icon.png             # Udukku brand glyph used by <BrandIcon>
    ├── backgrounds/
    │   └── story-hero.jpg             # Bottom CTA background photograph
    ├── illustrations/                 # (reserved for future assets)
    ├── videos/                        # (reserved for future assets)
    ├── audio/                         # (reserved for future assets)
    └── fonts/                         # (reserved for future assets)
```

## Fonts

Hanken Grotesk is shipped locally via `@fontsource-variable/hanken-grotesk`.
It is imported once from `src/index.js`. Do not re-add the Google Fonts CDN.

## Rules for future assets

- **Always save new assets inside the appropriate `public/assets/*/` folder.**
- **Reference them with an absolute path from the site root**, for example
  `/assets/images/events/new-photo.jpg`.
- Do not upload or link to assets from Emergent's storage or any third party
  CDN. If a stock image is needed, download it into
  `public/assets/images/...` and check it in.
- Prefer sensible, human-readable filenames (kebab-case, no spaces).
- Keep the file organisation flat and predictable. A new content type (for
  example, `podcast/`) gets its own subfolder rather than being dumped inside
  an existing one.
