import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TUTORS } from '../data/mockData';

export const TutorsSlider = () => {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBounds = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('resize', updateBounds);
    return () => {
      el.removeEventListener('scroll', updateBounds);
      window.removeEventListener('resize', updateBounds);
    };
  }, [updateBounds]);

  // (Vertical scroll no longer hijacks the carousel. Navigation is via the
  // arrow buttons and native touch / trackpad horizontal gestures.)

  const scrollByCards = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const step = card ? card.clientWidth + 24 : 300;
    el.scrollBy({ left: dir * step * 1.2, behavior: 'smooth' });
  };

  return (
    <section
      data-testid="tutors-section"
      className="bg-cream text-brown-dark"
    >
      <div className="udukku-section pt-16 md:pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div className="reveal max-w-2xl">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Our Tutors
            </span>
            <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px]">
              Learn from those who have{' '}
              <span className="text-italic-serif text-orange">lived</span> the
              music.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              data-testid="tutors-prev"
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Previous tutor"
              className="w-12 h-12 rounded-full border border-brown-dark/30 inline-flex items-center justify-center text-brown-dark transition-all enabled:hover:bg-brown-dark enabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              data-testid="tutors-next"
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label="Next tutor"
              className="w-12 h-12 rounded-full border border-brown-dark/30 inline-flex items-center justify-center text-brown-dark transition-all enabled:hover:bg-brown-dark enabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="udukku-section pb-16 md:pb-20 overflow-x-auto scrollbar-hide"
        data-testid="tutors-scroll"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex gap-6 md:gap-7">
          {TUTORS.map((t, i) => (
            <article
              key={t.id}
              data-card
              data-testid={`tutor-card-${i}`}
              className="shrink-0 snap-start w-[230px] sm:w-[270px] md:w-[320px] lg:w-[360px] group"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl bg-brown-light/40 card-lift"
                style={{ aspectRatio: '3 / 4' }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover sepia-soft transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl md:text-2xl font-semibold text-brown-dark">
                  {t.name}
                </h3>
                <p className="text-sm text-brown-mid mt-1">
                  {t.role} <span className="text-brown-mid/70">· {t.experience}</span>
                </p>
                <p className="text-sm text-brown-mid mt-3 leading-relaxed">
                  {t.bio}
                </p>
              </div>
            </article>
          ))}
          <div className="shrink-0 w-1" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default TutorsSlider;
