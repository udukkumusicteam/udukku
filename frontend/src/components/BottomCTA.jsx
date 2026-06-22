import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BOTTOM_CTA } from '../data/mockData';

export const BottomCTA = () => (
  <section data-testid="bottom-cta-section" className="relative">
    <div className="relative w-full overflow-hidden">
      <img
        src={BOTTOM_CTA.image}
        alt="Musician with a guitar"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(20, 8, 0, 0.58)' }}
      />
      <div className="relative udukku-section py-28 md:py-40 flex flex-col items-center text-center">
        <span className="uppercase tracking-[0.28em] text-xs text-white/80">
          Your First Step
        </span>
        <h2 className="text-display mt-4 text-white text-4xl sm:text-5xl lg:text-[64px] max-w-3xl">
          {BOTTOM_CTA.heading}
        </h2>
        <p className="mt-6 text-white/85 text-base md:text-lg max-w-xl leading-relaxed">
          {BOTTOM_CTA.subheading}
        </p>
        <Link
          to="/booking"
          data-testid="bottom-cta-book"
          className="mt-10 inline-flex items-center gap-2 h-12 px-8 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark transition-colors min-w-[44px]"
        >
          Book Now <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default BottomCTA;
