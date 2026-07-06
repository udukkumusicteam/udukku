import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Music, Users, Sparkles, CalendarHeart } from 'lucide-react';
import BrandIcon from '../../components/BrandIcon';

const PILLS = [
  {
    to: '/services/instruments',
    icon: Music,
    title: 'Instruments',
    body: 'Explore instruments and courses',
    testid: 'services-pill-instruments',
  },
  {
    to: '/services/music-room',
    icon: Users,
    title: 'Udukku Music Room',
    body: 'Join our practice community',
    testid: 'services-pill-umr',
  },
  {
    to: '/services/music-meditation',
    icon: Sparkles,
    title: 'Music Meditation',
    body: 'Sound, breath, and stillness',
    testid: 'services-pill-meditation',
  },
  {
    to: '/services/events',
    icon: CalendarHeart,
    title: 'Events',
    body: 'Live musicians for gatherings',
    testid: 'services-pill-events',
  },
];

const Pill = ({ pill, index }) => {
  const Icon = pill.icon;
  return (
    <Link
      to={pill.to}
      data-testid={pill.testid}
      className="group relative flex items-center gap-4 h-[76px] md:h-[84px] pl-4 pr-5 md:pl-5 md:pr-6 rounded-full bg-white/10 hover:bg-white/[0.16] border border-white/25 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5"
      style={{ animation: `udukku-rise 0.6s ease ${0.15 + 0.08 * index}s both` }}
    >
      <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/15 border border-white/25 text-white transition-colors group-hover:bg-white/25">
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-white text-[15px] md:text-base font-semibold leading-tight truncate">
          {pill.title}
        </span>
        <span className="mt-1 block text-white/75 text-[11px] md:text-xs leading-snug truncate">
          {pill.body}
        </span>
      </span>
      <ArrowUpRight
        className="shrink-0 w-[18px] h-[18px] text-white/85 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.8}
      />
    </Link>
  );
};

export default function Services() {
  return (
    <main
      data-testid="services-page"
      className="relative bg-hero-gradient text-white overflow-hidden page-fade-in"
    >
      <style>{`
        @keyframes udukku-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="absolute inset-0 hero-radial-overlay pointer-events-none" />

      {/* Hero: full viewport height, header space + content on top, pills at bottom */}
      <section
        data-testid="services-hero"
        className="relative min-h-screen flex flex-col udukku-section pt-28 md:pt-32 pb-10 md:pb-14"
      >
        {/* Top: label + headline + paragraph */}
        <div className="flex-1">
          <span
            data-testid="services-eyebrow"
            className="reveal inline-flex items-center gap-2 uppercase tracking-[0.28em] text-[11px] md:text-xs text-white/85 mb-6"
          >
            <BrandIcon size={14} /> Our Services
          </span>
          <h1
            data-testid="services-headline"
            className="reveal text-display text-white text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] leading-[1.05] max-w-4xl"
            style={{ transitionDelay: '80ms' }}
          >
            Music education designed around{' '}
            <span className="text-italic-serif text-white/95">
              every stage of your journey
            </span>
            .
          </h1>
          <p
            data-testid="services-lede"
            className="reveal mt-6 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed"
            style={{ transitionDelay: '160ms' }}
          >
            Experiences that nurture learning, creativity, and wellbeing,
            wherever you are with music.
          </p>
        </div>

        {/* Bottom: four navigation pills */}
        <nav
          data-testid="services-pills"
          aria-label="Service navigation"
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {PILLS.map((p, i) => (
            <Pill key={p.to} pill={p} index={i} />
          ))}
        </nav>
      </section>
    </main>
  );
}
