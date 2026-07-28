import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { HERO_PILLS } from '../data/mockData';
import WaveDivider from './WaveDivider';
import FloatingParticles from './FloatingParticles';

export const Hero = () => {
  // Gentle scroll parallax on the radial overlay only (text stays put).
  const overlayRef = useRef(null);
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 700);
        el.style.transform = `translate3d(0, ${y * 0.14}px, 0)`;
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden bg-hero-gradient text-white"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 hero-radial-overlay pointer-events-none will-change-transform"
      />
      <FloatingParticles />

      <div className="relative udukku-section pt-24 md:pt-28 pb-12 md:pb-14">
        <span
          data-testid="hero-eyebrow"
          className="reveal inline-block uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/80 mb-4"
        >
          Where music finds you
        </span>

        <h1
          data-testid="hero-title"
          className="reveal text-display text-white whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px]"
          style={{ transitionDelay: '80ms' }}
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
          className="reveal mt-5 max-w-xl text-base md:text-lg text-white/85 leading-relaxed"
          style={{ transitionDelay: '180ms' }}
        >
          Music does not need to be earned. It only needs to be felt. Step in,
          slow down, and let a mentor help you find the sound that has
          quietly been yours all along.
        </p>

        <div
          className="reveal mt-6 flex flex-wrap items-center gap-3"
          style={{ transitionDelay: '260ms' }}
        >
          <Link
            to="/booking"
            data-testid="hero-book-now"
            className="btn-glow inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brown-dark text-white text-sm font-medium hover:bg-black min-w-[44px]"
          >
            Book Now
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          data-testid="hero-pills"
          className="reveal mt-8 flex flex-wrap gap-2.5 max-w-3xl"
          style={{ transitionDelay: '340ms' }}
        >
          {HERO_PILLS.map((p, i) => (
            <span
              key={p}
              className="inline-flex items-center h-9 px-4 rounded-full bg-white/10 border border-white/30 text-white/95 text-xs sm:text-sm backdrop-blur-sm transition-all duration-500 hover:bg-white/20 hover:-translate-y-0.5"
              style={{ transitionDelay: `${60 + i * 40}ms` }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <WaveDivider fill="#F5F0E5" />
    </section>
  );
};

export default Hero;
