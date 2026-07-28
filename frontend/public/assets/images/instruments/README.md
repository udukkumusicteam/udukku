# Instrument Images

Drop instrument banner images into this folder, then reference them from the
`GROUPS` array in `src/pages/services/Instruments.jsx`.

## How to add an image

1. Copy the new image into `public/assets/images/instruments/` — for
   example `tabla.jpg`.
2. In `src/pages/services/Instruments.jsx`, find the instrument entry and
   set its `image` field to the public path:

   ```js
   {
     name: 'Tabla',
     description: 'Classical Indian hand drum',
     image: '/assets/images/instruments/tabla.jpg',
   }
   ```

3. Save. The card automatically switches from the fallback icon layout to a
   full-width banner (`object-cover`, matching top corners, consistent
   aspect ratio) — no HTML or component changes required.

## Recommended specs

- Format: JPG or WebP
- Aspect ratio close to 4:3 for the cleanest crop
- Width around 520px, keep file size under ~120 KB when possible
