import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { HERO_PILLS } from '../data/mockData';

export const Hero = () => (
  <section
    data-testid="hero-section"
    className="relative overflow-hidden bg-hero-gradient text-white"
  >
    <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
    <div className="relative udukku-section pt-28 md:pt-32 pb-24 md:pb-32">
      <span
        data-testid="hero-eyebrow"
        className="inline-block uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/80 mb-5"
      >
        Where music finds you
      </span>

      <h1
        data-testid="hero-title"
        className="text-display text-white text-5xl sm:text-6xl lg:text-[88px] xl:text-[104px] max-w-[12ch]"
      >
        Helping You Tap Into <br className="hidden md:block" />
        The{' '}
        <span className="text-italic-serif text-white/95">
          Power Of Music
        </span>
        .
      </h1>

      <p
        data-testid="hero-subtitle"
        className="mt-8 max-w-2xl text-lg md:text-xl text-white/85 leading-relaxed"
      >
        Music doesn't need to be earned — it needs to be felt. Step in, slow
        down, and let the right mentor help you find the sound that was always
        yours.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          to="/booking"
          data-testid="hero-book-now"
          className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brown-dark text-white text-base font-medium hover:bg-black transition-colors min-w-[44px]"
        >
          Book Now
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <Link
          to="/about"
          data-testid="hero-our-story"
          className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/50 text-white text-base font-medium hover:bg-white/10 transition-colors min-w-[44px]"
        >
          Our Story
        </Link>
      </div>

      <div
        data-testid="hero-pills"
        className="mt-14 flex flex-wrap gap-3 max-w-3xl"
      >
        {HERO_PILLS.map((p) => (
          <span
            key={p}
            className="inline-flex items-center h-10 px-5 rounded-full bg-white/10 border border-white/30 text-white/95 text-sm backdrop-blur-sm"
          >
            {p}
          </span>
        ))}
      </div>
    </div>

    {/* Bottom wave divider — transitions hero orange into the cream Stats section */}
    <svg
      aria-hidden="true"
      data-testid="hero-wave-divider"
      className="relative block w-full h-[80px] sm:h-[110px] md:h-[140px] -mb-px"
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,55 C160,95 320,118 520,98 C700,80 860,52 1040,38 C1200,26 1330,16 1440,8 L1440,140 L0,140 Z"
        fill="#F5F0E5"
      />
    </svg>
  </section>
);

export default Hero;
