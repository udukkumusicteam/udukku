import React from 'react';
import { STATS } from '../data/mockData';

export const StatsSection = () => (
  <section
    data-testid="stats-section"
    className="bg-cream text-brown-dark"
  >
    <div className="udukku-section py-24 md:py-32">
      <div className="max-w-3xl mb-16 md:mb-20">
        <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
          Why Udukku
        </span>
        <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[64px]">
          Music isn't taught here.{' '}
          <span className="text-italic-serif text-orange">It's set free.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
        {STATS.map((s, idx) => (
          <div
            key={s.title}
            data-testid={`stat-card-${idx}`}
            className="flex flex-col"
          >
            <div className="text-orange text-display text-6xl md:text-7xl lg:text-[88px] leading-none">
              {s.number}
            </div>
            <div className="mt-6 text-xl md:text-2xl text-brown-dark font-medium">
              {s.title}
            </div>
            <p className="mt-4 text-brown-mid text-base leading-relaxed max-w-xs">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
