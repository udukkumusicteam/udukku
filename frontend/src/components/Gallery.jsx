import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Photographs from life at Udukku.
const PHOTOS = [
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/6csi50ns_DSC05863%20%281%29.jpg',
    alt: 'A moment at Udukku',
    caption: 'Shared moments',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/ddnac6h8_DSC06010%20%281%29.jpg',
    alt: 'A moment at Udukku',
    caption: 'In harmony',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/3mcpimz7_DSC05252%20%281%29.jpg',
    alt: 'A moment at Udukku',
    caption: 'Stories we carry',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/og6vi7lu_IMG_2906.jpg',
    alt: 'A moment at Udukku',
    caption: 'A glimpse of joy',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/iqyui4mw_c3d6cce6-82d4-430c-a2d1-4075625e9fc6.JPG',
    alt: 'A moment at Udukku',
    caption: 'Memories in motion',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/amdyxgg7_IMG_5257.JPG',
    alt: 'A moment at Udukku',
    caption: 'Together in rhythm',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/6mwlqdin_IMG_3251.jpg',
    alt: 'A moment at Udukku',
    caption: 'Quiet between the notes',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/w74xnqq6_DSC05418%20%281%29.jpg',
    alt: 'A moment at Udukku',
    caption: 'Moments that matter',
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_udukku-preview-1/artifacts/4dhds8th_DSC06024%20%281%29.jpg',
    alt: 'A moment at Udukku',
    caption: 'Captured memories',
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
          <span className="reveal uppercase tracking-[0.28em] text-xs text-brown-mid">
            Life at Udukku
          </span>
          <h2 className="reveal text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] text-brown-dark" style={{ transitionDelay: '80ms' }}>
            Where every session becomes a{' '}
            <span className="text-italic-serif text-orange">memory</span>.
          </h2>
          <p className="reveal mt-4 text-brown-mid text-base md:text-lg max-w-xl leading-relaxed" style={{ transitionDelay: '160ms' }}>
            Open jams, first recitals, quiet workshops, friendships born over a
            shared chord. Small moments from the life that gathers here, week
            after week.
          </p>
        </div>

        {/* Responsive dense grid — no awkward gaps at any breakpoint */}
        <div
          data-testid="gallery-grid"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 grid-flow-dense"
        >
          {PHOTOS.map((p, i) => {
            const isFeature = i === 0;
            return (
              <button
                key={p.src}
                type="button"
                data-testid={`gallery-tile-${i}`}
                onClick={() => setActive(i)}
                className={`group relative block w-full overflow-hidden rounded-2xl bg-brown-light/20 focus:outline-none focus:ring-2 focus:ring-orange/60 aspect-square ${
                  isFeature ? 'col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] sepia-soft"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="pointer-events-none absolute left-4 right-4 bottom-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-left">
                  <span className="text-white text-sm tracking-wide">
                    {p.caption}
                  </span>
                </div>
              </button>
            );
          })}
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
