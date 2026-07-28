import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * ServiceCTA — the shared brown-dark bottom CTA used on every service detail
 * page. Extracted verbatim from the Instruments master template so the
 * closing note feels identical across all four services.
 */
export const ServiceCTA = ({
  eyebrow,
  headline, // JSX — allows italic-serif accent inside the phrase
  description,
  ctaLabel,
  ctaTo,
  testId,
}) => (
  <section className="bg-brown-dark text-white">
    <div className="udukku-section py-20 md:py-24 text-center flex flex-col items-center">
      <span className="uppercase tracking-[0.28em] text-xs text-white/70">
        {eyebrow}
      </span>
      <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] max-w-3xl">
        {headline}
      </h2>
      {description && (
        <p className="mt-4 text-white/80 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
      <Link
        to={ctaTo}
        data-testid={testId}
        className="btn-glow mt-9 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white text-base font-medium hover:bg-orange-dark"
      >
        {ctaLabel} <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default ServiceCTA;
