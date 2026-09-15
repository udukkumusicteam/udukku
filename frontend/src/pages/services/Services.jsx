import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Music, Users, Flower2, CalendarHeart } from 'lucide-react';
import BrandIcon from '../../components/BrandIcon';


const PILLS = [
  {
    to: '/services/instruments',
    icon: Music,
    title: 'Music Classes',
    body: 'Explore instruments and courses',
    testid: 'services-pill-instruments',
  },
  {
    to: '/services/music-room',
    icon: Users,
    title: 'Udukku Music Room',
    body: 'Develop consistent practice habits with a community',
    testid: 'services-pill-umr',
  },
  {
    to: '/services/music-meditation',
    icon: Flower2,
    title: 'Music Meditation',
    body: 'Train your mind, through music',
    testid: 'services-pill-meditation',
  },
  {
    to: '/services/events',
    icon: CalendarHeart,
    title: 'Events & Experiences',
    body: 'Workshops, Open Mics, Games & more',
    testid: 'services-pill-events',
  },
];

const Pill = ({ pill, index }) => {
  const Icon = pill.icon;
  return (
    <Link
      to={pill.to}
      data-testid={pill.testid}
      className="group relative flex items-center gap-3.5 min-h-[76px] md:min-h-[84px] py-3 pl-3.5 pr-4 md:pl-4 md:pr-5 rounded-[38px] bg-white/10 hover:bg-white/[0.16] border border-white/25 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5"
      style={{ animation: `udukku-rise 0.6s ease ${0.15 + 0.08 * index}s both` }}
    >
      <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 border border-white/25 text-white transition-colors group-hover:bg-white/25">
        <Icon className="w-[16px] h-[16px]" strokeWidth={1.8} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-white text-[15px] md:text-base font-semibold leading-tight">
          {pill.title}
        </span>
        <span className="mt-1 block text-white/75 text-[11px] md:text-xs leading-snug">
          {pill.body}
        </span>
      </span>
      <ArrowUpRight
        className="shrink-0 w-4 h-4 text-white/85 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
            Music education and wellness,{' '}
            <span className="text-italic-serif text-white/95">
             for every stage of your journey
            </span>
            .
          </h1>
          <p
            data-testid="services-lede"
            className="reveal mt-6 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed"
            style={{ transitionDelay: '160ms' }}
          >
            Music learning that nurtures creativity, self-expression, and wellbeing, 
            at your own pace, level, and goals.
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
