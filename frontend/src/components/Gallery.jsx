import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Curated event / performance / workshop imagery.
// Replace these URLs with the studio's actual photography when ready —
// the layout will adapt to any image dimensions.
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Open-mic night',
    caption: 'Open-mic night · Spring recital',
  },
  {
    src: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1000&q=80',
    alt: 'Live performance',
    caption: 'Student showcase',
  },
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    alt: 'Drum workshop',
    caption: 'Percussion workshop',
  },
  {
    src: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Acoustic afternoon',
    caption: 'Acoustic afternoons',
  },
  {
    src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=80',
    alt: 'Strings ensemble',
    caption: 'Strings ensemble',
  },
  {
    src: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80',
    alt: 'Studio jam',
    caption: 'Studio jam · Tuesday nights',
  },
  {
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=80',
    alt: 'Solo piano',
    caption: 'Solo piano · Winter recital',
  },
  {
    src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
    alt: 'Voice circle',
    caption: 'Voice circle',
  },
  {
    src: 'https://images.unsplash.com/photo-1488376986648-2512dfc6f736?auto=format&fit=crop&w=1000&q=80',
    alt: 'Backstage moment',
    caption: 'Backstage · After the encore',
  },
];

export const Gallery = () => {
  const [active, setActive] = useState(null); // index or null

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close, prev, next]);

  return (
    <section data-testid="gallery-section" className="bg-cream">
      <div className="udukku-section py-16 md:py-20">
        <div className="max-w-3xl mb-10 md:mb-12">
          <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
            Life at Udukku
          </span>
          <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] text-brown-dark">
            Where every session becomes a{' '}
            <span className="text-italic-serif text-orange">memory</span>.
          </h2>
          <p className="mt-4 text-brown-mid text-base md:text-lg max-w-xl leading-relaxed">
            Open jams, first recitals, quiet workshops, friendships born over a
            shared chord. Small moments from the life that gathers here, week
            after week.
          </p>
        </div>

        {/* Masonry via CSS columns */}
        <div
          data-testid="gallery-masonry"
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]"
        >
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              data-testid={`gallery-tile-${i}`}
              onClick={() => setActive(i)}
              className="group relative mb-5 block w-full overflow-hidden rounded-2xl bg-brown-light/20 break-inside-avoid focus:outline-none focus:ring-2 focus:ring-orange/60"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] sepia-soft"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="pointer-events-none absolute left-4 right-4 bottom-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-left">
                <span className="text-white text-sm tracking-wide">
                  {p.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          data-testid="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={PHOTOS[active].alt}
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={close}
        >
          <button
            data-testid="lightbox-close"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white border border-white/30 hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            data-testid="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white border border-white/30 hover:bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            data-testid="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white border border-white/30 hover:bg-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <figure
            className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PHOTOS[active].src}
              alt={PHOTOS[active].alt}
              className="max-h-[78vh] w-auto rounded-xl shadow-2xl object-contain"
            />
            <figcaption className="mt-4 text-white/80 text-sm tracking-wide">
              {PHOTOS[active].caption}
              <span className="mx-2 text-white/40">·</span>
              <span className="text-white/50">
                {active + 1} / {PHOTOS.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default Gallery;
