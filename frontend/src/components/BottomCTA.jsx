import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BOTTOM_CTA } from '../data/mockData';
import FloatingParticles from './FloatingParticles';

export const BottomCTA = () => (
  <section data-testid="bottom-cta-section" className="relative">
    <div className="relative w-full overflow-hidden">
      <img
        src={BOTTOM_CTA.image}
        alt="Musician with a guitar"
        className="absolute inset-0 w-full h-full object-cover kenburns"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(20, 8, 0, 0.58)' }}
      />
      <FloatingParticles tint="rgba(255, 220, 180, 0.85)" />
      <div className="relative udukku-section py-20 md:py-24 flex flex-col items-center text-center">
        <span className="reveal uppercase tracking-[0.28em] text-xs text-white/80">
          Your First Step
        </span>
        <h2 className="reveal text-display mt-4 text-white text-4xl sm:text-5xl lg:text-[64px] max-w-3xl" style={{ transitionDelay: '80ms' }}>
          {BOTTOM_CTA.heading}
        </h2>
        <p className="reveal mt-6 text-white/85 text-base md:text-lg max-w-xl leading-relaxed" style={{ transitionDelay: '160ms' }}>
          {BOTTOM_CTA.subheading}
        </p>
        <Link
          to="/booking"
          data-testid="bottom-cta-book"
          className="reveal btn-glow mt-10 inline-flex items-center gap-2 h-12 px-8 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark min-w-[44px]"
          style={{ transitionDelay: '240ms' }}
        >
          Book Now <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default BottomCTA;
