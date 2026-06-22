import React from 'react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials = () => (
  <section
    data-testid="testimonials-section"
    className="bg-orange text-white"
  >
    <div className="udukku-section py-24 md:py-32">
      <div className="max-w-3xl mb-14 md:mb-20">
        <span className="uppercase tracking-[0.28em] text-xs text-white/80">
          Voices from our students
        </span>
        <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px]">
          Music changed something{' '}
          <span className="text-italic-serif text-white">in them.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7">
        {TESTIMONIALS.map((q, i) => (
          <article
            key={q.id}
            data-testid={`testimonial-${i}`}
            className="relative bg-orange-dark/40 border border-white/15 rounded-3xl p-8 md:p-9 flex flex-col"
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 left-7 text-white/25 font-serif"
              style={{ fontSize: '7rem', lineHeight: 1, fontFamily: 'Georgia, serif' }}
            >
              “
            </span>
            <p className="relative text-white text-base md:text-[17px] leading-relaxed mt-6">
              {q.quote}
            </p>
            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/15">
              <div className="w-11 h-11 rounded-full bg-white/15 border border-white/25 inline-flex items-center justify-center text-white font-semibold">
                {q.initials}
              </div>
              <div>
                <div className="font-medium">{q.name}</div>
                <div className="text-white/70 text-sm">{q.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
