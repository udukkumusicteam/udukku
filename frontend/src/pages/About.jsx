import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import VisionMission from '../components/VisionMission';
import { TUTORS } from '../data/mockData';
import WaveDivider from '../components/WaveDivider';

export default function About() {
  return (
    <main data-testid="about-page">
      {/* Hero */}
      <section className="bg-hero-gradient text-white">
        <div className="udukku-section pt-28 md:pt-32 pb-14 md:pb-20">
          <span className="uppercase tracking-[0.28em] text-[11px] text-white/80">
            About Udukku
          </span>
          <h1 className="text-display mt-4 text-5xl sm:text-6xl lg:text-[88px] max-w-[16ch]">
            A music school that{' '}
            <span className="text-italic-serif">listens first</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
            Udukku began as a kitchen-table experiment: what if music lessons
            didn't feel like exams? What if the room felt safe enough that a
            beginner could be honest about their fears? Five years on, that
            kitchen has grown into a community of mentors and students who
            choose music for the long, soft journey.
          </p>
        </div>
        <WaveDivider fill="#F5F0E5" />
      </section>

      {/* Story */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Our Story
            </span>
            <h2 className="text-display mt-4 text-4xl sm:text-5xl text-brown-dark">
              We didn't set out to start a school.{' '}
              <span className="text-italic-serif text-orange">
                We set out to remove the gatekeepers.
              </span>
            </h2>
          </div>
          <div className="space-y-6 text-brown-mid text-base md:text-lg leading-relaxed">
            <p>
              Most of us learnt music in stiff rooms. Tempo metronomes. Graded
              examinations. A vocabulary of "right" and "wrong" that quietly
              shut down anyone who didn't fit the mould. We loved music too
              much to keep teaching it that way.
            </p>
            <p>
              So we built a space that begins with a question — "what does
              music mean to you?" — and lets every answer be welcome. From
              hesitant first-timers to retiring professionals returning to an
              old love, our mentors meet each student exactly where they are.
            </p>
            <p className="text-italic-serif text-brown-dark text-xl">
              Music isn't a destination. It's a way of being awake.
            </p>
          </div>
        </div>
      </section>

      <VisionMission />

      {/* Tutors grid */}
      <section className="bg-cream">
        <div className="udukku-section py-16 md:py-20">
          <div className="max-w-2xl mb-10 md:mb-12">
            <span className="uppercase tracking-[0.28em] text-xs text-brown-mid">
              Meet the mentors
            </span>
            <h2 className="text-display mt-4 text-4xl sm:text-5xl text-brown-dark">
              People who teach the way they once{' '}
              <span className="text-italic-serif text-orange">wished to be taught</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TUTORS.map((t) => (
              <article
                key={t.id}
                data-testid={`about-tutor-${t.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-brown-dark/10"
              >
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={t.image}
                    alt={t.name}
                    className="absolute inset-0 w-full h-full object-cover sepia-soft"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-brown-dark">
                      {t.name}
                    </h3>
                    <span className="text-xs text-brown-light">{t.experience}</span>
                  </div>
                  <p className="text-sm text-orange mt-1">{t.role}</p>
                  <p className="mt-4 text-brown-mid text-sm leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/booking"
              data-testid="about-cta"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-brown-dark text-white text-base font-medium hover:bg-black transition-colors"
            >
              Begin your journey <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
