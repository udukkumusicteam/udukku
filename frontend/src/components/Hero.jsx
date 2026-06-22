import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { HERO_PILLS } from '../data/mockData';
import WaveDivider from './WaveDivider';

export const Hero = () => (
  <section
    data-testid="hero-section"
    className="relative overflow-hidden bg-hero-gradient text-white"
  >
    <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />
    <div className="relative udukku-section pt-24 md:pt-28 pb-12 md:pb-14">
      <span
        data-testid="hero-eyebrow"
        className="inline-block uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/80 mb-4"
      >
        Where music finds you
      </span>

      <h1
        data-testid="hero-title"
        className="text-display text-white whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px]"
      >
        Helping You Tap Into
        <br />
        The{' '}
        <span className="text-italic-serif text-white/95">Power Of</span>
        <br />
        <span className="text-italic-serif text-white/95">Music</span>.
      </h1>

      <p
        data-testid="hero-subtitle"
        className="mt-5 max-w-xl text-base md:text-lg text-white/85 leading-relaxed"
      >
        Music doesn't need to be earned — it needs to be felt. Step in, slow
        down, and let the right mentor help you find the sound that was always
        yours.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          to="/booking"
          data-testid="hero-book-now"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brown-dark text-white text-sm font-medium hover:bg-black transition-colors min-w-[44px]"
        >
          Book Now
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div
        data-testid="hero-pills"
        className="mt-8 flex flex-wrap gap-2.5 max-w-3xl"
      >
        {HERO_PILLS.map((p) => (
          <span
            key={p}
            className="inline-flex items-center h-9 px-4 rounded-full bg-white/10 border border-white/30 text-white/95 text-xs sm:text-sm backdrop-blur-sm"
          >
            {p}
          </span>
        ))}
      </div>
    </div>

    {/* Bottom continuous wave divider — two broad soft waves, gently slanted */}
    <WaveDivider fill="#F5F0E5" />
  </section>
);

export default Hero;
