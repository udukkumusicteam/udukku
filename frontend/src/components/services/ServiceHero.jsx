import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BrandIcon from '../BrandIcon';

/**
 * ServiceHero — the shared editorial hero used on every service detail page.
 *
 * The Instruments page is the master template. This shell is a 1:1 extraction
 * of its hero: cream background, 7/5 split, back link + eyebrow + display
 * headline + description + pill row on the left, and an aspect-4/5 image
 * card with an optional floating info chip on the right. Only content
 * (label, headline, description, pills, image, chip) is expected to vary
 * per page — never the styling, spacing, container width, or breakpoints.
 */
const BackLink = () => (
  <Link
    to="/services"
    data-testid="back-to-services"
    className="flex w-fit items-center gap-2 text-orange hover:text-orange-dark text-sm font-medium transition-colors"
  >
    <ArrowLeft className="w-4 h-4" /> Back to Services
  </Link>
);

export const ServiceHero = ({
  eyebrow,
  headline, // JSX — allows italic-serif accent inside the phrase
  description,
  pills = [],
  imageSrc,
  imageAlt,
  chipTitle,
  chipSubtitle,
  testId,
}) => (
  <section
    data-testid={testId}
    className="relative overflow-hidden bg-cream"
  >
    <div
      className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(closest-side, rgba(232,136,58,0.28), transparent 70%)' }}
      aria-hidden
    />
    <div
      className="absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(closest-side, rgba(232,136,58,0.14), transparent 70%)' }}
      aria-hidden
    />

    <div className="relative udukku-section pt-28 md:pt-32 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <div className="lg:col-span-7">
        <BackLink />
        <span
          className="reveal mt-8 inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-orange mb-5"
        >
          <BrandIcon size={14} /> {eyebrow}
        </span>
        <h1
          className="reveal text-display text-brown-dark text-4xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.03]"
          style={{ transitionDelay: '80ms' }}
        >
          {headline}
        </h1>
        <p
          className="reveal mt-6 max-w-xl text-brown-mid text-base md:text-lg leading-relaxed"
          style={{ transitionDelay: '160ms' }}
        >
          {description}
        </p>
        {pills.length > 0 && (
          <div
            className="reveal mt-8 flex flex-wrap items-center gap-2.5"
            style={{ transitionDelay: '220ms' }}
          >
            {pills.map((t) => (
              <span
                key={t}
                className="inline-flex items-center h-9 px-4 rounded-full bg-white border border-brown-dark/10 text-brown-dark text-xs md:text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="relative">
          <div
            className="relative rounded-[28px] md:rounded-[36px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(102,54,20,0.35)]"
            style={{ animation: 'udukku-drift 8s ease-in-out infinite' }}
          >
            <div className="aspect-[4/5]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/55 to-transparent">
              <span className="text-italic-serif text-white text-lg md:text-xl">
                {' '}
              </span>
            </div>
          </div>
          {chipTitle && (
            <div className="hidden md:flex absolute -bottom-6 -left-6 items-center gap-3 rounded-full bg-white border border-brown-dark/10 pl-3 pr-5 py-2 shadow-lg">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange text-white">
                <BrandIcon size={14} />
              </span>
              <div>
                <div className="text-brown-dark text-sm font-medium leading-tight">
                  {chipTitle}
                </div>
                {chipSubtitle && (
                  <div className="text-brown-mid text-[11px] leading-tight">
                    {chipSubtitle}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default ServiceHero;
